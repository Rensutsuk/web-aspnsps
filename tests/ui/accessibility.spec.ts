import fs from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

import { gotoAndWait, runAccessibilityAudit } from "./helpers";

const auditRoutes = [
  { name: "home", url: "/", heading: /Mary: A Haven of Hope for Families/i },
  { name: "about", url: "/about", heading: /About Our Parish/i },
  { name: "schedule", url: "/schedule", heading: /Schedule of Services/i },
  { name: "services", url: "/services", heading: /Church Services/i },
  { name: "ministries", url: "/ministries", heading: /Ministries, Organizations, and Apostolates/i },
  { name: "contact", url: "/contact", heading: /Get in Touch/i },
];

for (const route of auditRoutes) {
  test(`accessibility audit: ${route.name}`, async ({ page }, testInfo) => {
    await gotoAndWait(page, route.url, route.heading);

    const { results, summary, severeViolations } = await runAccessibilityAudit(page, route.name);
    const outputDir = path.join(process.cwd(), "test-results", "accessibility");

    await testInfo.attach(`${route.name}-axe-results`, {
      body: JSON.stringify(results, null, 2),
      contentType: "application/json",
    });

    await testInfo.attach(`${route.name}-axe-summary`, {
      body: JSON.stringify(summary, null, 2),
      contentType: "application/json",
    });

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
      path.join(outputDir, `${route.name}.json`),
      JSON.stringify(
        {
          ...summary,
          severeViolations,
        },
        null,
        2,
      ),
      "utf8",
    );

    if (severeViolations.length > 0) {
      testInfo.annotations.push({
        type: "a11y-findings",
        description: severeViolations.map((violation) => `${violation.id} (${violation.impact})`).join(", "),
      });
    }

    expect(Array.isArray(results.violations)).toBe(true);
  });
}
