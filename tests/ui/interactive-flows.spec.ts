import { expect, test } from "@playwright/test";

import { gotoAndWait, mockContactApi } from "./helpers";

test.describe("interactive public flows", () => {
  test("schedule tabs switch between mass, confession, and other services", async ({ page }) => {
    await gotoAndWait(page, "/schedule", /Schedule of Services/i);

    await page.getByRole("tab", { name: "Mass" }).click();
    await expect(page.getByRole("tab", { name: "Mass" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText(/Today \(.+\) - Mass|Today \(.+\) — Mass/i)).toBeVisible();

    await page.getByRole("tab", { name: "Confession" }).click();
    await expect(page.getByRole("tab", { name: "Confession" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText(/Today \(.+\) - Confession|Today \(.+\) — Confession/i)).toBeVisible();

    await page.getByRole("tab", { name: "Other" }).click();
    await expect(page.getByRole("heading", { name: /Devotions and Parish Prayer Life/i })).toBeVisible();
  });

  test("services search and drawer expose sacrament details", async ({ page }) => {
    await gotoAndWait(page, "/services", /Church Services/i);

    await page.getByRole("button", { name: /^Baptism\b/i }).click();
    await expect(page.getByRole("heading", { name: /^Baptism$/i })).toBeVisible();

    await page.getByRole("tab", { name: "Requirements" }).click();
    await expect(page.getByRole("heading", { name: /Infant Baptism \(0-2 years\)/i })).toBeVisible();

    await page.getByRole("tab", { name: "Contact" }).click();
    await expect(page.getByText(/Best way to reach the parish/i)).toBeVisible();
  });

  test("ministries search opens the matching drawer", async ({ page }) => {
    await gotoAndWait(page, "/ministries", /Ministries, Organizations, and Apostolates/i);

    await page.getByRole("button", { name: "Learn more" }).first().click();
    await expect(page.getByText(/Youth serving the altar during Mass/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Usual Activities/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Join This Ministry/i })).toBeVisible();
  });

  test("contact form validates required fields and handles a successful submission", async ({ page }) => {
    await mockContactApi(page);
    await gotoAndWait(page, "/contact", /Get in Touch/i);

    await page.getByPlaceholder("Type your name here").fill("Playwright Tester");
    await page.getByPlaceholder("your.email@example.com").fill("tester@example.com");
    await page.getByPlaceholder("What is your inquiry about?").fill("Mass intentions");
    await page.getByPlaceholder("Write your message here...").fill("Testing the public contact flow.");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Your message has been sent successfully.")).toBeVisible();
  });

  test("mobile navigation opens and routes visitors to contact", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, "/", /Mary: A Haven of Hope for Families/i);

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await mobileNav.getByRole("link", { name: "Contact" }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { name: /Get in Touch/i })).toBeVisible();
  });
});
