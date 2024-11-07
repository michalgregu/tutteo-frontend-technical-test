import { test, expect } from '@playwright/test'

test.describe('Playback Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('player controls have correct labels and icons', async ({ page }) => {
    const controls = [
      { label: 'Previous Track', icon: 'fa-backward-step' },
      { label: 'Play', icon: 'fa-play' },
      { label: 'Next Track', icon: 'fa-forward-step' },
      { label: 'Stop', icon: 'fa-stop' },
    ]

    for (const control of controls) {
      const button = page.getByRole('button', { name: control.label })

      await expect(button).toBeVisible()

      await expect(
        button.locator(`svg[class*="${control.icon}"]`)
      ).toBeVisible()
    }
  })

  test('play button toggles between play and pause states', async ({
    page,
    browserName,
  }) => {
    await page.waitForSelector('[data-testid="play-pause"]', {
      state: 'visible',
      timeout: 15000,
    })

    const playButton = page.getByTestId('play-pause')

    await expect(playButton).toBeVisible()

    await expect(async () => {
      const playIcon = await page.getByTestId('play-icon')
      await expect(playIcon).toBeVisible()
    }).toPass({
      timeout: 10000,
      intervals: [1000],
    })

    const stabilizationTime = browserName === 'chromium' ? 100 : 500

    await playButton.click()
    await page.waitForTimeout(stabilizationTime)

    await expect(async () => {
      const pauseIcon = await page.getByTestId('pause-icon')
      await expect(pauseIcon).toBeVisible()
    }).toPass({
      timeout: 10000,
      intervals: [1000],
    })

    await playButton.click()
    await page.waitForTimeout(stabilizationTime)

    await expect(async () => {
      const playIcon = await page.getByTestId('play-icon')
      await expect(playIcon).toBeVisible()
    }).toPass({
      timeout: 10000,
      intervals: [1000],
    })
  })

  test('controls maintain proper spacing', async ({ page }) => {
    const controls = page.locator('[class*="controls"]')

    const gap = await controls.evaluate((el) => {
      return window.getComputedStyle(el).gap
    })

    expect(gap).toBe('16px')
  })
})
