import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { open: 'on-failure' }]
  ],
  use: {
    baseURL: 'http://azeuwathdevtestathonvm.azeuwdevath.lan:8009',
  },
});