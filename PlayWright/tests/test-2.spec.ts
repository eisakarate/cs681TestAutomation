import { test, expect } from '@playwright/test';



test('test', async ({ page }) => {
  // Recording...await page.goto('file:///F:/Git/Me/cs690TestAutomation-main/sampleWeb/src/exampleWeb/index.html');
  await page.getByRole('textbox', { name: 'Last Name:' }).click();
  await page.getByRole('textbox', { name: 'Last Name:' }).fill('testa');
  await page.getByRole('textbox', { name: 'First Name:' }).click();
  await page.getByRole('textbox', { name: 'First Name:' }).fill('test');
  await page.getByRole('textbox', { name: 'Middle Initial:' }).click();
  await page.getByRole('textbox', { name: 'Middle Initial:' }).fill('a');
  await page.getByRole('textbox', { name: 'Today\'s Date:' }).fill('2025-11-05');
  await page.getByRole('textbox', { name: 'Date of Birthy:' }).fill('2025-11-05');
  await page.getByRole('textbox', { name: 'Age:' }).click();
  await page.getByRole('textbox', { name: 'Age:' }).fill('2');
  await page.locator('div').filter({ hasText: 'Male' }).nth(2).click();
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
});