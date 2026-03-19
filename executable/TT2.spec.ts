import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://azeuwathdevtestathonvm.azeuwdevath.lan:8002/auth/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'FotisPamp');

    await page.fill('input[name="password"]', 'Fotis123!');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://azeuwathdevtestathonvm.azeuwdevath.lan:8002/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.click('text=Register here');

    await expect(page).toHaveURL(/register/);
  });

});