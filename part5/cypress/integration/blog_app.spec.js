// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Xavier', username: 'xgschwi', password: 'Cats'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.contains('username')

    cy.get('#password')
    cy.contains('password')


    cy.get('#submitLogin')
    cy.contains('Login')

    cy.contains('logged in').should('not.exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('xgschwi')
      cy.get('#password').type('Cats')
      cy.get('#submitLogin').click()

      cy.contains('Xavier logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('someUserName')
      cy.get('#password').type('Password')
      cy.get('#submitLogin').click()

      cy.contains('Xavier logged in').should('not.exist')

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})