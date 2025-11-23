import LoginPage from '../page-objects/LoginPage'

describe('Login Page', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it('should successfully login with valid credentials', () => {
        // Load test data from fixture
        cy.fixture('users').then((users) => {
            // Fill in login form
            loginPage.login(users.validUser.email, users.validUser.password)

            // Verify redirect to products page
            loginPage.assertRedirectToProducts()

            // Verify user is logged in
            cy.get('[data-testid="user-name"]').should('be.visible')
        })
    })

    it('should show error message with invalid credentials', () => {
        // Load test data from fixture
        cy.fixture('users').then((users) => {
            // Attempt login with invalid credentials
            loginPage.login(users.invalidUser.email, users.invalidUser.password)

            // Verify error message is displayed
            loginPage.assertErrorMessage('Invalid email or password')

            // Verify still on login page
            cy.url().should('not.include', '/products')
        })
    })

    it('should validate required fields', () => {
        // Try to submit without filling fields
        loginPage.submit()

        // Verify error message
        loginPage.assertErrorMessage('Email and password are required')
    })

    it('should validate email format', () => {
        // Fill invalid email format
        loginPage.fillEmail('notanemail')
        loginPage.fillPassword('somepassword')
        loginPage.submit()

        // Verify error message
        loginPage.assertErrorMessage('valid email address')
    })
})
