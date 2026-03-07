//

class SignUpForm {
  get name() {
    return cy.get("#signupName");
  }
  get lastName() {
    return cy.get("#signupLastName");
  }
  get email() {
    return cy.get("#signupEmail");
  }
  get password() {
    return cy.get("#signupPassword");
  }
  get repeatPassword() {
    return cy.get("#signupRepeatPassword");
  }
  get registerBtn() {
    return cy.get(".modal-content .btn-primary");
  }
  // get lastNameError() {
  //   return this.lastName.parent(".invalid-feedback");
  // }
  // 🔹 ОНОВЛЕНО: Тепер ми не просто шукаємо всі класи, а чекаємо на видиму помилку
  get wrongInputErrorMessage() {
    return cy.get(".invalid-feedback");
  }

  // 🔹 ОНОВЛЕНО: Додаємо перевірку видимості, щоб Cypress встиг знайти текст
  verifyErrorMessage(expectedText) {
    this.wrongInputErrorMessage
      .should("be.visible")
      .should("have.text", expectedText);
  }

  // 🔹 ОНОВЛЕНО: Додаємо clear() та blur(), щоб валідація спрацьовувала стабільно
  triggerErrorOnField(field) {
    field.focus().blur();
    // cy.get("body").click();
  }

  verifyBorderColor(field, color) {
    field.should("have.css", "border-color", color);
  }

  // Методи введення: додаємо .clear() про всяк випадок і .blur() для спрацювання помилки
  typeName(value) {
    this.name.clear().type(value).blur();
  }

  typeLastName(value) {
    this.lastName.clear().type(value).blur();
  }

  typeEmail(value) {
    this.email.clear().type(value).blur();
  }

  typePassword(value) {
    this.password.clear().type(value).blur();
  }

  typeRepeatPassword(value) {
    this.repeatPassword.clear().type(value).blur();
  }

  fillFullForm({ name, lastName, email, password, repeatPassword }) {
    if (name) this.typeName(name);
    if (lastName) this.typeLastName(lastName);
    if (email) this.typeEmail(email);
    if (password) this.typePassword(password);
    if (repeatPassword) this.typeRepeatPassword(repeatPassword);
  }

  submit() {
    this.registerBtn.click();
  }

  register(data) {
    this.fillFullForm(data);
    this.submit();
  }
}

export default new SignUpForm();
