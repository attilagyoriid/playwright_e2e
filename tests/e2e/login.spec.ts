import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
  });

  test('Invalid input for Login', async ({ page }) => {
    await page.click('#signin_button');
    await page.fill('#user_login', 'invalid username');
    await page.fill('#user_password', 'invalid password');
    await page.click('text=Sign in');

    const errorMessage = await page.locator('.alert-error');
    await expect(errorMessage).toContainText('Login and/or password are wrong');
  });

  test('Login successfull', async ({ page }) => {
    await page.click('#signin_button');
    await page.fill('#user_login', 'username');
    await page.fill('#user_password', 'password');
    await page.click('text=Sign in');
    await page.goto('http://zero.webappsecurity.com/');
    const userDropdownIcon = await page.locator('.dropdown-toggle>.icon-user');
    await expect(userDropdownIcon).toBeVisible();
    const userDropdown = await page
      .locator('a.dropdown-toggle .icon-user')
      .locator('..');
    await expect(userDropdown).toContainText('username');

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
