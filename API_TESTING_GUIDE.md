# Cypress API Testing Guide

## 📡 API Test Suite Overview

I've created a comprehensive API testing suite that tests all backend REST endpoints **directly** without the UI. This verifies that your backend APIs work correctly independently of the frontend.

---

## 🗂️ API Test Files

All API tests are organized in `cypress/e2e/api/` directory:

### 1. **auth-api.spec.js** (7 tests)
Tests authentication endpoints:
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid email
- ✅ Failed login with invalid password
- ✅ Missing credentials validation
- ✅ Missing email validation
- ✅ Missing password validation
- ✅ Content-type header verification

### 2. **products-api.spec.js** (10 tests)
Tests product retrieval endpoints:
- ✅ Get all products
- ✅ Product structure validation
- ✅ Filter by category (Electronics, Clothing, Home)
- ✅ Non-existent category handling
- ✅ Price validation (positive values)
- ✅ Stock validation (non-negative)
- ✅ Image URL validation
- ✅ Content-type header verification

### 3. **checkout-api.spec.js** (8 tests)
Tests cart and checkout endpoints:
- ✅ Create order with single item
- ✅ Create order with multiple items
- ✅ Missing userId validation
- ✅ Empty cart validation
- ✅ Missing cart items validation
- ✅ Invalid cart items (not array) validation
- ✅ Total amount calculation
- ✅ Content-type header verification

### 4. **orders-api.spec.js** (10 tests)
Tests order retrieval endpoints:
- ✅ Retrieve order details
- ✅ Order items included
- ✅ Correct total amount
- ✅ Correct number of items
- ✅ Product names in items
- ✅ Valid created_at timestamp
- ✅ Non-existent order ID handling
- ✅ Invalid order ID handling
- ✅ Correct user_id
- ✅ Content-type header verification

**Total: 35 API Tests** 🎯

---

## 🚀 Running API Tests

### Run All API Tests

```bash
npx cypress run --spec "cypress/e2e/api/**/*.js"
```

### Run Specific API Test Suite

```bash
# Authentication tests only
npx cypress run --spec "cypress/e2e/api/auth-api.spec.js"

# Products tests only
npx cypress run --spec "cypress/e2e/api/products-api.spec.js"

# Checkout tests only
npx cypress run --spec "cypress/e2e/api/checkout-api.spec.js"

# Orders tests only
npx cypress run --spec "cypress/e2e/api/orders-api.spec.js"
```

### Run in Interactive Mode

```bash
npx cypress open
```

Then select any API test file from the `api/` folder.

---

## 📊 Test Coverage by Endpoint

### `/api/auth/login`
- ✅ POST with valid credentials → 200 OK
- ✅ POST with invalid email → 401 Unauthorized
- ✅ POST with invalid password → 401 Unauthorized
- ✅ POST with missing credentials → 400 Bad Request
- ✅ Response structure validation
- ✅ Password not returned in response

### `/api/products`
- ✅ GET all products → 200 OK
- ✅ GET with category filter → 200 OK
- ✅ Response structure validation
- ✅ Data type validation
- ✅ Business logic validation (prices > 0, stock >= 0)

### `/api/cart/checkout`
- ✅ POST with valid data → 200 OK
- ✅ POST with single item → Creates order
- ✅ POST with multiple items → Creates order
- ✅ POST with missing userId → 400 Bad Request
- ✅ POST with empty cart → 400 Bad Request
- ✅ POST with invalid cart items → 400 Bad Request
- ✅ Returns orderId in response

### `/api/orders/:id`
- ✅ GET existing order → 200 OK
- ✅ GET non-existent order → 404 Not Found
- ✅ GET with invalid ID → 400/404
- ✅ Response includes order items
- ✅ Order items include product details
- ✅ Timestamp validation

---

## 🧪 API Testing Best Practices

### 1. **Status Code Verification**
Every test verifies the HTTP status code:
```javascript
expect(response.status).to.eq(200)
```

### 2. **Response Structure Validation**
Tests verify the shape of the response:
```javascript
expect(response.body).to.have.property('success', true)
expect(response.body).to.have.property('user')
```

### 3. **Data Type Validation**
Tests check data types:
```javascript
expect(product.price).to.be.a('number')
expect(product.name).to.be.a('string')
```

### 4. **Business Logic Validation**
Tests verify business rules:
```javascript
expect(product.price).to.be.greaterThan(0)
expect(product.stock).to.be.at.least(0)
```

### 5. **Error Handling**
Tests verify error responses:
```javascript
cy.request({
  ...
  failOnStatusCode: false  // Don't fail on non-2xx
}).then((response) => {
  expect(response.status).to.eq(401)
  expect(response.body.message).to.include('Invalid')
})
```

