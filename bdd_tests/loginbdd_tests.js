Feature('login')

Scenario('Log in successful', ({ I, loginPagePage }) => {
  I.goToHomePage()
  loginPagePage.login('standard_user', 'secret_sauce')
  I.see('Products')
})

Scenario('Login and logout', ({ I, loginPagePage }) => {
  I.goToHomePage()
  loginPagePage.login('standard_user', 'secret_sauce')
  I.see('Products')
  loginPagePage.logOut()
  I.dontSee('Products')
})

Scenario('User was not filled', ({ I, loginPagePage, authResultPage }) => {
  I.goToHomePage()
  loginPagePage.login('', '')
  authResultPage.logError('Epic sadface: Username is required')
})

Scenario('Password was not filled', ({ I, loginPagePage, authResultPage }) => {
  I.goToHomePage()
  loginPagePage.login('standard_user', '')
  authResultPage.logError('Epic sadface: Password is required')
})

Scenario('User was blocked', ({ I, loginPagePage, authResultPage }) => {
  I.goToHomePage()
  loginPagePage.login('locked_out_user', 'secret_sauce')
  authResultPage.logError('Epic sadface: Sorry, this user has been locked out.')
})

Scenario('User does not exist', ({ I, loginPagePage, authResultPage }) => {
  I.goToHomePage()
  loginPagePage.login('user', 'secret_sauce')
  authResultPage.logError(
    'Epic sadface: Username and password do not match any user in this service',
  )
})
