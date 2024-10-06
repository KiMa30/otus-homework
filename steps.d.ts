/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js')
type loginPage = typeof import('./bdd_tests/pages/LoginPage.js')
type authResultPage = typeof import('./bdd_tests/pages/AuthResult.js')

declare namespace CodeceptJS {
  interface SupportObject {
    I: I
    current: any
    loginPage: loginPage
    authResultPage: authResultPage
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
