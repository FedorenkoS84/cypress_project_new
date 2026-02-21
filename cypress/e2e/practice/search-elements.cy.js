/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  });
});
describe("search elements", () => {
  it("cy.get", () => {
    cy.get("h1");
    cy.get(".header_logo");
  });

  it("cy.contains", () => {
    cy.contains("Do more!");
    cy.contains("button", "About");
    cy.contains(".header_signin", "Sign In");
  });
  it("cy.find", () => {
    cy.get("header").find("button");
    cy.get(".hero-video").find("iframe.hero-video_frame");
  });
  it("children", () => {
    cy.get(".header_nav > button");
    cy.get(".header_nav>a");
  });
  it("parent ", () => {
    cy.get('[appscrollto="aboutSection"]').parent();
    //Найближчий батьківський елемент
    cy.get('[appscrollto="aboutSection"]').parents("div.container");
  });
  //Модалка

  it("within", () => {
    cy.get(".header_signin").click(); //відкрити модалку
    cy.get(".modal-content").within(() => {
      cy.get("h4");
      cy.get("input");
      cy.get("button");
    });
  });
  context("multiple element", () => {
    it("first, last, eq", () => {
      cy.get(".contacts_socials"); //Основний дів всіх елементів
      cy.get(".socials_icon").first(); //Перший елемент
      cy.get(".socials_icon").last(); //Останній елемент
      cy.get(".socials_icon").eq(2); //За індексом елемент
    });
    it("filter", () => {
      cy.get(".socials_icon").filter(".icon-instagram"); //Можна шукати і без фільтра, просто за классом в цьому випадку
      cy.get(".socials_icon").not(".icon-instagram"); //шукати всі icon без ".icon-instagram"
    });
    context("Advanced", () => {
      it("invoke", () => {
        cy.get("h1").invoke("hide");
        cy.wait(3000);
        cy.get("h1").invoke("show");
        cy.get("h1")
          .invoke("attr", "class")
          .should("contain", "descriptor_title");
      });
      it("then", () => {
        cy.get("h1")
          .invoke("text")
          .then((text) => {
            cy.log("TEST TEST");
            cy.log(text);
          });
      });
      it("wrap", () => {
        const message = "new message";
        cy.wrap(message).should("contain", "message"); //Для Javascript прописуватиv "cy.wrap(.....)"
      });
      it("its", () => {
        const array = [10, 20, 30];
        const person = {
          name: "Jue",
          age: 25,
        };
        cy.wrap(array).its("length").should("equal", 3);
        cy.wrap(person).its("name").should("equal", "Jue");
      });
      it("each", () => {
        cy.get(".btn-primary").click();
        cy.get("input").each((input) => {
          cy.wrap(input).type("HelloInput");
        });
      });
      it.only("alias", () => {
        //Wrong usage
        //const button = cy.get('.header_signin');
        //button.click();

        //Wright usage
        cy.get(".header_signin").as("signingButton");
        cy.get("@signingButton").click();
      });
    });
  });
});
