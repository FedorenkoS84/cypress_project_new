/// <reference types="cypress" />

import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import users from "../../fixtures/users.json";
import GaragePage from "../../pom/pages/GaragePage";
beforeEach(() => {
  HomePage.visit();
  HomePage.openSignInForm();
});

//HomePage
//Sigh in Form
//GaragePage

describe("Signin Form", () => {
  context("Sign in Process", () => {
    //Test1 - Success sign in
    it.only("Success sign in", () => {
      SignInForm.login(users.correctUser.email, users.correctUser.password);
      GaragePage.pageTitle.should("have.text", "Garage");
    });
    //Test2 - Invalid password
    it("Sign in with Invalid password", () => {
      SignInForm.login(users.correctUser.email, "12345TestTest");
      SignInForm.wrongDataErrorMessage.should(
        "have.text",
        "Wrong email or password",
      );
    });
    //Test3 - Invalid email and password
    it("Invalid email and password", () => {
      SignInForm.login("fedorenkos084+test@gmail.com", "1TestTest");
      SignInForm.wrongDataErrorMessage.should(
        "have.text",
        "Wrong email or password",
      );
    });
  });
  context("Email validation", () => {
    //Test4 - Empty email validation
    it("Empty email", () => {
      // cy.get("#signinEmail").focus("");
      // cy.get("#signinEmail").blur("");
      SignInForm.triggerErrorOnField(SignInForm.emailField);
      SignInForm.wrongInputErrorMessage.should("have.text", "Email required");
    });
    //Test5 - Incorrect email validation
    it("Incorrect email", () => {
      SignInForm.enterEmail("asdadass");
      // cy.get("#signinEmail").blur("");
      SignInForm.triggerErrorOnField(SignInForm.emailField);
      SignInForm.wrongInputErrorMessage.should(
        "have.text",
        "Email is incorrect",
      );
    });
  });
  context("Password validation", () => {
    //Test6 - Empty password validation
    it("Empty password", () => {
      // cy.get("#signinPassword").focus("");
      // cy.get("#signinPassword").blur("");
      SignInForm.triggerErrorOnField(SignInForm.passwordField);
      SignInForm.wrongInputErrorMessage.should(
        "have.text",
        "Password required",
      );
    });
  });
});
