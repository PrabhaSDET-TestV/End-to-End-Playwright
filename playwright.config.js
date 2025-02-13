// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  expect: {
    timeout: 5000
  },

  workers: 4, 

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName: "chromium",
   headless: true,
   screenshot: 'on',
   trace: 'retain-on-failure'
  },

});

