class GaragePage {
  // --- Твій початковий код (Збережено) ---
  get sighInButton() {
    return cy.get(".header_signin").should("be.visible");
  }
  openSignInForm() {
    this.sighInButton.click();
  }
  get pageTitle() {
    return cy.contains("h1", "Garage");
  }
  visit() {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  }

  // --- Нові елементи для роботи з модалкою Add Car ---
  get addCarButton() {
    return cy.contains("button", "Add car");
  }
  get modalContent() {
    return cy.get(".modal-content");
  }
  get modalTitle() {
    return cy.get(".modal-title");
  }
  get modalCloseButton() {
    return cy.get("button.close");
  }

  get brandSelect() {
    return cy.get("select#addCarBrand");
  }
  get modelSelect() {
    return cy.get("select#addCarModel");
  }
  get mileageInput() {
    return cy.get("input#addCarMileage");
  }
  get mileageError() {
    return cy.get(".invalid-feedback");
  }

  get cancelBtn() {
    return cy.get(".modal-footer").contains("Cancel");
  }
  get addBtn() {
    return cy.get(".modal-footer").contains("Add");
  }
  get carItems() {
    return cy.get(".car-list .car-item");
  }

  // Методи для тестів
  openAddCarModal() {
    this.addCarButton.click();
  }

  fillCarData(brand, model, mileage) {
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.type(mileage);
  }
}

export default new GaragePage();
// class GaragePage {
//   get sighInButton() {
//     return cy.get(".header_signin").should("be.visible");
//   }
//   openSignInForm() {
//     this.sighInButton.click();
//   }
//   get pageTitle() {
//     return cy.contains("h1", "Garage");
//   }
//   visit() {
//     cy.visit("/", {
//       auth: {
//         username: Cypress.env("username"),
//         password: Cypress.env("password"),
//       },
//     });
//   }
// }

// export default new GaragePage();
