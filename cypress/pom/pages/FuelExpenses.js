class FuelExpenses {
  // --- Твій початковий код ---
  get sighInButton() {
    return cy.get(".header_signin").should("be.visible");
  }
  openSignInForm() {
    this.sighInButton.click();
  }
  visit() {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  }

  // --- Селектори сторінки та навігації ---
  get fuelExpensesSidebarBtn() {
    // Використовуємо уточнений селектор, щоб уникнути помилки multiple elements
    return cy.get('.sidebar-wrapper a[href="/panel/expenses"]');
  }

  get pageTitle() {
    return cy.get("h1").should("have.text", "Fuel expenses");
  }

  get addExpenseButton() {
    // В твоїх тестах ми шукали через .btn-primary в хедері
    return cy.get(".panel-page_heading .btn-primary");
  }

  // --- Елементи модального вікна ---
  get modalContent() {
    return cy.get(".modal-content");
  }
  get modalTitle() {
    return cy.get(".modal-title");
  }
  get closeButton() {
    return cy.get("button.close");
  }

  // Поля та лейбли
  get vehicleSelect() {
    return cy.get("select#addExpenseCar");
  }
  get vehicleLabel() {
    return cy.get('label[for="addExpenseCar"]');
  }

  get reportDateInput() {
    return cy.get("input#addExpenseDate");
  }
  get reportDateLabel() {
    return cy.get('label[for="addExpenseDate"]');
  }
  get datePickerToggle() {
    return cy.get(".date-picker-toggle");
  }

  get mileageInput() {
    return cy.get("input#addExpenseMileage");
  }
  get mileageLabel() {
    return cy.get('label[for="addExpenseMileage"]');
  }

  get litersInput() {
    return cy.get("input#addExpenseLiters");
  }
  get litersLabel() {
    return cy.get('label[for="addExpenseLiters"]');
  }

  get totalCostInput() {
    return cy.get("input#addExpenseTotalCost");
  }
  get totalCostLabel() {
    return cy.get('label[for="addExpenseTotalCost"]');
  }

  // Юніти (km, L, $)
  get inputGroupText() {
    return cy.get(".input-group-text");
  }

  // Помилки та повідомлення
  get invalidFeedback() {
    return cy.get(".invalid-feedback");
  }
  get alertDanger() {
    return cy.get("p.alert.alert-danger");
  }

  // Кнопки керування в модалці
  get cancelBtn() {
    return cy.get(".modal-footer .btn-secondary");
  }
  get addBtn() {
    return cy.get(".modal-footer .btn-primary");
  }

  // Таблиця результатів
  get tableRows() {
    return cy.get("tbody tr");
  }

  // --- Методи дій ---
  goToFuelExpenses() {
    this.fuelExpensesSidebarBtn.click();
  }

  openAddExpenseModal() {
    this.addExpenseButton.contains("Add an expense").click();
  }
}

export default new FuelExpenses();
