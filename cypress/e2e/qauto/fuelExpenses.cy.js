/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
import GaragePage from "../../pom/pages/GaragePage";
import FuelExpenses from "../../pom/pages/FuelExpenses"; // Імпорт нового POM

describe("Fuel Expenses Modal Verification", () => {
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
    GaragePage.fillCarData("BMW", "X5", "50000");
    GaragePage.addBtn.click();
    cy.get(".modal-content").should("not.exist");

    FuelExpenses.goToFuelExpenses();
    FuelExpenses.openAddExpenseModal();
    FuelExpenses.modalContent.should("be.visible");
  });

  it("Verify Modal Header and Close button", () => {
    FuelExpenses.modalTitle.should("have.text", "Add an expense");
    FuelExpenses.closeButton.should("be.visible");
  });

  it("Verify Vehicle select field", () => {
    FuelExpenses.vehicleLabel.should("have.text", "Vehicle");
    FuelExpenses.vehicleSelect.should("be.visible").and("contain", "BMW X5");
  });

  it("Verify Report Date field and icon", () => {
    FuelExpenses.reportDateLabel.should("have.text", "Report date");
    FuelExpenses.reportDateInput.should("be.visible");
    FuelExpenses.datePickerToggle.should("be.visible");
  });

  it("Verify Mileage field and units", () => {
    FuelExpenses.mileageLabel.should("have.text", "Mileage");
    FuelExpenses.mileageInput.should("be.visible");
    FuelExpenses.inputGroupText.contains("km").should("be.visible");
  });

  it("Verify Number of Liters field and units", () => {
    FuelExpenses.litersLabel.should("have.text", "Number of liters");
    FuelExpenses.litersInput.should("be.visible");
    FuelExpenses.inputGroupText.contains("L").should("be.visible");
  });

  it("Verify Total Cost field and currency", () => {
    FuelExpenses.totalCostLabel.should("have.text", "Total cost");
    FuelExpenses.totalCostInput.should("be.visible");
    FuelExpenses.inputGroupText.contains("$").should("be.visible");
  });

  it("Verify Footer buttons state", () => {
    FuelExpenses.cancelBtn.should("have.text", "Cancel").and("be.enabled");
    FuelExpenses.addBtn.should("have.text", "Add").and("be.disabled");
  });

  it("Should show error when mileage is less than initial (50000)", () => {
    FuelExpenses.mileageInput.clear().type("49999");
    FuelExpenses.litersInput.type("10");
    FuelExpenses.totalCostInput.type("50");
    FuelExpenses.addBtn.click();

    FuelExpenses.alertDanger
      .should("be.visible")
      .and(
        "have.text",
        "First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 50000",
      )
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  it("Should close modal when 'Cancel' button is clicked", () => {
    FuelExpenses.cancelBtn.click();
    FuelExpenses.modalContent.should("not.exist");
  });

  it("Should successfully add expense with valid mileage (50001) and verify table", () => {
    FuelExpenses.mileageInput.clear().type("50001");
    FuelExpenses.litersInput.type("20");
    FuelExpenses.totalCostInput.type("100");
    FuelExpenses.addBtn.should("be.enabled").click();

    FuelExpenses.modalContent.should("not.exist");
    FuelExpenses.tableRows.first().within(() => {
      cy.get("td").eq(0).should("contain", "07.03.2026");
      cy.get("td").eq(1).should("contain", "50001");
      cy.get("td").eq(2).should("contain", "20L");
      cy.get("td").eq(3).should("contain", "100 USD");
    });
  });

  it("Should show 'Mileage required' error when field is touched and left empty", () => {
    FuelExpenses.mileageInput.clear().blur();
    FuelExpenses.invalidFeedback
      .should("be.visible")
      .and("have.text", "Mileage required")
      .and("have.css", "color", "rgb(220, 53, 69)");
  });

  it("Should show 'Liters required' error when field is touched and left empty", () => {
    FuelExpenses.litersInput.focus().blur();
    FuelExpenses.invalidFeedback
      .should("be.visible")
      .and("have.text", "Liters required")
      .and("have.css", "color", "rgb(220, 53, 69)");
  });

  it("Should show 'Total cost required' error when field is touched and left empty", () => {
    FuelExpenses.totalCostInput.focus().blur();
    FuelExpenses.invalidFeedback
      .should("be.visible")
      .and("have.text", "Total cost required")
      .and("have.css", "color", "rgb(220, 53, 69)");
  });
});

// /// <reference types="cypress" />
// import HomePage from "../../pom/pages/HomePage";
// import SignUpForm from "../../pom/forms/SignUpForm";
// import GaragePage from "../../pom/pages/GaragePage";

// describe("Fuel Expenses Modal Verification", () => {
//   beforeEach(() => {
//     HomePage.visit();
//     HomePage.openRegistrationForm();

//     const uniqueEmail = `test${Date.now()}@gmail.com`;
//     SignUpForm.register({
//       name: "Serhii",
//       lastName: "Fedorenko",
//       email: uniqueEmail,
//       password: "1234Test",
//       repeatPassword: "1234Test",
//     });

//     cy.url().should("include", "/panel/garage");

