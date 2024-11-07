import { test, expect } from '@playwright/test'

test.describe('Audio Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('player layout changes on mobile viewport', async ({ page }) => {
    await expect(page.getByTestId('volume-control')).toBeVisible()

    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.getByTestId('volume-control')).toBeHidden()

    await expect(page.getByTestId('track-info')).toBeHidden()
  })

  test('keyboard controls work', async ({ page }) => {
    const playPauseButton = page.getByTestId('play-pause')
    await expect(playPauseButton).toBeVisible()

    await page.keyboard.press('Space')
    await expect(page.getByTestId('pause-icon')).toBeVisible()

    await page.keyboard.press('Space')
    await expect(page.getByTestId('play-icon')).toBeVisible()
  })
})
