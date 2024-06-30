import { test, expect } from '@playwright/test'

test.describe('Sauce shop', () => {
  test('Success Auth', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.locator('(//input[@data-test="username"])').fill('standard_user')
    await page.locator('(//input[@data-test="password"])').fill('secret_sauce')
    await page.getByTestId('login-button').click()

    const locator = page.locator('(//span[@data-test="title"])')
    await expect(locator).toContainText('Products')
  })

  test('Blocked user try', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.getByPlaceholder('Username').fill('locked_out_user')
    await page.locator('(//input[@data-test="password"])').fill('secret_sauce')
    await page.getByTestId('login-button').click()

    const errorLocator = page.locator(
      '(//h3[contains(text(), "Epic sadface: Sorry, this user has been locked out.")])',
    )
    await expect(errorLocator).toBeVisible()
  })

  test('Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.locator('(//input[@data-test="username"])').fill('standard_user')
    await page.locator('(//input[@data-test="password"])').fill('secret_sauce')
    await page.getByTestId('login-button').click()

    const locator = page.locator('(//span[@data-test="title"])')
    await expect(locator).toContainText('Products')

    await page.locator('(//button[@id="react-burger-menu-btn"])').click()
    await page.locator('(//a[contains(text(), "Logout")])').click()

    await expect(page.getByPlaceholder('Username')).toBeVisible()
  })

  test('Add an item to the basket', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.locator('(//input[@data-test="username"])').fill('standard_user')
    await page.locator('(//input[@data-test="password"])').fill('secret_sauce')
    await page.getByTestId('login-button').click()

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
    await page.getByTestId('shopping-cart-link').click()

    const cartLocator = page.locator('(//span[contains(text(), "Your Cart")])')
    await expect(cartLocator).toBeVisible()

    const itemLocator = page.locator(
      '(//div[contains(text(), "Sauce Labs Backpack")])',
    )
    await expect(itemLocator).toBeVisible()
  })

  test('Remove an item from basket', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.locator('(//input[@data-test="username"])').fill('standard_user')
    await page.locator('(//input[@data-test="password"])').fill('secret_sauce')
    await page.getByTestId('login-button').click()

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
    await page.getByTestId('shopping-cart-link').click()

    const cartLocator = page.locator('(//span[contains(text(), "Your Cart")])')
    await expect(cartLocator).toBeVisible()

    const itemLocator = page.locator(
      '(//div[contains(text(), "Sauce Labs Backpack")])',
    )
    await expect(itemLocator).toBeVisible()

    await page.getByTestId('remove-sauce-labs-backpack').click()
    await expect(itemLocator).not.toBeVisible()
  })
})
