class SignUpForm {
  elements = {
    nameInput: () => cy.get("#signupName"),
    lastNameInput: () => cy.get("#signupLastName"),
    emailInput: () => cy.get("#signupEmail"),
    passwordInput: () => cy.get("#signupPassword"),
    repeatPasswordInput: () => cy.get("#signupRepeatPassword"),
    registerButton: () => cy.contains(".modal-content button", "Register"),
  };

  typeName(value) {
    this.elements.nameInput().clear().type(value);
    return this;
  }

  typeLastName(value) {
    this.elements.lastNameInput().clear().type(value);
    return this;
  }

  typeEmail(value) {
    this.elements.emailInput().clear().type(value);
    return this;
  }

  typePassword(value) {
    this.elements.passwordInput().clear().type(value);
    return this;
  }

  typeRepeatPassword(value) {
    this.elements.repeatPasswordInput().clear().type(value);
    return this;
  }

  focus(field) {
    this.elements[field + "Input"]().focus();
    return this;
  }

  blur(field) {
    this.elements[field + "Input"]().blur();
    return this;
  }

  shouldHaveError(field, message) {
    this.elements[field + "Input"]()
      .parent()
      .find(".invalid-feedback")
      .should("have.text", message);
    return this;
  }

  shouldHaveBorderColor(field, color) {
    this.elements[field + "Input"]().should("have.css", "border-color", color);
    return this;
  }

  register(user) {
    this.typeName(user.name)
      .typeLastName(user.lastName)
      .typeEmail(user.email)
      .typePassword(user.password)
      .typeRepeatPassword(user.password)
      .elements.registerButton()
      .click();
  }
}

export default new SignUpForm();
