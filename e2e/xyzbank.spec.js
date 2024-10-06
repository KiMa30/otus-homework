import { expect, test } from '@playwright/test'
import { XYZbankPage } from './pageobjects/XYZbankPage'
import { config } from '../framework/config/config'

// test.describe.configure({ mode: 'serial' });
test.describe('Bank actions', () => {
  test('Customer login and logout', async ({ page }) => {
    const user = 'Hermoine Granger'

    // Переходим на страницу авторизации банка
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')

    // Подключаем страницу действий в банковском аккаунте
    const Bank = new XYZbankPage(page)

    // выбираем авторизацию клиентом
    await Bank.clickButton('Customer Login')

    // Нажимаем на селект выбора аккаунта
    await Bank.clickSelect('userSelect')

    // Выбираем Гермиону Гренджер с помощью клавиатуры, первой в списке
    // await Bank.chooseSelectOptin('Hermoine Granger')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await Bank.submit()

    // Проверяем, что авторизованы нужным клиентом
    await Bank.userIsLogin(`${user}`)

    // Выходим из аккаунта и проверяем, что находимся на странице авторизации клиента
    await Bank.clickButton('Logout')
    await expect(page.locator('(//div/label)')).toHaveText('Your Name :')
  })

  test('Customer withdraw', async ({ page }) => {
    const amount = 96

    // Переходим на страницу авторизации банка
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')

    // Подключаем страницу действий в банковском аккаунте
    const Bank = new XYZbankPage(page)

    // выбираем авторизацию клиентом
    await Bank.clickButton('Customer Login')

    // Нажимаем на селект выбора аккаунта
    await Bank.clickSelect('userSelect')

    // Выбираем Гермиону Гренджер с помощью клавиатуры, первой в списке
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await Bank.submit()

    let currentBalance = 0

    // Сохраняем в переменную текущий баланс
    currentBalance = await Bank.getAccBalance()

    // Сохраняем в переменную ожидаемый после вывода баланс
    const expectedBalance = currentBalance - `${amount}`

    // Выводим сумму со счета
    await Bank.clickButton('Withdrawl')
    await Bank.fillInput('amount', `${amount}`)
    await Bank.submit()

    // Проверяем, что операция прошла
    await Bank.transactionResult('Transaction successful')

    // Сохраняем текущий баланс после вывода
    currentBalance = await Bank.getAccBalance()

    // Сравниваем текущий баланс после выводва с ожидаемым
    if (expectedBalance === currentBalance) {
      console.log('Баланс пополнен')
    } else {
      throw new Error('Ошибка: балансы не совпадают')
    }
  })

  test('Withdraw error', async ({ page }) => {
    const amount = 96

    // Переходим на страницу авторизации банка
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')

    // Подключаем страницу действий в банковском аккаунте
    const Bank = new XYZbankPage(page)

    // выбираем авторизацию клиентом
    await Bank.clickButton('Customer Login')

    // Нажимаем на селект выбора аккаунта и авторизуемся
    await Bank.clickSelect('userSelect')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await Bank.submit()

    // Выбираем пустой банковский счет
    await Bank.clickSelect('accountSelect')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Выводим средства
    await Bank.clickButton('Withdrawl')
    await Bank.fillInput('amount', `${amount}`)
    await Bank.submit()

    // Прверяем наличие ошибки недостаточности средства на счете
    await Bank.transactionResult(
      'You can not withdraw amount more than the balance.',
    )
  })
  test('Manager adds user', async ({ page }) => {
    // Переходим на страницу авторизации банка
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')

    // Подключаем страницу действий в банковском аккаунте
    const Bank = new XYZbankPage(page)

    // Выбираем авторизацию менеджером
    await Bank.clickButton('Bank Manager Login')

    // Выбираем добавить клиета
    await Bank.clickButton('Add Customer')

    // Заполняем поля формы
    await Bank.fillInput('First Name', 'Tom')
    await Bank.fillInput('Last Name', 'Riddle')
    await Bank.fillInput('Post Code', '666666')

    // Добавляем клиента
    await Bank.submit()

    // Перелогиниваемся менеджером
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')
    await Bank.clickButton('Bank Manager Login')

    // Переходим в меню Покупатели
    await Bank.clickButton('Customers')

    // Проверяем, что клиент добавлен
    await page.waitForTimeout(5 * 1000)
    await Bank.addedCustomer('Tom', 'Riddle', '666666')
  })

  test('Delete customer', async ({ page }) => {
    // Переходим на страницу авторизации банка
    await page.goto(config.pomURL)
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')

    // Подключаем страницу действий в банковском аккаунте
    const Bank = new XYZbankPage(page)

    // Выбираем авторизацию менеджером, переходим в меню добавления клиента
    await Bank.clickButton('Bank Manager Login')
    await Bank.clickButton('Add Customer')

    // Заполняем поля формы и добавляем клиента
    await Bank.fillInput('First Name', 'Sirius')
    await Bank.fillInput('Last Name', 'Black')
    await Bank.fillInput('Post Code', '777777')
    await Bank.submit()

    // Перелогиниваемся менеджером
    await page.goto(config.pomURL)
    await page.waitForLoadState('load')
    await Bank.clickButton('Bank Manager Login')

    // Переходим в меню Покупатели и првоеряем, что клиент добавлен
    await Bank.clickButton('Customers')
    await Bank.addedCustomer('Sirius', 'Black', '777777')

    // Удаляем клиента
    await Bank.delCustomer('Black')

    // Проверяем, что клиент удален
    await Bank.notAddedCustomer('Sirius', 'Black', '777777')
  })
})
