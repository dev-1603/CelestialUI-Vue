import { test, expect } from '@playwright/test'

test.describe('auth organism smoke chain', () => {
  test.beforeEach(async ({ page }) => {
    page.on('dialog', async (dialog) => {
      await dialog.dismiss()
    })
  })

  test('identifier resolver accepts synthetic tenant email', async ({ page }) => {
    await page.goto('/playground/organism/identifier-first-resolver')
    await expect(page.getByRole('heading', { name: 'Identifier First Resolver' })).toBeVisible()

    const identifierInput = page.getByRole('textbox', { name: 'Email or Phone' }).first()
    await identifierInput.fill('tenant-a.user@example.com')
    await page.getByRole('button', { name: 'Continue' }).first().click()
  })

  test('auth method dispatcher shows password flow for resolved identity', async ({ page }) => {
    await page.goto('/playground/organism/auth-method-dispatcher')
    await expect(page.getByRole('heading', { name: 'Auth Method Dispatcher' })).toBeVisible()
    await expect(page.getByText('jane.doe@example.com').first()).toBeVisible()
    await expect(page.getByRole('button', { name: /password/i }).first()).toBeVisible()
  })

  test('mfa challenge panel renders TOTP verification UI', async ({ page }) => {
    await page.goto('/playground/organism/mfa-challenge-panel')
    await expect(page.getByRole('heading', { name: 'MFA Challenge Panel' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'TOTP (Authenticator App)' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Verify' }).first()).toBeVisible()
    await expect(page.getByLabel('Digit 1').first()).toBeVisible()
  })

  test('qr session canvas shows active cross-device auth state', async ({ page }) => {
    await page.goto('/playground/organism/qr-session-canvas')
    await expect(page.getByRole('heading', { name: 'QR Session Canvas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Active', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: /cancel/i }).first()).toBeVisible()
  })
})
