class GaragePage {
  get pageTitle() {
    return cy.contains("h1", "Garage");
  }
}
export default new GaragePage();
