class CartPage {
    // Navigate to cart page
    visit() {
        cy.visit('/cart')
    }

    // Get elements
    getCartItems() {
        return cy.get('[data-testid="cart-item"]')
    }

    getProceedToCheckoutButton() {
        return cy.get('[data-testid="proceed-to-checkout"]')
    }

    getSubtotal() {
        return cy.get('[data-testid="subtotal"]')
    }

    getTotal() {
        return cy.get('[data-testid="total"]')
    }

    getTotalItems() {
        return cy.get('[data-testid="total-items"]')
    }

    // Actions
    increaseQuantity(productName) {
        cy.contains('[data-testid="cart-item"]', productName)
            .find('[data-testid="increase-quantity"]')
            .click()
    }

    decreaseQuantity(productName) {
        cy.contains('[data-testid="cart-item"]', productName)
            .find('[data-testid="decrease-quantity"]')
            .click()
    }

    removeItem(productName) {
        cy.contains('[data-testid="cart-item"]', productName)
            .find('[data-testid="remove-item-button"]')
            .click()
    }

    proceedToCheckout() {
        this.getProceedToCheckoutButton().click()
    }

    // Assertions
    assertItemPresent(productName) {
        cy.contains('[data-testid="cart-item"]', productName).should('exist')
    }

    assertItemQuantity(productName, quantity) {
        cy.contains('[data-testid="cart-item"]', productName)
            .find('[data-testid="item-quantity"]')
            .should('contain', quantity)
    }

    assertTotal(amount) {
        this.getTotal().should('contain', amount)
    }

    assertCartIsEmpty() {
        this.getCartItems().should('not.exist')
    }
}

export default CartPage
