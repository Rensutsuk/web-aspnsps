import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export async function gotoAndWait(page: Page, url: string, headingName?: string | RegExp) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.getByRole("banner").waitFor();

  if (headingName) {
    await expect(page.getByRole("heading", { name: headingName })).toBeVisible();
  }
}

export async function mockContactApi(page: Page) {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          message: "Your message has been sent successfully.",
        },
      }),
    });
  });
}

export async function runAccessibilityAudit(page: Page, pageName: string) {
  const results = await new AxeBuilder({ page })
    .exclude("iframe")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const severeViolations = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  const summary = {
    page: pageName,
    url: page.url(),
    totalViolations: results.violations.length,
    severeViolations: severeViolations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      affectedNodes: violation.nodes.length,
    })),
  };

  return { results, summary, severeViolations };
}
