/// <reference types="cypress" />

describe("Car management", () => {
  const carData = {
    brand: "Audi",
    model: "TT",
    mileage: "100",
  };

  // Тестові дані для expense (використовуються в тестах 3 і 4)
  const expenseData = {
    reportedAt: "2024-06-01",
    mileage: 200,
    liters: 11,
    totalCost: 150,
  };

  // Змінна для збереження id створеної машини (отриманого з interception)
  let carId;

  const visitGarage = () => {
    cy.visit("/panel/garage", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  };

  beforeEach(() => {
    // Авторизація через API перед кожним тестом
    cy.request({
      method: "POST",
      url: "/api/auth/signin",
      body: {
        email: Cypress.env("userEmail"),
        password: Cypress.env("userPassword"),
        remember: false,
      },
    });
  });

  // Завдання 1: Створення машини через UI з перехопленням відповіді
  it("Creates car via UI, intercepts POST /api/cars, validates status code, saves car id", () => {
    visitGarage();

    // Встановлення перехоплення запиту до /api/cars
    cy.intercept("POST", "/api/cars").as("createCar");

    // Взаємодія з UI для створення машини
    cy.get(".btn-primary").contains("Add car").click();
    cy.get("#addCarBrand").select(carData.brand);
    cy.get("#addCarModel").select(carData.model);
    cy.get("#addCarMileage").clear().type(carData.mileage);
    cy.get(".modal-content .btn-primary").click();

    // Очікування перехопленого запиту, валідація статусу та збереження id
    cy.wait("@createCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      carId = interception.response.body.data.id;
      cy.log(`Saved car ID from interception: ${carId}`);
    });
  });

  // Завдання 2: GET /api/cars – валідація наявності створеної машини
  it("GET /api/cars – list contains the created car (by UI data and intercepted id)", () => {
    cy.request("GET", "/api/cars").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");

      const cars = response.body.data;
      const createdCar = cars.find((car) => car.id === carId);

      expect(createdCar, `Car with id ${carId} should be in the list`).to.exist;
      expect(createdCar.brand).to.eq(carData.brand);
      expect(createdCar.model).to.eq(carData.model);
      expect(createdCar.initialMileage).to.eq(Number(carData.mileage));
    });
  });

  // Завдання 3: Створення expense через API – кастомна команда cy.createExpense()
  it("Creates expense via cy.createExpense() command, validates status code and response body", () => {
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

      cy.log(`Created expense ID: ${expense.id}`);
    });
  });

  // Завдання 4: UI тест – знайти машину та провалідувати дані expense
  it("UI: finds the car and validates the expense created in test 3", () => {
    visitGarage();

    // Знайти машину за назвою та перейти до розділу витрат
    cy.get(".car_name")
      .contains(`${carData.brand} ${carData.model}`)
      .parents(".car_item")
      .within(() => {
        cy.get("a[routerlink='expenses']").click();
      });

    // Провалідувати першу витрату (нещодавно створену через API)
    cy.get(".expenses_item").first().within(() => {
      cy.contains(String(expenseData.liters)).should("exist");
      cy.contains(String(expenseData.totalCost)).should("exist");
    });

    // Перевірка відображеної дати
    cy.get(".expenses_item")
      .first()
      .should("contain", expenseData.reportedAt.split("-").reverse().join("."));
  });
});
