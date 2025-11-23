describe('Authentication API', () => {
    const baseUrl = 'http://localhost:5000'

    describe('POST /api/auth/login', () => {
        it('should successfully login with valid credentials', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    email: 'john@example.com',
                    password: 'password123'
                }
            }).then((response) => {
                // Verify status code
                expect(response.status).to.eq(200)

                // Verify response structure
                expect(response.body).to.have.property('success', true)
                expect(response.body).to.have.property('user')

                // Verify user data
                expect(response.body.user).to.have.property('id')
                expect(response.body.user).to.have.property('name', 'John Doe')
                expect(response.body.user).to.have.property('email', 'john@example.com')

                // Verify password is not returned
                expect(response.body.user).to.not.have.property('password')
            })
        })

        it('should fail with invalid email', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    email: 'invalid@example.com',
                    password: 'password123'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.have.property('success', false)
                expect(response.body).to.have.property('message')
                expect(response.body.message).to.include('Invalid email or password')
            })
        })

        it('should fail with invalid password', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    email: 'john@example.com',
                    password: 'wrongpassword'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.have.property('success', false)
                expect(response.body.message).to.include('Invalid email or password')
            })
        })

        it('should fail with missing credentials', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('success', false)
                expect(response.body.message).to.include('Email and password are required')
            })
        })

        it('should fail with missing email', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    password: 'password123'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('success', false)
            })
        })

        it('should fail with missing password', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    email: 'john@example.com'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('success', false)
            })
        })

        it('should have correct content-type header', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/auth/login`,
                body: {
                    email: 'john@example.com',
                    password: 'password123'
                }
            }).then((response) => {
                expect(response.headers).to.have.property('content-type')
                expect(response.headers['content-type']).to.include('application/json')
            })
        })
    })
})
