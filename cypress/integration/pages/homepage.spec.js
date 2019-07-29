const baseUrl = 'http://localhost:8080/'
describe("Home page of the shop", () => {
  before(function () {
    cy.visit(baseUrl);
  });

    it("Shows hero block", () => {
      
      cy.get("div.hero-body h1.title")
        .contains("Free ecommerce template for Vue.js projects");
    });
    
    it("Shows text search", ()=> {
      cy.get(".navbar-menu p.control input")
        .should('exist')
    })
    it("Should have footer", ()=> {
        cy.get('.footer').should('exist')
    })

  });