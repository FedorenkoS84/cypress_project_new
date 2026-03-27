class SignInForm {
  get emailField() {
    return cy.get("#signinEmail");
  }
  get passwordField() {
    return cy.get("#signinPassword");
  }
  get loginButton() {
    return cy.get(".modal-content .btn-primary");
  }
  get wrongDataErrorMessage() {
    return cy.get(".alert-danger");
  }
  get wrongInputErrorMessage() {
    return cy.get(".invalid-feedback");
  }
  enterEmail(email) {
    this.emailField.type(email);
  }
  enterPassword(password) {
    this.passwordField.type(password);
  }
  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.loginButton.click();
  }
  triggerErrorOnField(field) {
    field.focus();
    field.blur();
  }
  //   verifyWrongDataErrorMessage(message) {
  //     this.verifyWrongDataErrorMessage.should("have.text", message);
  //   }
}
export default new SignInForm();
