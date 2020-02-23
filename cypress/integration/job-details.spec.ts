describe("job details", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200")
      .getDashboardItem()
      .eq(0)
      .click()
      .wait(1000);
  });

  it("should have title Job Details", () => {
    cy.get('[data-cy="page-header"]').should("be", "Job Details");
  });

  it("should have 3 sub-headers for info, attachments and assignee", () => {
    cy.get("h3")
      .eq(0)
      .contains("Info")
      .get("h3")
      .eq(1)
      .contains("Attachments")
      .get("h3")
      .eq(2)
      .contains("Assignee");
  });

  it("should navigate back to dashboard on clicking back", () => {
    cy.get('[data-cy="back"]')
      .click()
      .wait(1000)
      .url()
      .should("be", "http://localhost:4200/dashboard");
  });
});
