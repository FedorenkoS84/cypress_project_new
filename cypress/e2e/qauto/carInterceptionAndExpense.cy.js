/// <reference types="cypress" />

import GaragePage from "../../pom/pages/GaragePage";
import FuelExpenses from "../../pom/pages/FuelExpenses";
import users from "../../fixtures/users.json";

describe("Car interception and Expense API tests", () => {
  const carData = {
    brand: "Audi",
    model: "TT",
    mileage: "100",
  };

  // Тестові дані для expense — однакові в тестах 3 і 4
  const expenseData = {
    reportedAt: "2024-06-01",
    mileage: 200,       // більше за initialMileage машини (100)
    liters: 11,
    totalCost: 150,
  };

  // Змінна для зберігання id створеної машини між тестами
  let carId;

  // Авторизація через API один раз і кешування сесії через cy.session()
  beforeEach(() => {
    cy.session("userSession", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/signin",
        body: {
          email: users.correctUser.email,
          password: users.correctUser.password,
          remember: false,
        },
      });
    });
  });

  // Завдання 1: Створення машини через UI з перехопленням POST /api/cars
  it("Creates car via UI, intercepts POST /api/cars, validates status 201 and saves car id", () => {
    GaragePage.visit();

    // Встановлення перехоплення ПЕРЕД дією, яка викликає запит
    cy.intercept("POST", "/api/cars").as("createCar");

    GaragePage.openAddCarModal();
    GaragePage.fillCarData(carData.brand, carData.model, carData.mileage);
    GaragePage.addBtn.click();

    // Очікування перехопленого запиту, валідація статус-коду і збереження id
    cy.wait("@createCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      carId = interception.response.body.data.id;
      cy.log(`Car created. Intercepted car ID: ${carId}`);
    });
  });

  // Завдання 2: GET /api/cars — список містить створену машину (за UI-даними та id з interception)
  it("GET /api/cars returns list containing the created car by UI data and intercepted id", () => {
    cy.request("GET", "/api/cars").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");

      const cars = response.body.data;
      const createdCar = cars.find((car) => car.id === carId);

      expect(createdCar, `Car with id ${carId} must be in the list`).to.exist;
      expect(createdCar.brand).to.eq(carData.brand);
      expect(createdCar.model).to.eq(carData.model);
      expect(createdCar.initialMileage).to.eq(Number(carData.mileage));
    });
  });

  // Завдання 3: Створення expense через кастомну команду cy.createExpense()
  it("Creates expense via cy.createExpense() custom command, validates status code and response body", () => {
    cy.createExpense(carId, expenseData).then((response) => {
      // Валідація статус-коду
      expect(response.status).to.eq(200);

      // Валідація тіла відповіді
      expect(response.body.status).to.eq("ok");

      const expense = response.body.data;
      expect(expense.carId).to.eq(carId);
      expect(expense.reportedAt).to.include(expenseData.reportedAt);
      expect(expense.mileage).to.eq(expenseData.mileage);
      expect(expense.liters).to.eq(expenseData.liters);
      expect(expense.totalCost).to.eq(expenseData.totalCost);

      cy.log(`Expense created. ID: ${expense.id}`);
    });
  });

  // Завдання 4: UI тест — знайти машину та провалідувати створену сутність expense
  it("UI: navigates to Fuel Expenses and validates the expense created via API", () => {
    GaragePage.visit();

    // Перехід до сторінки витрат через сайдбар
    FuelExpenses.goToFuelExpenses();
    FuelExpenses.pageTitle.should("be.visible");

    // Валідація першого рядка таблиці (нещодавно створений через API expense)
    FuelExpenses.tableRows.first().within(() => {
      cy.get("td").eq(1).should("contain", expenseData.mileage);
      cy.get("td").eq(2).should("contain", `${expenseData.liters}L`);
      cy.get("td").eq(3).should("contain", `${expenseData.totalCost} USD`);
    });
  });
});
