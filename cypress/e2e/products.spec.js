import LoginPage from '../page-objects/LoginPage'
import ProductsPage from '../page-objects/ProductsPage'

describe('Products Page', () => {
    const loginPage = new LoginPage()
    const productsPage = new ProductsPage()

    beforeEach(() => {
        // Login before each test
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.email, users.validUser.password)
        })
        // Wait for products page to load
        cy.url().should('include', '/products')
    })

    it('should display products after login', () => {
        // Verify products are visible
        productsPage.assertProductsVisible()

        // Verify product cards have required information
        productsPage.getProductCards().first().within(() => {
            cy.get('[data-testid="product-name"]').should('be.visible')
            cy.get('[data-testid="product-price"]').should('be.visible')
            cy.get('[data-testid="add-to-cart-button"]').should('be.visible')
        })
    })

    it('should filter products by category', () => {
        // Wait for products to load
        productsPage.assertProductsVisible()

        // Click on Electronics filter
        productsPage.filterByCategory('Electronics')

        // Verify filtered products
        cy.wait(500) // Wait for filter to apply
        productsPage.getProductCards().should('have.length.greaterThan', 0)
    })

    it('should add product to cart and update cart count', () => {
        // Wait for products to load
        productsPage.assertProductsVisible()

        // Add first product to cart
        productsPage.addProductToCartByIndex(0)

        // Verify cart count updated
        productsPage.assertCartCountIs(1)

        // Add another product
        productsPage.addProductToCartByIndex(1)

        // Verify cart count updated to 2
        productsPage.assertCartCountIs(2)
    })

    it('should add multiple quantities of the same product', () => {
        // Wait for products to load
        productsPage.assertProductsVisible()

        // Add same product multiple times
        productsPage.addProductToCartByIndex(0)
        productsPage.addProductToCartByIndex(0)
        productsPage.addProductToCartByIndex(0)

        // Verify cart count shows 3 items
        productsPage.assertCartCountIs(3)
    })
})
