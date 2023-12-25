import { PlaywrightTestConfig, devices } from '@playwright/test';


const config: PlaywrightTestConfig = {
  //number of retries if test case fails
  retries: 0,
  // Limit the number of workers
  workers: 1,
  //Maximum timeOut
  timeout: 500 * 1000,
  //Reporters
  reporter: [[`html`, { outputFolder: './reports', open: 'never' }]],
  //For staring server
  // webServer: {
  //   command:
  //     'npm run build:engagement-sdk && ng serve --configuration=' +
  //     process.env['ENV'],
  //   url: 'https://respond.local.mheducation.com:4200/',
  //   timeout: 400 * 1000,
  //   ignoreHTTPSErrors: true,
  // },

  testMatch: ['example.spec.ts'],

  // testMatch: ['tests/author_create.spec.ts', 'tests/author_history.spec.ts', 'inst_create.spec.ts', 'studentUploadDoc.spec.ts'],

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    video: 'on-first-retry',
    launchOptions: {
      slowMo: 0,
      args: ['--disable-web-security'],
    },
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ignoreHTTPSErrors: true,
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft_Edge',
    //   use: {
    //     channel: 'msedge',
    //     viewport: { width: 1500, height: 730 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //   },
    // },
  ],
};

export default config;
