// import { locator, page, expect } from '@playwright/test'
import { expect } from '@playwright/test'

export class XYZbankPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page
    this.submitButton = page.locator('(//button[@type="submit"])')
    this.accountBalance = page.locator('(//strong[@class="ng-binding"][2])')
  }

  async clickButton(buttonName) {
    await this.page
      .locator(`(//button[contains(text(), "${buttonName}")])`)
      .click()
  }

  async fillInput(nameOfInput, data) {
    await this.page.getByPlaceholder(`${nameOfInput}`).fill(`${data}`)
  }

  async submit() {
    await this.submitButton.click()
  }

  async addedCustomer(fistName, lastName, postCode) {
    await expect(
      this.page.locator(`(//td[contains(text(), "${fistName}")])`),
    ).toBeVisible()
    await expect(
      this.page.locator(`(//td[contains(text(), "${lastName}")])`),
    ).toBeVisible()
    await expect(
      this.page.locator(`(//td[contains(text(), "${postCode}")])`),
    ).toBeVisible()
  }

  async notAddedCustomer(fistName, lastName, postCode) {
    await expect(
      this.page.locator(`(//td[contains(text(), "${fistName}")])`),
    ).not.toBeVisible()
    await expect(
      this.page.locator(`(//td[contains(text(), "${lastName}")])`),
    ).not.toBeVisible()
    await expect(
      this.page.locator(`(//td[contains(text(), "${postCode}")])`),
    ).not.toBeVisible()
  }

  async delCustomer(lastName) {
    await this.page
      .locator(
        `(//td[contains(text(), "${lastName}")]
      //following::button[@ng-click="deleteCust(cust)"][1])`,
      )
      .click()
  }

  async clickSelect(selectID) {
    await this.page.locator(`//select[@id="${selectID}"]`).click()
  }

  async chooseSelectOptin(option) {
    await this.page
      .locator(`//select/option[contains(text(), "${option}")]`)
      .click()
  }

  async userIsLogin(user) {
    await this.page.waitForTimeout(1 * 1000)
    await expect(
      this.page.locator(`((//span[contains(text(), "${user}")]))`),
    ).toBeVisible()
  }

  async getAccBalance() {
    const stringBalance = (await this.accountBalance.textContent()) || ''
    const numberBalance = Number(stringBalance)
    return numberBalance
  }

  async transactionResult(errorOrSuccess) {
    await this.page.waitForTimeout(2 * 1000)
    await expect(
      this.page.locator(`(//span[contains(text(), "${errorOrSuccess}")])`),
    ).toBeVisible()
  }
}
