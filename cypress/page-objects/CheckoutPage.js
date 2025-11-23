class CheckoutPage {
    // Navigate to checkout page
    visit() {
        cy.visit('/checkout')
    }

    // Get elements
    getNameInput() {
        return cy.get('[data-testid="name-input"]')
    }

    getAddressInput() {
        return cy.get('[data-testid="address-input"]')
    }

    getCityInput() {
        return cy.get('[data-testid="city-input"]')
    }

    getPincodeInput() {
        return cy.get('[data-testid="pincode-input"]')
    }

    getPaymentMethodSelect() {
        return cy.get('[data-testid="payment-method-select"]')
    }

    getPlaceOrderButton() {
        return cy.get('[data-testid="place-order-button"]')
    }

    getCheckoutTotal() {
        return cy.get('[data-testid="checkout-total"]')
    }

    // Actions
    fillName(name) {
        this.getNameInput().clear().type(name)
    }

    fillAddress(address) {
        this.getAddressInput().clear().type(address)
    }

    fillCity(city) {
        this.getCityInput().clear().type(city)
    }

    fillPincode(pincode) {
        this.getPincodeInput().clear().type(pincode)
    }

    selectPaymentMethod(method) {
        this.getPaymentMethodSelect().select(method)
    }

    placeOrder() {
        this.getPlaceOrderButton().click()
    }

    // Composite actions
    fillCheckoutForm(data) {
        this.fillName(data.name)
        this.fillAddress(data.address)
        this.fillCity(data.city)
        this.fillPincode(data.pincode)
        if (data.paymentMethod) {
            this.selectPaymentMethod(data.paymentMethod)
        }
    }

    // Assertions
    assertOnCheckoutPage() {
        cy.url().should('include', '/checkout')
    }
}

export default CheckoutPage
