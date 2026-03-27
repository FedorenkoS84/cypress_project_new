/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
import GaragePage from "../../pom/pages/GaragePage";

describe("Garage Page - Add Car Modal", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openRegistrationForm();

    const uniqueEmail = `test${Date.now()}@gmail.com`;
    SignUpForm.register({
      name: "Serhii",
      lastName: "Fedorenko",
      email: uniqueEmail,
      password: "1234Test",
      repeatPassword: "1234Test",
    });

    cy.url().should("include", "/panel/garage");
    GaragePage.openAddCarModal();
    GaragePage.modalContent.should("be.visible");
  });

  it("Display correct Modal Title and Close button", () => {
    GaragePage.modalTitle.should("be.visible").and("have.text", "Add a car");
    GaragePage.modalCloseButton.should("be.visible");
  });

  it("All required Brands in the dropdown", () => {
    GaragePage.brandSelect.within(() => {
      ["Audi", "BMW", "Ford", "Porsche", "Fiat"].forEach((brand) => {
        cy.get("option").should("contain", brand);
      });
    });
  });

  it("All required Models in the dropdown", () => {
    GaragePage.modelSelect.within(() => {
      ["TT", "R8", "Q7", "A6", "A8"].forEach((model) => {
        cy.get("option").should("contain", model);
      });
    });
  });

  it("Show error when mileage is empty", () => {
    GaragePage.mileageInput.focus().blur();
    GaragePage.mileageError
      .should("be.visible")
      .and("have.text", "Mileage cost required");
  });

  it("Show red error message for empty mileage", () => {
    GaragePage.mileageInput.focus().blur();
    GaragePage.mileageError.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  it("'Cancel' button is clicked", () => {
    GaragePage.cancelBtn.click();
    GaragePage.modalContent.should("not.exist");
  });

  it("Enable 'Add' button, add the car and verify it appears in the list", () => {
    const car = { brand: "BMW", model: "X5", mileage: "50000" };
    GaragePage.fillCarData(car.brand, car.model, car.mileage);
    GaragePage.addBtn.should("be.enabled").click();
    GaragePage.modalContent.should("not.exist");

    GaragePage.carItems.first().within(() => {
      cy.get(".car_name").should("have.text", `${car.brand} ${car.model}`);
      cy.get("input[name='miles']").should("have.value", car.mileage);
    });
  });
});

// /// <reference types="cypress" />

// import SignInForm from "../../pom/forms/SignInForm";
// import HomePage from "../../pom/pages/HomePage";
// import SignUpForm from "../../pom/forms/SignUpForm";
// import users from "../../fixtures/users.json";
// import GaragePage from "../../pom/pages/GaragePage";
// // beforeEach(() => {
// //   HomePage.visit();
// //   HomePage.openRegistrationForm();
// // });
// describe("Garage Page - Add Car Modal", () => {
//   beforeEach(() => {
//     // 1. Початкові дії
//     HomePage.visit();
//     HomePage.openRegistrationForm();

//     // 2. Реєстрація (кожного разу новий юзер)
//     const uniqueEmail = `test${Date.now()}@gmail.com`;
//     SignUpForm.register({
//       name: "Serhii",
//       lastName: "Fedorenko",
//       email: uniqueEmail,
//       password: "1234Test",
//       repeatPassword: "1234Test",
//     });

//     // 3. Перевірка, що ми в гаражі і відкриття модалки
//     cy.url().should("include", "/panel/garage");
//     cy.contains("button", "Add car").click();

//     // Чекаємо, поки модалка з'явиться, щоб наступні it не "спішили"
//     cy.get(".modal-content").should("be.visible");
//   });

//   it("Display correct Modal Title and Close button", () => {
//     cy.get(".modal-title").should("be.visible").and("have.text", "Add a car");

//     cy.get("button.close").should("be.visible");
//   });

//   it("All required Brands in the dropdown", () => {
//     cy.get("select#addCarBrand").within(() => {
//       cy.get("option").should("contain", "Audi");
//       cy.get("option").should("contain", "BMW");
//       cy.get("option").should("contain", "Ford");
//       cy.get("option").should("contain", "Porsche");
//       cy.get("option").should("contain", "Fiat");
//     });
//   });
//   it("All required Models in the dropdown", () => {
//     cy.get("select#addCarModel").within(() => {
//       cy.get("option").should("contain", "TT");
//       cy.get("option").should("contain", "R8");
//       cy.get("option").should("contain", "Q7");
//       cy.get("option").should("contain", "A6");
//       cy.get("option").should("contain", "A8");
//     });
//   });

//   it("Show error when mileage is empty", () => {
//     // Використовуємо ID з твого HTML
//     cy.get("input#addCarMileage").focus().blur();

//     cy.get(".invalid-feedback")
//       .should("be.visible")
//       .and("have.text", "Mileage cost required");
//   });
//   // 1. Перевірка кольору помилки Mileage
//   it("Show red error message for empty mileage", () => {
//     cy.get("input#addCarMileage").focus().blur();

//     cy.get(".invalid-feedback")
//       .should("be.visible")
//       .and("have.text", "Mileage cost required")
//       // Перевірка кольору (червоний rgb(220, 53, 69))
//       .and("have.css", "border-color", "rgb(220, 53, 69)");
//     // Примітка: колір тексту — 'color', колір рамки — 'border-color'
//   });
//   // 3. Перевірка кнопки Cancel
//   it("'Cancel' button is clicked", () => {
//     cy.get(".modal-footer").contains("Cancel").click();

//     // Модалка має зникнути
//     cy.get(".modal-content").should("not.exist");
//   });
//   // 2. Перевірка активації кнопки Add після заповнення форми
//   it("Enable 'Add' button, add the car and verify it appears in the list", () => {
//     const brand = "BMW";
//     const model = "X5";
//     const mileage = "50000";

//     // Заповнюємо дані
//     cy.get("select#addCarBrand").select(brand);
//     cy.get("select#addCarModel").select(model);
//     cy.get("input#addCarMileage").type(mileage);

//     // Кнопка Add активна -> Клік
//     cy.get(".modal-footer").contains("Add").should("be.enabled").click();

//     // Перевірка, що модалка закрилась
//     cy.get(".modal-content").should("not.exist");

//     // ПЕРЕВІРКА РЕЗУЛЬТАТУ на сторінці (по твоєму HTML)
//     cy.get(".car-list .car-item")
//       .first()
//       .within(() => {
//         // 1. Назва бренду та моделі
//         cy.get(".car_name").should("have.text", `${brand} ${model}`);

//         // 2. Пробіг у полі оновлення (Update mileage)
//         cy.get("input[name='miles']").should("have.value", mileage);

//         // 3. Наявність кнопок керування
//         cy.get(".car_edit").should("be.visible");
//         cy.get(".car_add-expense").should("be.visible");
//       });
//   });
// });