### 6. **Headers Validation**
Tests verify response headers:
```javascript
expect(response.headers['content-type']).to.include('application/json')
```

---

## 📈 Test Results Interpretation

### Successful Test Output

```
  Authentication API
    POST /api/auth/login
      ✓ should successfully login with valid credentials (45ms)
      ✓ should fail with invalid email (38ms)
      ✓ should fail with invalid password (35ms)
      ✓ should fail with missing credentials (32ms)
      ...
  
  7 passing (250ms)
```

### Failed Test Example

```
  1) Authentication API
       POST /api/auth/login
         should successfully login with valid credentials:
     
     AssertionError: expected 500 to equal 200
      at Context.eval (auth-api.spec.js:15:30)
```

This indicates the login endpoint returned a 500 error instead of 200.

---

## 🔍 Debugging API Tests

### View Request Details

Add `cy.log()` to see request details:

```javascript
cy.request({
  method: 'POST',
  url: `${baseUrl}/api/auth/login`,
  body: { email: 'test@test.com', password: 'test123' }
}).then((response) => {
  cy.log('Status:', response.status)
  cy.log('Body:', JSON.stringify(response.body))
  cy.log('Headers:', JSON.stringify(response.headers))
})
```

### Using Browser Console

In Cypress UI:
1. Click on any test step
2. Open browser DevTools (F12)
3. Console will show request/response details

### Check Backend Logs

While tests run, watch backend terminal for API logs:
```
POST /api/auth/login
GET /api/products
POST /api/cart/checkout
```

---

## 🎯 Integration with CI/CD

### GitHub Actions Example

```yaml
- name: Run API Tests
  run: |
    npm run cy:run -- --spec "cypress/e2e/api/**/*.js"
```

### Generate Reports

```bash
# With mochawesome reporter
npx cypress run --spec "cypress/e2e/api/**/*.js" --reporter mochawesome
```

---

## 📊 Test Metrics

| Metric | Value |
|--------|-------|
| Total API Tests | 35 |
| Endpoints Covered | 4 |
| Authentication Tests | 7 |
| Products Tests | 10 |
| Checkout Tests | 8 |
| Orders Tests | 10 |
| Success Path Tests | 20 |
| Error Path Tests | 15 |

---

## 🔄 API vs E2E Tests

### API Tests (New)
- ✅ Fast execution (milliseconds)
- ✅ Test backend in isolation
- ✅ Easy to debug
- ✅ No UI dependencies
- ✅ Test error cases easily
- ❌ Don't test UI integration

### E2E Tests (Existing)
- ✅ Test complete user flow
- ✅ Test UI + backend integration
- ✅ Catch integration bugs
- ❌ Slower execution
- ❌ More complex debugging
- ❌ UI changes break tests

**Both are valuable!** Use API tests for backend verification and E2E tests for user flow validation.

---

## 🆕 Advanced API Testing

### Chaining Requests

```javascript
it('should create order and retrieve it', () => {
  // Step 1: Create order
  cy.request('POST', `${baseUrl}/api/cart/checkout`, checkoutData)
    .then((checkoutResponse) => {
      const orderId = checkoutResponse.body.orderId
      
      // Step 2: Retrieve the order
      return cy.request('GET', `${baseUrl}/api/orders/${orderId}`)
    })
    .then((orderResponse) => {
      expect(orderResponse.status).to.eq(200)
      expect(orderResponse.body.order).to.exist
    })
})
```

### Performance Testing

```javascript
it('should respond quickly', () => {
  const startTime = Date.now()
  
  cy.request('GET', `${baseUrl}/api/products`)
    .then((response) => {
      const duration = Date.now() - startTime
      expect(duration).to.be.lessThan(500) // Under 500ms
    })
})
```

### Data Validation

```javascript
it('should have consistent product data', () => {
  cy.request('GET', `${baseUrl}/api/products`)
    .then((response) => {
      response.body.products.forEach(product => {
        // Verify price matches description
        if (product.category === 'Electronics') {
          expect(product.price).to.be.greaterThan(20)
        }
      })
    })
})
```

---

## 🚀 Quick Start

**Run all API tests now:**

```bash
# Make sure backend is running on port 5000
cd c:\Users\mvsar\Projects\Antigravity\ecommerce-app
npx cypress run --spec "cypress/e2e/api/**/*.js"
```

**Or run interactively:**

```bash
npx cypress open
# Then select any test from the api/ folder
```

---

## 📝 Summary

You now have:
- ✅ **35 comprehensive API tests**
- ✅ **4 test suites** covering all endpoints
- ✅ **Positive and negative test cases**
- ✅ **Response structure validation**
- ✅ **Error handling verification**
- ✅ **Business logic validation**

Your backend is now thoroughly tested! 🎉
