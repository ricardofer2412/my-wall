describe("Login Fail", () => {
  it("Loads localhost", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit("http://localhost:3000");
  });
  it("Clicks login button", () => {
    const loginButton = cy.get("#login_button");
    loginButton.click();
  });
  it("Types Credentials", () => {
    const emailInput = cy.get("#email_input");
    emailInput.type("adrianfran2515@outlook.com");
    const passwordInput = cy.get("#password_input");
    passwordInput.type("Wrong Password");
  });
  it("Clicks login", () => {
    const loginButton = cy.get("#auth_submit_button");
    loginButton.click();
  });

});