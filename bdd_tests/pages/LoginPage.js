const { I } = inject();

module.exports = {
  inputs: {
    userName: '//input[@data-test="username"]',
    passWord: '//input[@data-test="password"]'
  },

  loginButton: '//input[@data-test="login-button"]',
  menuButton: '//button[contains(., "Open Menu")]',

  login(usrnm, psswrd) {
    I.fillField(this.inputs.userName, usrnm);
    I.fillField(this.inputs.passWord, psswrd);
    I.click(this.loginButton)
  },

  logOut() {
    I.seeElement(this.menuButton);
    I.click(this.menuButton);
    I.click('Logout', 'a[data-test="logout-sidebar-link"]')
  }
}
