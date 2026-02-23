/// <reference types="cypress" />
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
      cy.get("#signupName").type("Serhii");
      cy.get("#signupLastName").type("Fedorenko");
      cy.get("#signupEmail").type("fedorenkos084+test5@gmail.com");
      cy.get("#signupPassword").type("1234Test");
      cy.get("#signupRepeatPassword").type("1234Test");
      cy.get(".modal-content .btn-primary").click();
      cy.get("h1").should("have.text", "Garage");
    });
    //Test2 - Empty field - "Name required"
    it("Empty field", () => {
      cy.get("#signupName").focus("");
      cy.get("#signupName").blur("");
      cy.get(".invalid-feedback").should("have.text", "Name required");
    });
    //Test3 - Name is invalid
    it("Name is invalid", () => {
      cy.get("#signupName").type(" S ");
      cy.get("#signupName").blur("");
      cy.get(".invalid-feedback").should("have.text", "Name is invalid");
    });
    //Test4 - Wrong length - "Name has to be from 2 to 20 characters long. The field name can ba any English symbol min=2 max=20. Need to ignore space and please use function trim"
    it("Wrong length (min)", () => {
      cy.get("#signupName").type("S");
      cy.get("#signupName").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Name has to be from 2 to 20 characters long",
      );
    });
    it("Wrong length (max)", () => {
      const longName = "A".repeat(21);
      cy.get("#signupName").type(longName);
      cy.get("#signupName").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Name has to be from 2 to 20 characters long",
      );
    });
    //Test5 - Border color red
    it("Border color red ", () => {
      cy.get("#signupName").focus();
      cy.get("#signupName").blur();
      cy.get("#signupName").should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    //rgb(220, 53, 69)
  });
  context("Field Last Name", () => {
    //Test2 - Empty field - "Last Name is required"
    it("Empty field Last Name", () => {
      cy.get("#signupLastName").focus("");
      cy.get("#signupLastName").blur("");
      cy.get(".invalid-feedback").should("have.text", "Last name required");
    });
    //Test3 - Wrong data - "Last Name is invalid"
    it("Last name is invalid", () => {
      cy.get("#signupLastName").type(" S ");
      cy.get("#signupLastName").blur("");
      cy.get(".invalid-feedback").should("have.text", "Last name is invalid");
    });
    //Test4 - Wrong length - "Name has to be from 2 to 20 characters long. The field name can ba any English symbol min=2 max=20. Need to ignore space and please use function trim"
    it("LastName Wrong length (min)", () => {
      cy.get("#signupLastName").type("F");
      cy.get("#signupLastName").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Last name has to be from 2 to 20 characters long",
      );
    });
    it("LastName Wrong length (max)", () => {
      const longLastName = "B".repeat(21);
      cy.get("#signupLastName").type(longLastName);
      cy.get("#signupLastName").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Last name has to be from 2 to 20 characters long",
      );
    });
    //Test5 - Border color red
    it("LastName Border color red ", () => {
      cy.get("#signupLastName").focus();
      cy.get("#signupLastName").blur();
      cy.get("#signupLastName").should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
  context("Field Email", () => {
    //Test1 - Empty field - "Email required"
    it("Empty field Email", () => {
      cy.get("#signupEmail").focus("");
      cy.get("#signupEmail").blur("");
      cy.get(".invalid-feedback").should("have.text", "Email required");
    });
    //Test2 - Wrong data - "Email is incorrect"
    it("Email is incorrect", () => {
      cy.get("#signupEmail").type("serg@gmail");
      cy.get("#signupEmail").blur("");
      cy.get(".invalid-feedback").should("have.text", "Email is incorrect");
    });
    //Test3 - Border color red
    it("LastName Border color red ", () => {
      cy.get("#signupEmail").focus();
      cy.get("#signupEmail").blur();
      cy.get("#signupEmail").should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
  context("Field Password", () => {
    //Test1 - Empty field - "Password required"
    it("Password required", () => {
      cy.get("#signupPassword").focus("");
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should("have.text", "Password required");
    });

    //Test3 - Wrong data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital and one small letter"
    it("Password is shorter than 8 characters", () => {
      cy.get("#signupPassword").type("Aa1");
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    it("Password is longer than 15 characters", () => {
      const longPass = "Aa1" + "a".repeat(13); // 16 символів
      cy.get("#signupPassword").type(longPass);
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    it("Password has no integer", () => {
      cy.get("#signupPassword").type("PasswordA");
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    it("Password has no capital letter", () => {
      cy.get("#signupPassword").type("password1");
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    it("Password has no small letter", () => {
      cy.get("#signupPassword").type("PASSWORD1");
      cy.get("#signupPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    //Test4 - Border color red
    it("Password Border color red ", () => {
      cy.get("#signupPassword").focus();
      cy.get("#signupPassword").blur();
      cy.get("#signupPassword").should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
  context("Field Re-enter password", () => {
    //Test1 - Empty field - "Re-enter password required"
    it("RepeatPassword Empty field", () => {
      cy.get("#signupRepeatPassword").focus();
      cy.get("#signupRepeatPassword").blur();
      cy.get(".invalid-feedback").should(
        "have.text",
        "Re-enter password required",
      );
    });
    //Test2 - Wrong data - "Repeat password has to be from 8 to 15 characters long and contain at least one integer, one capital and one small letter"
    it("Repeat password is shorter than 8 characters", () => {
      cy.get("#signupRepeatPassword").type("Bb1");
      cy.get("#signupRepeatPassword").blur("");
      cy.get(".invalid-feedback").should(
        "have.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
    //Test3 - Border color red
    it("Repeat password Border color red ", () => {
      cy.get("#signupRepeatPassword").focus();
      cy.get("#signupRepeatPassword").blur();
      cy.get("#signupRepeatPassword").should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
  //Test3 - Button Register
  context("Button Register", () => {
    it("Register button should be enabled when form is valid", () => {
      const uniqueEmail = `test${Date.now()}@gmail.com`;

      cy.get("#signupName").type("Serg");
      cy.get("#signupLastName").type("Fedorenko");
      cy.get("#signupEmail").type(uniqueEmail);
      cy.get("#signupPassword").type("Password1");
      cy.get("#signupRepeatPassword").type("Password1");

      cy.contains(".modal-content button", "Register").should(
        "not.be.disabled",
      );
    });
    it("Register button should be disabled when form is Empty", () => {
      cy.contains(".modal-content button", "Register").should("be.disabled");
    });
  });
});
