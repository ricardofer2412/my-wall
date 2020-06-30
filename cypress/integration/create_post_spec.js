describe("Login Success", () => {
  it("Loads localhost", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit("http://localhost:3000/login");
  });
  it("Clicks login button", () => {
    const loginButton = cy.get("#login_button");
    loginButton.click();
  });
  it("Types Credentials", () => {
    const emailInput = cy.get("#email_input");
    emailInput.type("adrianfran2515@outlook.com");
    const passwordInput = cy.get("#password_input");
    passwordInput.type("adriancasanova");
  });
  it("Clicks login", () => {
    const loginButton = cy.get("#auth_submit_button");
    loginButton.click();
  });
  it("Clicks add post", () => {
    const createPostButton = cy.get("#create_post_button");
    createPostButton.click();
  });
  it("Create post", () => {
    const input = cy.get("#post_content_input");
    input.type("Hello World");
    const createPostButton = cy.get("#create_post_dialog_button");
    createPostButton.click();
  });
  it("Login Successfull", () => {
    const loginButton = cy.get("#log_out_button");
  });
});