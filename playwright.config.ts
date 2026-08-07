import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3001);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/ui",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: {
    timeout: 7_500,
  },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/ui-report.json" }],
  ],
  outputDir: "test-results/artifacts",
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    colorScheme: "light",
    locale: "en-PH",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    timezoneId: "Asia/Manila",
  },
  webServer: {
    command: `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
    env: {
      ...process.env,
      AUTH_SECRET: "playwright-auth-secret",
      DATABASE_URL: "postgresql://playwright:playwright@127.0.0.1:5432/web_nsps_test?schema=public",
      INITIAL_ADMIN_EMAIL: "admin@example.com",
      INITIAL_ADMIN_PASSWORD: "password123",
      NEXTAUTH_SECRET: "playwright-auth-secret",
      NEXTAUTH_URL: baseURL,
      NEXT_PUBLIC_SITE_URL: baseURL,
      SYSADMIN_NAME: "System Administrator",
      WEB3FORMS_ACCESS_KEY: "playwright-web3forms-key",
    },
  },
});
