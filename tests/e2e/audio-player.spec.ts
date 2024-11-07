import { test, expect } from '@playwright/test'

async function waitForPlayerState(
  page,
  expectedState: 'playing' | 'paused',
  timeout = 10000
) {
  const iconTestId = expectedState === 'playing' ? 'pause-icon' : 'play-icon'

  await expect(async () => {
    const icon = page.getByTestId(iconTestId)
    await expect(icon).toBeVisible()
  }).toPass({
    timeout,
    intervals: [1000],
  })
}

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

  test('keyboard controls work', async ({ page, browserName }) => {
    await expect(async () => {
      const playButton = page.getByTestId('play-pause')
      await expect(playButton).toBeVisible()
    }).toPass({
      timeout: 15000,
      intervals: [1000],
    })

    await page.waitForLoadState('networkidle')

    const stabilizationTime = browserName === 'chromium' ? 100 : 500

    await waitForPlayerState(page, 'paused')

    await page.keyboard.press('Space')
    await page.waitForTimeout(stabilizationTime)

    await waitForPlayerState(page, 'playing')

    await page.keyboard.press('Space')
    await page.waitForTimeout(stabilizationTime)

    await waitForPlayerState(page, 'paused')
  })
})
