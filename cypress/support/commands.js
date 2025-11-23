// ***********************************************************
// Custom commands for E-commerce app
// ***********************************************************

// Custom login command for easier test setup
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()
})

// Command to add product to cart by name
Cypress.Commands.add('addProductToCart', (productName) => {
    cy.contains('[data-testid="product-card"]', productName)
        .find('[data-testid="add-to-cart-button"]')
        .click()
})
