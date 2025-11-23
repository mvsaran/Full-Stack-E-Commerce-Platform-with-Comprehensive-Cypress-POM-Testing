class OrderConfirmationPage {
    // Get elements
    getSuccessMessage() {
        return cy.get('[data-testid="success-message"]')
    }

    getOrderId() {
        return cy.get('[data-testid="order-id"]')
    }

    getOrderTotal() {
        return cy.get('[data-testid="order-total"]')
    }

    getOrderDate() {
        return cy.get('[data-testid="order-date"]')
    }

    getContinueShoppingButton() {
        return cy.get('[data-testid="continue-shopping-button"]')
    }

    // Actions
    continueShopping() {
        this.getContinueShoppingButton().click()
    }

    // Assertions
    assertSuccessMessage() {
        this.getSuccessMessage().should('be.visible')
        this.getSuccessMessage().should('contain', 'Order Placed Successfully')
    }

    assertOrderIdExists() {
        this.getOrderId().should('be.visible')
        this.getOrderId().invoke('text').should('not.be.empty')
    }

    assertTotalAmount(amount) {
        if (amount) {
            this.getOrderTotal().should('contain', amount)
        } else {
            this.getOrderTotal().should('be.visible')
        }
    }

    assertOrderDateExists() {
        this.getOrderDate().should('be.visible')
    }

    assertOnConfirmationPage() {
        cy.url().should('include', '/order-confirmation')
    }
}

export default OrderConfirmationPage
