import { test, expect } from '@playwright/test';

test.describe('Basic test suit - zero', () => {
  test('Click on element @click', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com');

    await page.click('#signin_button:visible');
    await page.click('text=Sign in');
    const errorMsg = await page.locator('.alert-error');
    await expect(errorMsg).toContainText('Login and/or password are wrong.');
  });

  test('Interact with inputs @input', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com');

    await page.click('#signin_button:visible');
    await page.fill('#user_login', 'Something');
    await page.fill('#user_password', 'Something');

    await page.click('text=Sign in');
    const errorMsg = await page.locator('.alert-error');
    await expect(errorMsg).toContainText('Login and/or password are wrong.');
  });
});

test.describe('Basic test suit - example', () => {
  test.beforeEach('Before all test', async ({ page }) => {
    await page.goto('https://www.example.com');
  });
  test('Basic test', async ({ page }) => {
    await expect(page).toHaveURL('https://www.example.com');
    await expect(page).toHaveTitle('Example Domain');
    const pageTitle = await page.locator('h1');
    await expect(pageTitle).toContainText('Example Domain');
  });

  test('Basic screenshot on full page test', async ({ page }) => {
    // page.pause();
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
  });
  test('Basic screenshot on element test', async ({ page }) => {
    const titleElement = await page.$('h1');
    await titleElement?.screenshot({
      path: 'title_element.png',
    });
  });
});
