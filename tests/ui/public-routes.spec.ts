import { expect, test } from "@playwright/test";

import { gotoAndWait } from "./helpers";

test.describe("public routes", () => {
  test("home page renders the primary shell and featured sections", async ({ page }) => {
    await gotoAndWait(page, "/", /Mary: A Haven of Hope for Families/i);

    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Latest Announcements/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse all blog posts/i })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("about page links visitors into the history page", async ({ page }) => {
    await gotoAndWait(page, "/about", /About Our Parish/i);

    await expect(page.getByRole("heading", { name: /Our Mission/i })).toBeVisible();
    await page.locator('a[href="/about/history"]').click();
    await expect(page).toHaveURL(/\/about\/history$/);
    await expect(page.getByRole("heading", { name: /Parish History/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to About/i })).toBeVisible();
  });

  test("blog page stays usable even when there are no published posts", async ({ page }) => {
    await gotoAndWait(page, "/blog", /Latest Announcements And Reflections/i);

    await expect(page.getByPlaceholder(/Search blog posts, authors, categories, or tags/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Recent posts/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /No posts matched your filters/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /View all posts/i })).toBeVisible();
  });

  test("events page shows calendar controls and a safe empty state", async ({ page }) => {
    await gotoAndWait(page, "/events", /Calendar And Upcoming Activities/i);

    await expect(page.getByRole("heading", { name: "Calendar", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Subscribe \(iCal\)/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Upcoming events", exact: true })).toBeVisible();
  });

  test("unknown routes fall back to the guided 404 page", async ({ page }) => {
    await gotoAndWait(page, "/this-route-does-not-exist", /This page could not be found/i);

    await expect(page.getByRole("link", { name: /Back to Home/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Continue to a useful parish section/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Mass Schedule", exact: true }).first()).toBeVisible();
  });
});
