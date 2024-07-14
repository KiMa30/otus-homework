const { I } = inject();

module.exports = {

  errorMsg: 'h3[data-test="error"]',
    
  logError(text) {
    I.see(`${text}`, this.errorMsg)
  }

}
