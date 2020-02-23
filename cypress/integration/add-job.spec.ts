describe("Add job dialog", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200")
      .get('[data-cy="add"]')
      .eq(0)
      .click()
      .wait(1000);
  });

  it("should have the title Add job", () => {
    cy.get('[data-cy="dialog-header"]').should("be", "Add Job");
  });

  it("should not allow clicking on save button without any input", () => {
    cy.get('[data-cy="dialog-submit"]').should("be.disabled");
  });

  it("should close the dialog on clicking x icon", () => {
    cy.get('[data-cy="dialog-close"]')
      .click()
      .wait(3000)
      .get("app-add-job")
      .should("not.exist");
  });

  it("should save a new job and close the dialog afterwards", () => {
    cy.get('[data-cy="title-input"]')
      .type("New Title")
      .get('[data-cy="description-input"]')
      .type("New Unique Description123")
      .get('[data-cy="user-select"]')
      .click()
      .wait(1000)
      .get("mat-option")
      .eq(0)
      .click()
      .get('[data-cy="dialog-submit"]')
      .should("be.enabled")
      .click()
      .wait(1000)
      .get("app-add-dashboard")
      .should("not.exist")
      .get("table")
      .contains("New Unique Description123");
  });
});
