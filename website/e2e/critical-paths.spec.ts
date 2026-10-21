// Critical paths from spec §9 and WCAG AA checks.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home → visit us shows address and service times', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero')).toContainText('10:00');
  if (await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
  await page.locator('.site-header').getByRole('link', { name: 'Visítenos' }).first().click();
  await expect(page).toHaveURL(/\/visitenos\/$/);
  await expect(page.locator('address').first()).toBeVisible();
});

test('language switch keeps the visitor on the same page', async ({ page }) => {
  await page.goto('/creemos/confesion-1689/8/');
  if (await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
  await page.locator('.site-header a.lang').click();
  await expect(page).toHaveURL(/\/en\/beliefs\/1689-confession\/8\/$/);
  await expect(page.locator('h1')).toContainText('Of Christ the Mediator');
});

test('Confession chapter: proof text popover and paragraph anchor', async ({ page }) => {
  await page.goto('/en/beliefs/1689-confession/1/#p-4');
  await expect(page.locator('#p-4')).toBeInViewport();
  await page.locator('#p-1 .fn-btn').first().click();
  const pop = page.locator('.note-pop:popover-open');
  await expect(pop).toContainText('2 Timothy 3:15');
  await expect(pop).toContainText('holy scriptures'); // KJV text
  await expect(pop.locator('a').first()).toHaveAttribute('href', /bible\.com\/bible\/1\/2TI\.3\.15-17\.KJV/);
});

test('reader settings persist across pages', async ({ page }) => {
  await page.goto('/creemos/confesion-1689/1/');
  await page.locator('.rb-aa').click();
  await page.locator('[data-set="theme"][data-value="night"]').click();
  await page.goto('/creemos/confesion-1689/2/');
  await expect(page.locator('html')).toHaveAttribute('data-reader-theme', 'night');
});

test('sermon filters update the list and the URL', async ({ page }) => {
  await page.goto('/sermones/');
  await page.locator('select[name="predicador"]').selectOption('mauro-vargas');
  await expect(page.locator('[data-item]:visible')).toHaveCount(6);
  await expect(page).toHaveURL(/predicador=mauro-vargas/);
  await page.locator('[data-item]:visible a').first().click();
  await page.locator('.yt-poster').click();
  await expect(page.locator('iframe.yt-frame')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\//);
});

test('catechism hide-answers mode', async ({ page }) => {
  await page.goto('/creemos/catecismo/');
  await page.locator('[data-hide-answers]').check();
  await expect(page.locator('#p-1 [data-answer]')).toBeHidden();
  await page.locator('#p-1 [data-reveal]').click();
  await expect(page.locator('#p-1 [data-answer]')).toBeVisible();
});

for (const path of ['/', '/en/', '/creemos/confesion-1689/1/', '/creemos/catecismo/1/', '/sermones/', '/visitenos/', '/actividades/']) {
  test(`no WCAG A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
