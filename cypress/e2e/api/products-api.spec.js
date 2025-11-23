describe('Products API', () => {
    const baseUrl = 'http://localhost:5000'

    describe('GET /api/products', () => {
        it('should return all products', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                // Verify status code
                expect(response.status).to.eq(200)

                // Verify response structure
                expect(response.body).to.have.property('success', true)
                expect(response.body).to.have.property('products')
                expect(response.body.products).to.be.an('array')

                // Verify we have products (should be 12 from seed)
                expect(response.body.products.length).to.be.greaterThan(0)
            })
        })

        it('should return products with correct structure', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                const products = response.body.products

                // Verify first product has all required fields
                expect(products[0]).to.have.property('id')
                expect(products[0]).to.have.property('name')
                expect(products[0]).to.have.property('description')
                expect(products[0]).to.have.property('price')
                expect(products[0]).to.have.property('image_url')
                expect(products[0]).to.have.property('category')
                expect(products[0]).to.have.property('stock')

                // Verify data types
                expect(products[0].id).to.be.a('number')
                expect(products[0].name).to.be.a('string')
                expect(products[0].price).to.be.a('number')
                expect(products[0].stock).to.be.a('number')
            })
        })

        it('should filter products by category - Electronics', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products?category=Electronics`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.products).to.be.an('array')

                // Verify all products are Electronics
                response.body.products.forEach(product => {
                    expect(product.category).to.eq('Electronics')
                })

                // Verify we have some electronics products
                expect(response.body.products.length).to.be.greaterThan(0)
            })
        })

        it('should filter products by category - Clothing', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products?category=Clothing`
            }).then((response) => {
                expect(response.status).to.eq(200)

                // Verify all products are Clothing
                response.body.products.forEach(product => {
                    expect(product.category).to.eq('Clothing')
                })
            })
        })

        it('should filter products by category - Home', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products?category=Home`
            }).then((response) => {
                expect(response.status).to.eq(200)

                // Verify all products are Home
                response.body.products.forEach(product => {
                    expect(product.category).to.eq('Home')
                })
            })
        })

        it('should return empty array for non-existent category', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products?category=NonExistent`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.products).to.be.an('array')
                expect(response.body.products).to.have.length(0)
            })
        })

        it('should have products with positive prices', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                response.body.products.forEach(product => {
                    expect(product.price).to.be.greaterThan(0)
                })
            })
        })

        it('should have products with non-negative stock', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                response.body.products.forEach(product => {
                    expect(product.stock).to.be.at.least(0)
                })
            })
        })

        it('should return valid image URLs', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                response.body.products.forEach(product => {
                    expect(product.image_url).to.be.a('string')
                    expect(product.image_url).to.include('http')
                })
            })
        })

        it('should have correct content-type header', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/api/products`
            }).then((response) => {
                expect(response.headers['content-type']).to.include('application/json')
            })
        })
    })
})
