import { test, expect } from '@playwright/test'

test.describe('demo smoke', () => {
  test('home page shows the library title', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'CelestialUI Components' })).toBeVisible()
  })

  test('button playground route renders CButton', async ({ page }) => {
    await page.goto('/playground/atomic/button')
    await expect(page.getByRole('heading', { name: 'CButton Component' })).toBeVisible()
    await expect(page.getByRole('button').first()).toBeVisible()
  })
})