//     // Додаємо авто з початковим пробігом 50000
//     GaragePage.openAddCarModal();
//     GaragePage.fillCarData("BMW", "X5", "50000");
//     GaragePage.addBtn.click();
//     cy.get(".modal-content").should("not.exist");

//     // Перехід на сторінку витрат
//     cy.get('.sidebar-wrapper a[href="/panel/expenses"]').click();

//     // Відкриваємо модалку перед кожним тестом
//     cy.get(".panel-page_heading .btn-primary")
//       .contains("Add an expense")
//       .click();
//     cy.get(".modal-content").should("be.visible");
//   });

//   it("Verify Modal Header and Close button", () => {
//     cy.get(".modal-title").should("have.text", "Add an expense");
//     cy.get("button.close").should("be.visible");
//   });

//   it("Verify Vehicle select field", () => {
//     cy.get('label[for="addExpenseCar"]').should("have.text", "Vehicle");
//     cy.get("select#addExpenseCar")
//       .should("be.visible")
//       .and("contain", "BMW X5");
//   });

//   it("Verify Report Date field and icon", () => {
//     cy.get('label[for="addExpenseDate"]').should("have.text", "Report date");
//     cy.get("input#addExpenseDate").should("be.visible");
//     cy.get(".date-picker-toggle").should("be.visible");
//   });

//   it("Verify Mileage field and units", () => {
//     cy.get('label[for="addExpenseMileage"]').should("have.text", "Mileage");
//     cy.get("input#addExpenseMileage").should("be.visible");
//     cy.get(".input-group-text").contains("km").should("be.visible");
//   });

//   it("Verify Number of Liters field and units", () => {
//     cy.get('label[for="addExpenseLiters"]').should(
//       "have.text",
//       "Number of liters",
//     );
//     cy.get("input#addExpenseLiters").should("be.visible");
//     cy.get(".input-group-text").contains("L").should("be.visible");
//   });

//   it("Verify Total Cost field and currency", () => {
//     cy.get('label[for="addExpenseTotalCost"]').should(
//       "have.text",
//       "Total cost",
//     );
//     cy.get("input#addExpenseTotalCost").should("be.visible");
//     cy.get(".input-group-text").contains("$").should("be.visible");
//   });

//   it("Verify Footer buttons state", () => {
//     cy.get(".modal-footer .btn-secondary")
//       .should("have.text", "Cancel")
//       .and("be.enabled");
//     cy.get(".modal-footer .btn-primary")
//       .should("have.text", "Add")
//       .and("be.disabled");
//   });

//   it("Should show error when mileage is less than initial (50000)", () => {
//     cy.get("input#addExpenseMileage").clear().type("49999");
//     cy.get("input#addExpenseLiters").type("10");
//     cy.get("input#addExpenseTotalCost").type("50");
//     cy.get(".modal-footer").contains("Add").click();
//     cy.get("p.alert.alert-danger")
//       .should("be.visible")
//       .and(
//         "have.text",
//         "First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 50000",
//       )
//       .and("have.css", "background-color", "rgb(248, 215, 218)");
//   });

//   it("Should close modal when 'Cancel' button is clicked", () => {
//     cy.get(".modal-footer").contains("Cancel").click();
//     cy.get(".modal-content").should("not.exist");
//   });

//   it("Should successfully add expense with valid mileage (50001) and verify table", () => {
//     // Заповнюємо валідні дані
//     cy.get("input#addExpenseMileage").clear().type("50001");
//     cy.get("input#addExpenseLiters").type("20");
//     cy.get("input#addExpenseTotalCost").type("100");
//     cy.get(".modal-footer").contains("Add").should("be.enabled").click();

//     // Перевірка результату в таблиці (згідно з твоїм HTML)
//     cy.get(".modal-content").should("not.exist");
//     cy.get("tbody tr")
//       .first()
//       .within(() => {
//         cy.get("td").eq(0).should("contain", "07.03.2026"); // Дата
//         cy.get("td").eq(1).should("contain", "50001"); // Пробіг
//         cy.get("td").eq(2).should("contain", "20L"); // Літри
//         cy.get("td").eq(3).should("contain", "100 USD"); // Ціна
//       });
//   });
//   it("Should show 'Mileage required' error when field is touched and left empty", () => {
//     cy.get("input#addExpenseMileage").clear().blur();

//     cy.get(".invalid-feedback")
//       .should("be.visible")
//       .and("have.text", "Mileage required")
//       .and("have.css", "color", "rgb(220, 53, 69)");
//   });

//   it("Should show 'Liters required' error when field is touched and left empty", () => {
//     cy.get("input#addExpenseLiters").focus().blur();

//     cy.get(".invalid-feedback")
//       .should("be.visible")
//       .and("have.text", "Liters required")
//       .and("have.css", "color", "rgb(220, 53, 69)");
//   });

//   it("Should show 'Total cost required' error when field is touched and left empty", () => {
//     cy.get("input#addExpenseTotalCost").focus().blur();
//     cy.get(".invalid-feedback")
//       .should("be.visible")
//       .and("have.text", "Total cost required")
//       .and("have.css", "color", "rgb(220, 53, 69)");
//   });
// });
