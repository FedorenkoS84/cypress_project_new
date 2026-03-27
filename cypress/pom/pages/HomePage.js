class HomePage {
  // -------------------
  // Sign In
  // -------------------
  get signInButton() {
    return cy.get(".header_signin").should("be.visible");
  }

  openSignInForm() {
    this.signInButton.click();
  }

  // -------------------
  // Sign Up / Registration
  // -------------------
  get signUpButton() {
    // точний селектор для твоєї кнопки
    return cy
      .get("button.hero-descriptor_btn", { timeout: 10000 })
      .should("be.visible");
  }

  openSignUpForm() {
    this.signUpButton.click();
  }

  // Додатковий alias для старих тестів
  openRegistrationForm() {
    return this.openSignUpForm();
  }

  // -------------------
  // Visit Page
  // -------------------
  visit() {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  }
}

export default new HomePage();
