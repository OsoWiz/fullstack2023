// cypress tests for blog app
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "BlogTester",
      username: "blogtester",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });
  // 5.17
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
  // 5.18
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('input[name="username"]').type("blogtester");
      cy.get('input[name="password"]').type("secret");
      cy.get('button[name="login"]').click();

      cy.contains("blogtester logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get('input[name="username"]').type("blogtester");
      cy.get('input[name="password"]').type("wrong");
      cy.get('button[name="login"]').click();

      cy.contains("Wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.get('input[name="username"]').type("blogtester");
      cy.get('input[name="password"]').type("secret");
      cy.get('button[name="login"]').click();
    });
    // 5.19
    it("A blog can be created", function () {
      //
      cy.contains("create new blog").click();

      cy.get('input[name="Title"]').type("Test Blog");
      cy.get('input[name="Author"]').type("Test Author");
      cy.get('input[name="Url"]').type("http://testurl.com");
      cy.get('button[name="Createblog"]').click();

      cy.contains("New blog Test Blog added");
    });

    describe("When blog exists", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();

        cy.get('input[name="Title"]').type("Test Blog");
        cy.get('input[name="Author"]').type("Test Author");
        cy.get('input[name="Url"]').type("http://testurl.com");
        cy.get('button[name="Createblog"]').click();
      });
      // 5.20
      it("An added blog can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });
      // 5.21
      it("A blog can be deleted", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.contains("Test Blog").should("not.exist");
      });
      // 5.22
      it("Only user who added the blog is showed the delete button", function () {
        cy.contains("view").click();
        cy.contains("remove"); // remove is shown for the user who added the blog
        cy.contains("logout").click();
        const testUser2 = {
          name: "BlogTester2",
          username: "blogtester2",
          password: "secret2",
        };

        cy.request("POST", "http://localhost:3003/api/users/", testUser2);

        cy.get('input[name="username"]').type("blogtester2");
        cy.get('input[name="password"]').type("secret2");
        cy.get('button[name="login"]').click();

        cy.contains("view").click();
        cy.contains("remove").should("not.exist"); // remove is not shown for others
      });
    });
  });
});
