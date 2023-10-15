import playwright from 'playwright';
import { test, expect } from '@playwright/test';
import logger from '../service/logger';

test.describe('Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    try {
      await page.goto('http://zero.webappsecurity.com/index.html');
      logger.info('Site visited');
    } catch (e) {
      if (e instanceof playwright.errors.TimeoutError) {
        await page.goto('http://zero.webappsecurity.com/index.html');
      }
    }

    await page.click('#feedback');
  });

  test('Reset feedback form', async ({ page }) => {
    await page.fill('#name', 'some name');
    await page.fill('#email', 'some email@email.com');
    await page.fill('#subject', 'some subject');
    await page.fill('#comment', 'some nice comment about the application');
    await page.click("input[name='clear']");

    const nameInput = await page.locator('#name');
    const commentInput = await page.locator('#comment');
    await expect(nameInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });

  test('Submit feedback form', async ({ page }) => {
    await page.fill('#name', 'some name');
    await page.fill('#email', 'some email@email.com');
    await page.fill('#subject', 'some subject');
    await page.fill('#comment', 'some nice comment about the application');
    await page.click("input[type='submit']");
    await page.waitForSelector('#feedback-title');
  });
});
