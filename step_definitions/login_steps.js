const { I, loginPage, authResultPage } = inject()

Given('я на главной странице', () => {
  I.goToHomePage()
})

When(
  'я ввожу имя пользователя {string} и пароль {string}',
  (username, password) => {
    loginPage.login(username, password)
  },
)

Then('я вижу {string}', text => {
  I.see(text)
})

Then('я не вижу {string}', text => {
  I.dontSee(text)
})

When('я выхожу', () => {
  loginPage.logOut()
})

Then('я вижу сообщение об ошибке {string}', message => {
  authResultPage.logError(message)
})
