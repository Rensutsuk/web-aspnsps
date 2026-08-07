import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const jsonReportPath = path.join(rootDir, "test-results", "ui-report.json");
const markdownReportPath = path.join(rootDir, "playwright-report", "ui-improvement-report.md");
const accessibilityReportDir = path.join(rootDir, "test-results", "accessibility");

if (!fs.existsSync(jsonReportPath)) {
  console.error(`Playwright JSON report not found at ${jsonReportPath}`);
  console.error("Run `npm run test:ui` first.");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(jsonReportPath, "utf8"));
const collectedTests = [];

function visitSuite(suite, titlePath = []) {
  const nextTitlePath = suite.title ? [...titlePath, suite.title] : titlePath;

  for (const spec of suite.specs ?? []) {
    const specTitlePath = [...nextTitlePath, spec.title].filter(Boolean);

    for (const test of spec.tests ?? []) {
      const results = test.results ?? [];
      const finalResult = results.at(-1) ?? {};
      const firstError = (finalResult.errors ?? []).find((error) => error.message)?.message ?? "";

      collectedTests.push({
        title: spec.title,
        titlePath: specTitlePath,
        projectName: test.projectName ?? "default",
        status: test.status ?? finalResult.status ?? "unknown",
        durationMs: results.reduce((total, result) => total + (result.duration ?? 0), 0),
        error: firstError,
      });
    }
  }

  for (const child of suite.suites ?? []) {
    visitSuite(child, nextTitlePath);
  }
}

for (const suite of report.suites ?? []) {
  visitSuite(suite);
}

const totals = {
  total: collectedTests.length,
  passed: collectedTests.filter((test) => test.status === "passed").length,
  failed: collectedTests.filter((test) => test.status === "failed").length,
  skipped: collectedTests.filter((test) => test.status === "skipped").length,
  timedOut: collectedTests.filter((test) => test.status === "timedOut").length,
};

const slowestTests = [...collectedTests]
  .sort((left, right) => right.durationMs - left.durationMs)
  .slice(0, 5);

const failedTests = collectedTests.filter((test) => test.status === "failed" || test.status === "timedOut");
const accessibilitySummaries = fs.existsSync(accessibilityReportDir)
  ? fs
      .readdirSync(accessibilityReportDir)
      .filter((fileName) => fileName.endsWith(".json"))
      .map((fileName) => JSON.parse(fs.readFileSync(path.join(accessibilityReportDir, fileName), "utf8")))
  : [];

function toSeconds(durationMs) {
  return (durationMs / 1000).toFixed(2);
}

function suggestAction(test) {
  const title = test.titlePath.join(" ").toLowerCase();

  if (title.includes("accessibility")) {
    return "Review semantic structure, accessible names, landmarks, and color contrast on this route.";
  }

  if (title.includes("contact")) {
    return "Check form validation messages, submit feedback, and the `/api/contact` integration path.";
  }

  if (title.includes("mobile") || title.includes("navigation")) {
    return "Inspect responsive navigation, overlay visibility, and fixed-header interactions on smaller screens.";
  }

  if (title.includes("services") || title.includes("ministries")) {
    return "Validate search filtering, drawer focus management, and discoverability of service details.";
  }

  if (title.includes("schedule") || title.includes("events")) {
    return "Verify date-sensitive rendering, timezone assumptions, and tab or calendar interactions.";
  }

  return "Inspect the related route and interaction path in the Playwright HTML report for screenshots, traces, and logs.";
}

const lines = [
  "# UI Improvement Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- Total tests: ${totals.total}`,
  `- Passed: ${totals.passed}`,
  `- Failed: ${totals.failed}`,
  `- Timed out: ${totals.timedOut}`,
  `- Skipped: ${totals.skipped}`,
  "",
  "## Slowest Tests",
  "",
  ...slowestTests.map(
    (test) => `- ${test.titlePath.join(" > ")} (${test.projectName}) - ${toSeconds(test.durationMs)}s`,
  ),
  "",
  "## Action Items",
  "",
];

if (failedTests.length === 0) {
  lines.push("- No failing UI tests were found. Review the HTML report for screenshots and the accessibility audit attachments for non-blocking improvements.");
} else {
  for (const test of failedTests) {
    lines.push(`- ${test.titlePath.join(" > ")} (${test.projectName})`);
    lines.push(`  Status: ${test.status}`);
    lines.push(`  Error: ${test.error.split("\n")[0] || "See Playwright HTML report for the full stack trace."}`);
    lines.push(`  Suggested fix: ${suggestAction(test)}`);
    lines.push("");
  }
}

lines.push("");
lines.push("## Accessibility Findings");
lines.push("");

const pagesWithSevereAccessibilityFindings = accessibilitySummaries.filter(
  (summary) => Array.isArray(summary.severeViolations) && summary.severeViolations.length > 0,
);

if (pagesWithSevereAccessibilityFindings.length === 0) {
  lines.push("- No serious or critical accessibility issues were captured in the audit summaries.");
} else {
  for (const summary of pagesWithSevereAccessibilityFindings) {
    const issues = summary.severeViolations
      .map((violation) => `${violation.id} (${violation.impact}) x${violation.affectedNodes}`)
      .join(", ");

    lines.push(`- ${summary.page} (${summary.url})`);
    lines.push(`  Total violations: ${summary.totalViolations}`);
    lines.push(`  Serious or critical: ${issues}`);
  }
}

fs.mkdirSync(path.dirname(markdownReportPath), { recursive: true });
fs.writeFileSync(markdownReportPath, `${lines.join("\n").trim()}\n`, "utf8");

console.log(`UI improvement report written to ${markdownReportPath}`);
