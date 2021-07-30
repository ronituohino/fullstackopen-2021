describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/users',
            body: {
                username: 'A test account',
                password: 'test123',
                name: 'tester!',
            }
        })

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#usernameInput').type('A test account')
            cy.get('#passwordInput').type('test123')
            cy.get('#loginButton').click()

            cy.contains('A test account logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#usernameInput').type('A non-existing account')
            cy.get('#passwordInput').type('something123')
            cy.get('#loginButton').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({username: 'A test account', password: 'test123'})
        })

        it('A blog can be created', function () {
            cy.get('#showCreateNewBlogButton').click()

            cy.get('#title').type('A test blog')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('https://www.cypress.io/')

            cy.get('#createNewBlogButton').click()

            cy.contains('a new blog A test blog by Cypress added')
            cy.contains('A test blog | Cypress')
        })

        it('A blog can be liked', function () {
            cy.createBlog({ 
                title: 'A test blog', 
                author: 'Cypress',
                url: 'https://www.cypress.io/'
            })

            cy.get('.blog').get('#blogViewButton').click()
            cy.get('.blog').get('#blogLikeButton').click()

            cy.contains('likes 1')
        })

        it('A blog can be removed', function () {
            cy.createBlog({ 
                title: 'A test blog', 
                author: 'Cypress',
                url: 'https://www.cypress.io/'
            })

            cy.get('.blog').get('#blogViewButton').click()
            cy.get('.blog').get('#blogRemoveButton').click()

            cy.get('.blog').should('not.exist')
        })

        it('Blogs are ordered by likes', function () {
            cy.createBlog({ 
                title: 'A test blog', 
                author: 'Cypress',
                url: 'https://www.cypress.io/'
            })

            cy.createBlog({ 
                title: 'A second test blog', 
                author: 'Cypress',
                url: 'https://www.cypress.io/'
            })

            cy.get('.blog').then(res => {
                cy.wrap(res[1]).as('secondBlog')

                cy.intercept('GET', '/api/blogs').as('blogUpdate')

                cy.get('@secondBlog').find('#blogViewButton').click()
                cy.get('@secondBlog').find('#blogLikeButton').click()
            })
            
            cy.wait('@blogUpdate')

            cy.get('.blog').then(res => {
                cy.wrap(res[0]).find('#blogTitle')
                    .contains('A second test blog')
            })
        })
    })
})