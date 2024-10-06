Feature('login')

Scenario('Log in successful', ({ I, loginPage }) => {
  I.goToHomePage()
  loginPage.login('standard_user', 'secret_sauce')
  I.see('Products')
})

Scenario('Login and logout', ({ I, loginPage }) => {
  I.goToHomePage()
  loginPage.login('standard_user', 'secret_sauce')
  I.see('Products')
  loginPage.logOut()
  I.dontSee('Products')
})

Scenario('User was not filled', ({ I, loginPage, authResultPage }) => {
  I.goToHomePage()
  loginPage.login('', '')
  authResultPage.logError('Epic sadface: Username is required')
})

Scenario('Password was not filled', ({ I, loginPage, authResultPage }) => {
  I.goToHomePage()
  loginPage.login('standard_user', '')
  authResultPage.logError('Epic sadface: Password is required')
})

Scenario('User was blocked', ({ I, loginPage, authResultPage }) => {
  I.goToHomePage()
  loginPage.login('locked_out_user', 'secret_sauce')
  authResultPage.logError('Epic sadface: Sorry, this user has been locked out.')
})

Scenario('User does not exist', ({ I, loginPage, authResultPage }) => {
  I.goToHomePage()
  loginPage.login('user', 'secret_sauce')
  authResultPage.logError(
    'Epic sadface: Username and password do not match any user in this service',
  )
})
