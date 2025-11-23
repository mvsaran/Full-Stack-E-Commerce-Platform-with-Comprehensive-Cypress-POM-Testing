class LoginPage {
    // Navigate to login page
    visit() {
        cy.visit('/')
    }

    // Get elements
    getEmailInput() {
        return cy.get('[data-testid="email-input"]')
    }

    getPasswordInput() {
        return cy.get('[data-testid="password-input"]')
    }

    getLoginButton() {
        return cy.get('[data-testid="login-button"]')
    }

    getErrorMessage() {
        return cy.get('[data-testid="error-message"]')
    }

    // Actions
    fillEmail(email) {
        this.getEmailInput().clear().type(email)
    }

    fillPassword(password) {
        this.getPasswordInput().clear().type(password)
    }

    submit() {
        this.getLoginButton().click()
    }

    // Composite actions
    login(email, password) {
        this.fillEmail(email)
        this.fillPassword(password)
        this.submit()
    }

    // Assertions
    assertErrorMessage(message) {
        this.getErrorMessage().should('be.visible')
        if (message) {
            this.getErrorMessage().should('contain', message)
        }
    }

    assertRedirectToProducts() {
        cy.url().should('include', '/products')
    }
}

export default LoginPage
