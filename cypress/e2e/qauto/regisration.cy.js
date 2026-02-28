/// <reference types="cypress" />

import SignUpForm from "../../pom/forms/SignUpForm";
import GaragePage from "../../pom/pages/GaragePage";

beforeEach(() => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  });
  cy.get(".header_signin").click();
  cy.contains(".modal-content .btn-link", "Registration").click();
});

describe("Registration Form", () => {
  context("Registration Success", () => {
    //Test1 - Success Registragion
    it("Success Registragion", () => {
      const user = {
        name: "Serhii",
        lastName: "Fedorenko",
        email: `fedorenkos084+${Date.now()}@gmail.com`,
        password: "1234Test",
      };
      SignUpForm.register(user);
      GaragePage.pageTitle.should("have.text", "Garage");
    });

    //Test2 - Empty field - "Name required"
    it("Empty field", () => {
      SignUpForm.focus("name").blur("name");
      SignUpForm.shouldHaveError("name", "Name required");
    });

    //Test3 - Name is invalid
    it("Name is invalid", () => {
      SignUpForm.typeName(" S ").blur("name");
      SignUpForm.shouldHaveError("name", "Name is invalid");
    });

    //Test4 - Wrong length - min
    it("Wrong length (min)", () => {
      SignUpForm.typeName("S").blur("name");
      SignUpForm.shouldHaveError(
        "name",
        "Name has to be from 2 to 20 characters long",
      );
    });

    //Test4 - Wrong length - max
    it("Wrong length (max)", () => {
      SignUpForm.typeName("A".repeat(21)).blur("name");
      SignUpForm.shouldHaveError(
        "name",
        "Name has to be from 2 to 20 characters long",
      );
    });

    //Test5 - Border color red
    it("Border color red", () => {
      SignUpForm.focus("name").blur("name");
      SignUpForm.shouldHaveBorderColor("name", "rgb(220, 53, 69)");
    });
  });

  context("Field Last Name", () => {
    //Test2 - Empty field - "Last Name is required"
    it("Empty field Last Name", () => {
      SignUpForm.focus("lastName").blur("lastName");
      SignUpForm.shouldHaveError("lastName", "Last name required");
    });

    //Test3 - Wrong data - "Last Name is invalid"
    it("Last name is invalid", () => {
      SignUpForm.typeLastName(" S ").blur("lastName");
      SignUpForm.shouldHaveError("lastName", "Last name is invalid");
    });

    //Test4 - Wrong length - min
    it("LastName Wrong length (min)", () => {
      SignUpForm.typeLastName("F").blur("lastName");
      SignUpForm.shouldHaveError(
        "lastName",
        "Last name has to be from 2 to 20 characters long",
      );
    });

    //Test4 - Wrong length - max
    it("LastName Wrong length (max)", () => {
      SignUpForm.typeLastName("B".repeat(21)).blur("lastName");
      SignUpForm.shouldHaveError(
        "lastName",
        "Last name has to be from 2 to 20 characters long",
      );
    });

    //Test5 - Border color red
    it("LastName Border color red", () => {
      SignUpForm.focus("lastName").blur("lastName");
      SignUpForm.shouldHaveBorderColor("lastName", "rgb(220, 53, 69)");
    });
  });

  context("Field Email", () => {
    //Test1 - Empty field - "Email required"
    it("Empty field Email", () => {
      SignUpForm.focus("email").blur("email");
      SignUpForm.shouldHaveError("email", "Email required");
    });

    //Test2 - Wrong data - "Email is incorrect"
    it("Email is incorrect", () => {
      SignUpForm.typeEmail("serg@gmail").blur("email");
      SignUpForm.shouldHaveError("email", "Email is incorrect");
    });

    //Test3 - Border color red
    it("Email Border color red", () => {
      SignUpForm.focus("email").blur("email");
      SignUpForm.shouldHaveBorderColor("email", "rgb(220, 53, 69)");
    });
  });

  context("Field Password", () => {
    //Test1 - Empty field - "Password required"
    it("Password required", () => {
      SignUpForm.focus("password").blur("password");
      SignUpForm.shouldHaveError("password", "Password required");
    });

    //Test3 - Wrong data
    it("Password is shorter than 8 characters", () => {
      SignUpForm.typePassword("Aa1").blur("password");
      SignUpForm.shouldHaveError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password is longer than 15 characters", () => {
      SignUpForm.typePassword("Aa1" + "a".repeat(13)).blur("password");
      SignUpForm.shouldHaveError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password has no integer", () => {
      SignUpForm.typePassword("PasswordA").blur("password");
      SignUpForm.shouldHaveError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password has no capital letter", () => {
      SignUpForm.typePassword("password1").blur("password");
      SignUpForm.shouldHaveError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password has no small letter", () => {
      SignUpForm.typePassword("PASSWORD1").blur("password");
      SignUpForm.shouldHaveError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    //Test4 - Border color red
    it("Password Border color red", () => {
      SignUpForm.focus("password").blur("password");
      SignUpForm.shouldHaveBorderColor("password", "rgb(220, 53, 69)");
    });
  });

  context("Field Re-enter password", () => {
    //Test1 - Empty field
    it("RepeatPassword Empty field", () => {
      SignUpForm.focus("repeatPassword").blur("repeatPassword");
      SignUpForm.shouldHaveError(
        "repeatPassword",
        "Re-enter password required",
      );
    });

    //Test2 - Wrong data
    it("Repeat password is shorter than 8 characters", () => {
      SignUpForm.typeRepeatPassword("Bb1").blur("repeatPassword");
      SignUpForm.shouldHaveError(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    //Test3 - Border color red
    it("Repeat password Border color red", () => {
      SignUpForm.focus("repeatPassword").blur("repeatPassword");
      SignUpForm.shouldHaveBorderColor("repeatPassword", "rgb(220, 53, 69)");
    });
  });

  //Test3 - Button Register
  context("Button Register", () => {
    it("Register button should be enabled when form is valid", () => {
      const uniqueEmail = `test${Date.now()}@gmail.com`;

      SignUpForm.typeName("Serg")
        .typeLastName("Fedorenko")
        .typeEmail(uniqueEmail)
        .typePassword("Password1")
        .typeRepeatPassword("Password1");

      SignUpForm.elements.registerButton().should("not.be.disabled");
    });

    it("Register button should be disabled when form is Empty", () => {
      SignUpForm.elements.registerButton().should("be.disabled");
    });
  });
});
