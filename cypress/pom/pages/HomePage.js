class HomePage {
  get sighInButton() {
    return cy.get(".header_signin");
  }
  // visit() {
  //   cy.visit("/");
  // }
  visit() {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  }
  openSignInForm() {
    this.sighInButton.click();
  }
}

export default new HomePage();
