import LoginPage from '../page-objects/LoginPage'
import ProductsPage from '../page-objects/ProductsPage'
import CartPage from '../page-objects/CartPage'
import CheckoutPage from '../page-objects/CheckoutPage'
import OrderConfirmationPage from '../page-objects/OrderConfirmationPage'

describe('Checkout Flow', () => {
    const loginPage = new LoginPage()
    const productsPage = new ProductsPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()
    const confirmationPage = new OrderConfirmationPage()

    beforeEach(() => {
        // Login before each test
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.email, users.validUser.password)
        })
        cy.url().should('include', '/products')
    })

    it('should complete full checkout flow', () => {
        // Step 1: Add products to cart
        productsPage.assertProductsVisible()
        productsPage.addProductToCartByIndex(0)
        productsPage.addProductToCartByIndex(1)

        // Verify cart count
        productsPage.assertCartCountIs(2)

        // Step 2: Go to cart
        productsPage.openCart()
        cy.url().should('include', '/cart')

        // Verify cart items
        cartPage.getCartItems().should('have.length', 2)

        // Step 3: Proceed to checkout
        cartPage.proceedToCheckout()
        checkoutPage.assertOnCheckoutPage()

        // Step 4: Fill checkout form
        checkoutPage.fillCheckoutForm({
            name: 'John Doe',
            address: '123 Main Street, Apt 4B',
            city: 'New York',
            pincode: '10001',
            paymentMethod: 'cod'
        })

        // Step 5: Place order
        checkoutPage.placeOrder()

        // Step 6: Verify order confirmation
        confirmationPage.assertOnConfirmationPage()
        confirmationPage.assertSuccessMessage()
        confirmationPage.assertOrderIdExists()
        confirmationPage.assertTotalAmount()
        confirmationPage.assertOrderDateExists()
    })

    it('should update cart quantities before checkout', () => {
        // Add products
        productsPage.assertProductsVisible()
        productsPage.addProductToCartByIndex(0)

        // Go to cart
        productsPage.openCart()

        // Increase quantity
        cartPage.increaseQuantity('Wireless Headphones')

        // Wait for update
        cy.wait(500)

        // Proceed with checkout
        cartPage.proceedToCheckout()
        checkoutPage.assertOnCheckoutPage()
    })

    it('should validate checkout form fields', () => {
        // Add product
        productsPage.assertProductsVisible()
        productsPage.addProductToCartByIndex(0)

        // Navigate to checkout
        productsPage.openCart()
        cartPage.proceedToCheckout()

        // Try to place order without filling form
        checkoutPage.placeOrder()

        // Should show error (form validation)
        cy.contains('Please fill in all fields').should('be.visible')
    })

    it('should maintain order summary in checkout', () => {
        // Add multiple products
        productsPage.assertProductsVisible()
        productsPage.addProductToCartByIndex(0)
        productsPage.addProductToCartByIndex(1)

        // Go to checkout
        productsPage.openCart()
        cartPage.proceedToCheckout()

        // Verify order summary shows items
        cy.get('[data-testid="checkout-total"]').should('be.visible')
    })
})
