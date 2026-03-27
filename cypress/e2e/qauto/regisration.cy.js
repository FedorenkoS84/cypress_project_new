/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
import GaragePage from "../../pom/pages/GaragePage";
beforeEach(() => {
  HomePage.visit();
  HomePage.openRegistrationForm();
});
describe("Registration Form", () => {
  const RED = "rgb(220, 53, 69)";
  // -------------------
  // Success Registration
  // -------------------
  it("Success Registration", () => {
    const uniqueEmail = `test${Date.now()}@gmail.com`;

    SignUpForm.register({
      name: "Serhii",
      lastName: "Fedorenko",
      email: uniqueEmail,
      password: "1234Test",
      repeatPassword: "1234Test",
    });

    // Перевірка, що ми на Garage
    GaragePage.pageTitle.should("have.text", "Garage");
  });

  // -------------------
  // Name field tests
  // -------------------
  context("Field Name", () => {
    it("Empty field Name", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.name);
      SignUpForm.verifyErrorMessage("Name required");
    });

    it("Name is invalid", () => {
      SignUpForm.name.type(" S ");
      SignUpForm.triggerErrorOnField(SignUpForm.name);

      SignUpForm.verifyErrorMessage("Name is invalid");
      // SignUpForm.shouldHaveError(SignUpForm.name, "Name is invalid");
    });

    it("Name too short", () => {
      SignUpForm.name.type("S");
      SignUpForm.triggerErrorOnField(SignUpForm.name);
      SignUpForm.verifyErrorMessage(
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("Name too long", () => {
      SignUpForm.typeName("A".repeat(21));
      SignUpForm.triggerErrorOnField(SignUpForm.name);
      SignUpForm.verifyErrorMessage(
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("Name border red", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.name);
      SignUpForm.verifyBorderColor(SignUpForm.name, RED);
    });
  });
  // -------------------
  // LastName field tests
  // -------------------
  context("Field Last Name", () => {
    it("Empty field Last Name", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.lastName);
      SignUpForm.verifyErrorMessage("Last name required");
    });

    it("Last Name invalid", () => {
      SignUpForm.lastName.type(" S ");
      SignUpForm.triggerErrorOnField(SignUpForm.lastName);
      SignUpForm.verifyErrorMessage("Last name is invalid");
    });

    it("Last Name too short", () => {
      SignUpForm.lastName.type("F");
      SignUpForm.triggerErrorOnField(SignUpForm.lastName);
      SignUpForm.verifyErrorMessage(
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("Last Name too long", () => {
      SignUpForm.lastName.type("B".repeat(21));
      // cy.pause();
      SignUpForm.triggerErrorOnField(SignUpForm.lastName);
      // SignUpForm.verifyErrorMessage(
      //   "Last name has to be from 2 to 20 characters long",
      // );
    });

    it("Last Name border red", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.lastName);
      SignUpForm.verifyBorderColor(SignUpForm.lastName, RED);
    });

    context("Field email", () => {
      // -------------------
      // Email field tests
      // -------------------
      it("Empty field Email", () => {
        SignUpForm.triggerErrorOnField(SignUpForm.email);
        SignUpForm.verifyErrorMessage("Email required");
      });

      it("Email is incorrect", () => {
        SignUpForm.email.type("serg@gmail");
        SignUpForm.triggerErrorOnField(SignUpForm.email);
        SignUpForm.verifyErrorMessage("Email is incorrect");
      });

      it("Email border red", () => {
        SignUpForm.triggerErrorOnField(SignUpForm.email);
        SignUpForm.verifyBorderColor(SignUpForm.email, RED);
      });
    });
  });

  // -------------------
  // Password field tests
  // -------------------
  context("Field password", () => {
    it("Password required", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyErrorMessage("Password required");
      // SignUpForm.shouldHaveError(SignUpForm.password, "Password required");
    });

    it("Password too short", () => {
      SignUpForm.password.type("Aa1");
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyErrorMessage(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password too long", () => {
      SignUpForm.password.type("Aa1" + "a".repeat(13));
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyErrorMessage(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    // it("Password no integer", () => {
    //   SignUpForm.typePassword("PasswordA");
    //   SignUpForm.registerBtn.click({ force: true });
    //   SignUpForm.triggerErrorOnField(SignUpForm.password);
    //   SignUpForm.verifyErrorMessage(
    //     "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    //   );
    // });

    it("Password no capital letter", () => {
      SignUpForm.typePassword("password1");
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyErrorMessage(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password no small letter", () => {
      SignUpForm.typePassword("PASSWORD1");
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyErrorMessage(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Password border red", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.password);
      SignUpForm.verifyBorderColor(SignUpForm.password, RED);
    });
  });

  // -------------------
  // Repeat Password tests
  // -------------------
  context("Field Repeat Password", () => {
    it("Repeat Password empty", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.repeatPassword);
      SignUpForm.verifyErrorMessage("Re-enter password required");
    });

    it("Repeat Password too short", () => {
      SignUpForm.typeRepeatPassword("Bb1");
      SignUpForm.triggerErrorOnField(SignUpForm.repeatPassword);
      SignUpForm.verifyErrorMessage(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("Repeat password Border color red", () => {
      SignUpForm.triggerErrorOnField(SignUpForm.repeatPassword);
      SignUpForm.verifyBorderColor(SignUpForm.repeatPassword, RED);
    });
  });

  // -------------------
  // Register Button
  // -------------------
  context("Register Button", () => {
    it("Register button enabled when form valid", () => {
      const uniqueEmail = `test${Date.now()}@gmail.com`;
      SignUpForm.fillFullForm({
        name: "Serg",
        lastName: "Fedorenko",
        email: uniqueEmail,
        password: "Password1",
        repeatPassword: "Password1",
      });
      SignUpForm.registerBtn.should("not.be.disabled");
    });

    it("Register button disabled when form empty", () => {
      SignUpForm.registerBtn.should("be.disabled");
    });
  });
});
