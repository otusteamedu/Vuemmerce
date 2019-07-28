const baseUrl = 'http://localhost:8080/'
describe("Home page of the shop", () => {
  before(function () {
    cy.visit(baseUrl);
  });

    it("Shows hero block", () => {
      
      cy.get("div.hero-body h1.title")
        .contains("Free ecommerce template for Vue.js projects");
    });
    
    // it("Shows logo", ()=> {
    //   cy.get(".navbar-brand h1.title")
    //     .should('have.css','background', 'url(/img/vuemmerce-logo.6809a10f.png) no-repeat')
    // })
    it("Shows text search", ()=> {
      cy.get(".navbar-menu p.control input")
        .should('have.placeholder','Search...')
    })
    it("Should have footer", ()=> {
        cy.get('.footer').should('exist')
    })

  });