/// <reference types="cypress" />
beforeEach(() => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  });
  cy.get(".header_signin").click();
});
describe("Signin Form", () => {
  context("Sign in Process", () => {
    //Test1 - Success sign in
    it("Success sign in", () => {
      cy.get("#signinEmail").type("fedorenkos084+test1@gmail.com");
      cy.get("#signinPassword").type("12345Test1");
      cy.get(".modal-content .btn-primary").click();
      cy.get("h1").should("have.text", "Garage");
    });
    //Test2 - Invalid password
    it("Sign in with Invalid password", () => {
      cy.get("#signinEmail").type("fedorenkos084+test1@gmail.com");
      cy.get("#signinPassword").type("12345TestTest");
      cy.get(".modal-content .btn-primary").click();
      cy.get(".alert-danger").should("have.text", "Wrong email or password");
    });
    //Test3 - Invalid email and password
    it("Invalid email and password", () => {
      cy.get("#signinEmail").type("fedorenkos084+test@gmail.com");
      cy.get("#signinPassword").type("1TestTest");
      cy.get(".modal-content .btn-primary").click();
      cy.get(".alert-danger").should("have.text", "Wrong email or password");
    });
  });
  context("Email validation", () => {
    //Test4 - Empty email validation
    it("Empty email", () => {
      cy.get("#signinEmail").focus("");
      cy.get("#signinEmail").blur("");
      cy.get(".invalid-feedback").should("have.text", "Email required");
    });
    //Test5 - Incorrect email validation
    it("Incorrect email", () => {
      cy.get("#signinEmail").type("asdadass");
      cy.get("#signinEmail").blur("");
      cy.get(".invalid-feedback").should("have.text", "Email is incorrect");
    });
  });
  context("Password validation", () => {
    //Test6 - Empty password validation
    it("Empty password", () => {
      cy.get("#signinPassword").focus("");
      cy.get("#signinPassword").blur("");
      cy.get(".invalid-feedback").should("have.text", "Password required");
    });
  });
});
