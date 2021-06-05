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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'xgschwi', password: 'Cats' })
    })

    it('A blog can be created', function() {
      const blog = {
        title: 'A new test blog',
        author: 'Xavier',
        url: 'someTestBlog.com',
        likes: 0,
        user: {
          name: 'Xavier', username: 'xgschwi', password: 'Cats'
        }
      }

      cy.createBlog(blog)

      cy.contains('A new test blog')
    })

    describe('When a blog is created', function() {
      beforeEach(function() {
        const blog = {
          title: 'A new test blog',
          author: 'Xavier',
          url: 'someTestBlog.com',
          likes: 0,
          user: {
            name: 'Xavier', username: 'xgschwi', password: 'Cats'
          }
        }

        cy.createBlog(blog)
      })

      it('A User can like a blog', function() {
        cy.contains('A new test blog')
          .contains('View')
          .click()

        cy.contains('A new test blog').parent()
          .should('contain', 'Likes 0')

        cy.contains('A new test blog').parent().find('.likeBtn').click()

        cy.contains('A new test blog').parent()
          .should('contain', 'Likes 1')
      })

      it('A user who created a blog can delete it',  function() {
        cy.contains('A new test blog')
          .contains('View')
          .click()

        cy.contains('A new test blog').parent().find('.deleteBtn').click()

        cy.should('not.exist', 'A new test blog')
      })

      it('A user who did not create a blog cannot delete it',  function() {
        const user2 = {
          name: 'Ron', username: 'ronald', password: 'Dogs'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.login({ username: 'ronald', password: 'Dogs' })

        cy.contains('A new test blog')
          .contains('View')
          .click()

        cy.get('A new test blog')
          .should('not.exist', '.deleteBtn')
      })
    })
  })
})