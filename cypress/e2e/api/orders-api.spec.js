describe('Orders API', () => {
    const baseUrl = 'http://localhost:5000'
    let testOrderId

    beforeEach(() => {
        // Create a test order first
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/cart/checkout`,
            body: {
                userId: 1,
                cartItems: [
                    {
                        id: 1,
                        name: 'Wireless Headphones',
                        price: 199.99,
                        quantity: 1
                    },
                    {
                        id: 2,
                        name: 'Smart Watch',
                        price: 299.99,
                        quantity: 1
                    }
                ],
                customerInfo: {
                    name: 'Test User',
                    address: '123 Test St',
                    city: 'Test City',
                    pincode: '12345',
                    paymentMethod: 'cod'
                },
                totalAmount: 499.98
            }
        }).then((response) => {
            testOrderId = response.body.orderId
        })
    })

    describe('GET /api/orders/:id', () => {
        it('should retrieve order details', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                // Verify status code
                expect(response.status).to.eq(200)

                // Verify response structure
                expect(response.body).to.have.property('success', true)
                expect(response.body).to.have.property('order')

                // Verify order fields
                expect(response.body.order).to.have.property('id', testOrderId)
                expect(response.body.order).to.have.property('user_id')
                expect(response.body.order).to.have.property('total_amount')
                expect(response.body.order).to.have.property('created_at')
                expect(response.body.order).to.have.property('items')
            })
        })

        it('should include order items in response', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                const order = response.body.order

                // Verify items array exists and has items
                expect(order.items).to.be.an('array')
                expect(order.items.length).to.be.greaterThan(0)

                // Verify first item structure
                expect(order.items[0]).to.have.property('id')
                expect(order.items[0]).to.have.property('order_id', testOrderId)
                expect(order.items[0]).to.have.property('product_id')
                expect(order.items[0]).to.have.property('product_name')
                expect(order.items[0]).to.have.property('quantity')
                expect(order.items[0]).to.have.property('price')
                expect(order.items[0]).to.have.property('image_url')
            })
        })

        it('should have correct total amount', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                expect(response.body.order.total_amount).to.eq(499.98)
            })
        })

        it('should have two items in the order', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                expect(response.body.order.items).to.have.length(2)
            })
        })

        it('should have correct product names in items', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                const productNames = response.body.order.items.map(item => item.product_name)
                expect(productNames).to.include('Wireless Headphones')
                expect(productNames).to.include('Smart Watch')
            })
        })

        it('should have valid created_at timestamp', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                const createdAt = response.body.order.created_at
                expect(createdAt).to.be.a('string')
                expect(createdAt).to.not.be.empty

                // Verify it's a valid timestamp format
                // SQLite returns: 'YYYY-MM-DD HH:MM:SS'
                expect(createdAt).to.match(/\d{4}-\d{2}-\d{2}/)
            })
        })

        it('should fail with non-existent order ID', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/99999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.success).to.be.false
                expect(response.body.message).to.include('Order not found')
            })
        })

        it('should fail with invalid order ID', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/invalid`,
                failOnStatusCode: false
            }).then((response) => {
                // Should still return 404 or handle gracefully
                expect(response.status).to.be.oneOf([400, 404])
                expect(response.body.success).to.be.false
            })
        })

        it('should have correct user_id', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                expect(response.body.order.user_id).to.eq(1)
            })
        })

        it('should have correct content-type header', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/orders/${testOrderId}`
            }).then((response) => {
                expect(response.headers['content-type']).to.include('application/json')
            })
        })
    })
})
