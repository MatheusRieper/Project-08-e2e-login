describe('login test', () => {

  beforeEach(() => {

    cy.openPage()
    cy.url().should('include', '/')
  })

  //  ---------   Successfull Login   -------- 
  describe('Successfull login', () => {

    it('should login with success', () => {

      cy.login(
        Cypress.env('ADMIN_USER'),
        Cypress.env('ADMIN_PASS')
      )
      cy.url().should('include', '/index')

      cy.contains('h6', 'Dashboard')
        .should('be.visible')
    })
  })

  //  ---------   invalid login   --------- 
  const INVALID_USER = 'test'
  const INVALID_PASS = 'pass123'

  describe('Invalid login', () => {

    it('should not login with unregistered e-mail', () => {

      cy.login(
        INVALID_USER,
        Cypress.env('ADMIN_PASS')
      )

      cy.get('p[class="oxd-text oxd-text--p oxd-alert-content-text"]')
        .should('be.visible')
        .and('contain.text', 'Invalid credentials')

      cy.url().should('include', '/login')

      cy.get('button[type="submit"]')
        .should('be.visible')
    })

    it('should not login with unregistered password', () => {

      cy.login(
        Cypress.env('ADMIN_USER'),
        INVALID_PASS
        )

      cy.get('p[class="oxd-text oxd-text--p oxd-alert-content-text"]')
        .should('be.visible')
        .and('contain.text', 'Invalid credentials')

      cy.url().should('include', '/login')

      cy.get('button[type="submit"]')
        .should('be.visible')
    })
  })

})