describe('Cart & Checkout API', () => {
    const baseUrl = 'http://localhost:5000'
    let userId = 1 // John Doe's user ID

    describe('POST /api/cart/checkout', () => {
        it('should successfully create an order with single item', () => {
            const checkoutData = {
                userId: userId,
                cartItems: [
                    {
                        id: 1,
                        name: 'Wireless Headphones',
                        price: 199.99,
                        quantity: 1
                    }
                ],
                customerInfo: {
                    name: 'John Doe',
                    address: '123 Main St',
                    city: 'New York',
                    pincode: '10001',
                    paymentMethod: 'cod'
                },
                totalAmount: 199.99
            }

            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: checkoutData
            }).then((response) => {
                // Verify status code
                expect(response.status).to.eq(200)

                // Verify response structure
                expect(response.body).to.have.property('success', true)
                expect(response.body).to.have.property('orderId')
                expect(response.body).to.have.property('message')

                // Verify order ID is a number
                expect(response.body.orderId).to.be.a('number')
                expect(response.body.orderId).to.be.greaterThan(0)

                // Store order ID for later tests
                cy.wrap(response.body.orderId).as('lastOrderId')
            })
        })

        it('should successfully create an order with multiple items', () => {
            const checkoutData = {
                userId: userId,
                cartItems: [
                    {
                        id: 1,
                        name: 'Wireless Headphones',
                        price: 199.99,
                        quantity: 2
                    },
                    {
                        id: 2,
                        name: 'Smart Watch',
                        price: 299.99,
                        quantity: 1
                    }
                ],
                customerInfo: {
                    name: 'John Doe',
                    address: '456 Oak Ave',
                    city: 'Boston',
                    pincode: '02101',
                    paymentMethod: 'card'
                },
                totalAmount: 699.97
            }

            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: checkoutData
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.success).to.be.true
                expect(response.body.orderId).to.be.greaterThan(0)
            })
        })

        it('should fail with missing userId', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    cartItems: [{ id: 1, price: 199.99, quantity: 1 }],
                    totalAmount: 199.99
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.success).to.be.false
                expect(response.body.message).to.include('Invalid checkout data')
            })
        })

        it('should fail with empty cart items', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    userId: userId,
                    cartItems: [],
                    totalAmount: 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.success).to.be.false
            })
        })

        it('should fail with missing cart items', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    userId: userId,
                    totalAmount: 199.99
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.success).to.be.false
            })
        })

        it('should fail with invalid cart items (not an array)', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    userId: userId,
                    cartItems: 'not-an-array',
                    totalAmount: 199.99
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.success).to.be.false
            })
        })

        it('should calculate correct total for multiple items', () => {
            const item1Price = 49.99
            const item1Qty = 2
            const item2Price = 29.99
            const item2Qty = 3
            const expectedTotal = (item1Price * item1Qty) + (item2Price * item2Qty)

            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    userId: userId,
                    cartItems: [
                        { id: 3, price: item1Price, quantity: item1Qty },
                        { id: 4, price: item2Price, quantity: item2Qty }
                    ],
                    totalAmount: expectedTotal
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.success).to.be.true
            })
        })

        it('should have correct content-type header', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/cart/checkout`,
                body: {
                    userId: userId,
                    cartItems: [{ id: 1, price: 199.99, quantity: 1 }],
                    totalAmount: 199.99
                }
            }).then((response) => {
                expect(response.headers['content-type']).to.include('application/json')
            })
        })
    })
})
