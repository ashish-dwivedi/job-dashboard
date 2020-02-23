/// <reference types="Cypress" />

describe("job dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("should display list of jobs", () => {
    cy.getDashboardItem()
      .its("length")
      .should("be.gt", 1);
  });

  it("should open a dialog on clicking Add Job button", () => {
    cy.get('[data-cy="add"]')
      .click()
      .wait(2000)
      .get("app-add-job")
      .its("length")
      .should("be.eq", 1);
  });

  it("should navigate to details page on dashboard item click", () => {
    cy.getDashboardItem()
      .eq(0)
      .click()
      .wait(2000)
      .url()
      .should("include", "http://localhost:4200/job/details/");
  });
});
