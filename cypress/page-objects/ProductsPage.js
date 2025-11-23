class ProductsPage {
    // Navigate to products page
    visit() {
        cy.visit('/products')
    }

    // Get elements
    getProductsGrid() {
        return cy.get('[data-testid="products-grid"]')
    }

    getProductCards() {
        return cy.get('[data-testid="product-card"]')
    }

    getCartCount() {
        return cy.get('[data-testid="cart-count"]')
    }

    getCategoryFilters() {
        return cy.get('[data-testid="category-filter"]')
    }

    // Actions
    addProductToCart(productName) {
        cy.contains('[data-testid="product-card"]', productName)
            .find('[data-testid="add-to-cart-button"]')
            .click()
    }

    addProductToCartByIndex(index) {
        this.getProductCards()
            .eq(index)
            .find('[data-testid="add-to-cart-button"]')
            .click()
    }

    filterByCategory(category) {
        cy.contains('[data-testid="category-filter"]', category).click()
    }

    openCart() {
        this.getCartCount().click()
    }

    // Assertions
    assertProductsVisible() {
        this.getProductsGrid().should('be.visible')
        this.getProductCards().should('have.length.greaterThan', 0)
    }

    assertCartCountIs(count) {
        if (count > 0) {
            this.getCartCount().should('be.visible').and('contain', count)
        }
    }

    assertProductExists(productName) {
        cy.contains('[data-testid="product-card"]', productName).should('exist')
    }
}

export default ProductsPage
