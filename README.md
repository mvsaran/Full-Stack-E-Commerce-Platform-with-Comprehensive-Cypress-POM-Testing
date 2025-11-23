# 🛍️ E-Commerce Web Application with Cypress Testing

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Cypress](https://img.shields.io/badge/Cypress-13.6.2-brightgreen.svg)](https://www.cypress.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack e-commerce web application built with **React**, **Express**, and **SQLite**, featuring comprehensive end-to-end and API testing using **Cypress** with Page Object Model (POM) pattern.

![Project Banner](<img width="447" height="527" alt="image" src="https://github.com/user-attachments/assets/ed8a2d79-b070-4e4f-be5d-a3cc3d173fce" />)


---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [💻 Development](#-development)
- [🧪 Testing](#-testing)
- [📊 Database](#-database)
- [🔌 API Documentation](#-api-documentation)
- [🎯 Original Project Prompt](#-original-project-prompt)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Features

### 🛒 E-Commerce Functionality
- 🔐 **User Authentication** - Secure login with email/password
- 📦 **Product Catalog** - Browse 12+ products across 3 categories
- 🎨 **Modern UI Design** - Responsive layout with Tailwind CSS and gradient effects
- 🛍️ **Shopping Cart** - Add, update, and remove items with real-time totals
- 💳 **Checkout Flow** - Complete order placement with customer information
- ✅ **Order Confirmation** - View order details and receipt

### 🧪 Comprehensive Testing
- **47 Total Tests** covering all functionality
  - 12 E2E UI Tests (Page Object Model)
  - 35 API Tests (Backend validation)
- **100% Endpoint Coverage** - All REST APIs tested
- **Page Object Model** - Maintainable test architecture
- **Automated CI/CD Ready** - Headless test execution

### 🎯 Quality Assurance
- ✅ Authentication flow testing
- ✅ Product filtering and display
- ✅ Cart operations validation
- ✅ Complete checkout process
- ✅ Database integrity verification
- ✅ API response validation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Library |
| **Vite** | 5.0.8 | Build Tool & Dev Server |
| **React Router** | 6.20.0 | Client-side Routing |
| **Tailwind CSS** | 3.3.6 | Styling Framework |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 16+ | JavaScript Runtime |
| **Express** | 4.18.2 | Web Framework |
| **SQLite3** | 5.1.6 | Database |
| **CORS** | 2.8.5 | Cross-Origin Support |

### Testing
| Technology | Version | Purpose |
|------------|---------|---------|
| **Cypress** | 13.6.2 | E2E & API Testing |
| **JavaScript** | ES6+ | Test Implementation |

---

## 📁 Project Structure

```
ecommerce-app/
│
├── 📂 backend/                          # Express Backend
│   ├── 📂 src/
│   │   ├── 📂 database/
│   │   │   ├── 📄 schema.sql           # Database schema
│   │   │   ├── 📄 seed.js              # Data seeding script
│   │   │   ├── 📄 db.js                # Database connection
│   │   │   └── 📄 inspect-db.js        # DB inspection tool
│   │   ├── 📂 routes/
│   │   │   ├── 📄 auth.js              # Authentication endpoints
│   │   │   ├── 📄 products.js          # Products API
│   │   │   ├── 📄 cart.js              # Cart & checkout API
│   │   │   └── 📄 orders.js            # Orders API
│   │   └── 📄 server.js                # Express app entry
│   ├── 📄 package.json
│   └── 📊 ecommerce.db                 # SQLite database (auto-generated)
│
├── 📂 frontend/                         # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📄 Header.jsx           # App header with cart
│   │   │   └── 📄 ProductCard.jsx      # Product display card
│   │   ├── 📂 pages/
│   │   │   ├── 📄 LoginPage.jsx        # Login page
│   │   │   ├── 📄 ProductsPage.jsx     # Product listing
│   │   │   ├── 📄 CartPage.jsx         # Shopping cart
│   │   │   ├── 📄 CheckoutPage.jsx     # Checkout form
│   │   │   └── 📄 OrderConfirmationPage.jsx  # Order success
│   │   ├── 📄 App.jsx                  # Main app component
│   │   ├── 📄 main.jsx                 # React entry point
│   │   └── 📄 index.css                # Global styles
│   ├── 📄 index.html
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   └── 📄 package.json
│
├── 📂 cypress/                          # Cypress Tests
│   ├── 📂 e2e/
│   │   ├── 📂 api/                     # API Tests (35 tests)
│   │   │   ├── 📄 auth-api.spec.js     # Auth endpoint tests
│   │   │   ├── 📄 products-api.spec.js # Products endpoint tests
│   │   │   ├── 📄 checkout-api.spec.js # Checkout endpoint tests
│   │   │   └── 📄 orders-api.spec.js   # Orders endpoint tests
│   │   ├── 📄 login.spec.js            # Login UI tests
│   │   ├── 📄 products.spec.js         # Products UI tests
│   │   └── 📄 checkout.spec.js         # Checkout flow tests
│   ├── 📂 page-objects/                # Page Object Model
│   │   ├── 📄 LoginPage.js
│   │   ├── 📄 ProductsPage.js
│   │   ├── 📄 CartPage.js
│   │   ├── 📄 CheckoutPage.js
│   │   └── 📄 OrderConfirmationPage.js
│   ├── 📂 fixtures/
│   │   └── 📄 users.json               # Test data
│   └── 📂 support/
│       ├── 📄 commands.js              # Custom commands
│       └── 📄 e2e.js                   # Support file
│
├── 📄 cypress.config.js                 # Cypress configuration
├── 📄 package.json                      # Root dependencies
├── 📄 README.md                         # This file
├── 📄 DATABASE_TESTING.md               # Database testing guide
└── 📄 API_TESTING_GUIDE.md             # API testing guide
```

**Total Files:** 38+ source files  
**Total Tests:** 47 automated tests  
**Lines of Code:** ~3,000+

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher)

Check your versions:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Cypress (root level)**
   ```bash
   cd ..
   npm install
   ```

### Database Setup

Initialize the SQLite database with seed data:

```bash
cd backend
npm run seed
```

**Output:**
```
🌱 Starting database seeding...
✅ Schema created successfully
✅ Inserted 2 demo users
✅ Inserted 12 demo products
🎉 Database seeding completed!

📝 Demo credentials:
   Email: john@example.com
   Password: password123
```

---

## 💻 Development

### Running the Application

You need **three terminal windows**:

#### Terminal 1: Backend Server

```bash
cd backend
npm start
```

Server runs on: **http://localhost:5000**

#### Terminal 2: Frontend Dev Server

```bash
cd frontend
npm run dev
```

App runs on: **http://localhost:3000**

#### Terminal 3: Open the Application

Open your browser to **http://localhost:3000**

**Login with demo credentials:**
- Email: `john@example.com`
- Password: `password123`

### Development Scripts

**Backend:**
```bash
npm start          # Start server
npm run dev        # Start with auto-reload
npm run seed       # Seed database
npm run inspect-db # View database contents
```

**Frontend:**
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 🧪 Testing

### Test Overview

| Type | Count | Purpose |
|------|-------|---------|
| **E2E UI Tests** | 12 | Test complete user flows through UI |
| **API Tests** | 35 | Test backend endpoints directly |
| **Total** | **47** | Comprehensive coverage |

### Running Tests

#### All Tests (E2E + API)

```bash
npm run cy:run
```

#### E2E UI Tests Only

```bash
npx cypress run --spec "cypress/e2e/*.spec.js"
```

#### API Tests Only

```bash
npx cypress run --spec "cypress/e2e/api/**/*.js"
```

#### Interactive Mode (Recommended for Development)

```bash
npm run cy:open
```

Benefits:
- ✅ Visual test runner
- ✅ Real-time browser interaction
- ✅ Easy debugging
- ✅ Select individual tests

### Test Suites

#### 📱 E2E UI Tests (12 tests)

**`login.spec.js`** (4 tests)
- ✅ Successful login
- ✅ Failed login
- ✅ Required field validation
- ✅ Email format validation

**`products.spec.js`** (4 tests)
- ✅ Display products
- ✅ Filter by category
- ✅ Add to cart
- ✅ Cart count update

**`checkout.spec.js`** (4 tests)
- ✅ Complete checkout flow
- ✅ Cart quantity updates
- ✅ Form validation
- ✅ Order summary

#### 🔌 API Tests (35 tests)

**`auth-api.spec.js`** (7 tests)
- Authentication endpoint validation
- Error handling
- Response structure

**`products-api.spec.js`** (10 tests)
- Product retrieval
- Category filtering
- Data validation

**`checkout-api.spec.js`** (8 tests)
- Order creation
- Cart validation
- Total calculation

**`orders-api.spec.js`** (10 tests)
- Order retrieval
- Order items
- Timestamp validation

### Test Results Example

```
  ====================================================================================================

  (Run Finished)

       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  login.spec.js                            392ms        4        4        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  products.spec.js                         845ms        4        4        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  checkout.spec.js                        1823ms        4        4        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  api/auth-api.spec.js                     620ms        7        7        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  api/products-api.spec.js                 890ms       10       10        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  api/checkout-api.spec.js                 950ms        8        8        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  api/orders-api.spec.js                   780ms       10       10        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                       6300ms       47       47        -        -        -
```

---

## 📊 Database

### Schema

The application uses SQLite with the following schema:

#### Users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```

#### Products
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0
);
```

#### Orders
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Order Items
```sql
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Seed Data

- **2 Users** - Demo accounts for testing
- **12 Products** - Across 3 categories (Electronics, Clothing, Home)

### Database Inspection

View database contents anytime:

```bash
cd backend
npm run inspect-db
```

Output:
```
📊 DATABASE INSPECTION TOOL
============================================================
📋 USERS (2 records)
📋 PRODUCTS (12 records)
📋 ORDERS (X records)
📋 ORDER ITEMS (X records)

📊 SUMMARY
  Users:       2
  Products:    12
  Orders:      X
  Order Items: X
```

**See:** `DATABASE_TESTING.md` for detailed database testing guide.

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Authentication

**POST /api/auth/login**

Login with email and password

```json
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Products

**GET /api/products**

Get all products or filter by category

```bash
# All products
GET /api/products

# Filter by category
GET /api/products?category=Electronics
```

```json
// Response
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Premium noise-cancelling...",
      "price": 199.99,
      "image_url": "https://...",
      "category": "Electronics",
      "stock": 25
    }
  ]
}
```

#### Checkout

**POST /api/cart/checkout**

Create an order from cart items

```json
// Request
{
  "userId": 1,
  "cartItems": [
    {
      "id": 1,
      "price": 199.99,
      "quantity": 2
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "pincode": "10001",
    "paymentMethod": "cod"
  },
  "totalAmount": 399.98
}

// Response
{
  "success": true,
  "orderId": 123,
  "message": "Order placed successfully"
}
```

#### Orders

**GET /api/orders/:id**

Get order details with items

```json
// Response
{
  "success": true,
  "order": {
    "id": 123,
    "user_id": 1,
    "total_amount": 399.98,
    "created_at": "2025-11-23 10:30:00",
    "items": [
      {
        "id": 1,
        "order_id": 123,
        "product_id": 1,
        "product_name": "Wireless Headphones",
        "quantity": 2,
        "price": 199.99
      }
    ]
  }
}
```

**See:** `API_TESTING_GUIDE.md` for complete API testing documentation.

---

## 🎯 Original Project Prompt

This project was built based on the following comprehensive requirements:

<details>
<summary><b>Click to view original prompt</b></summary>

### Goal
Build a **simple, lightweight e-commerce web app** with:
- Login page
- Product listing page
- Cart & checkout page
- Local sample database
- A **Page Object Model (POM) test framework using Cypress with JavaScript**

### Tech Stack Requirements
- **Frontend**: React (Vite) with Tailwind CSS
- **Backend**: Node.js + Express with REST APIs
- **Database**: SQLite (local file DB)
- **Testing**: Cypress v13+ with JavaScript POM structure

### Database Schema
1. **users** - id, name, email, password
2. **products** - id, name, description, price, image_url, category, stock
3. **orders** - id, user_id, total_amount, created_at
4. **order_items** - id, order_id, product_id, quantity, price

### Application Pages
1. **Login Page** - Email/password login with validation
2. **Products Page** - Product grid with category filters and cart
3. **Cart Page** - Item list with quantity controls and checkout
4. **Checkout Page** - Shipping info and payment method
5. **Order Confirmation** - Success message with order details

### API Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/products` - Fetch products with optional filtering
- `POST /api/cart/checkout` - Create orders
- `GET /api/orders/:id` - Retrieve order details

### Cypress Testing Requirements
- **Page Object Model** structure
- Test specs for login, products, and checkout flows
- Custom commands for reusable actions
- Fixtures for test data
- Scripts: `cy:open` and `cy:run`

### Deliverables
✅ Complete project structure with frontend, backend, and tests  
✅ Database with schema and seed scripts  
✅ All application pages implemented  
✅ REST API endpoints with error handling  
✅ Comprehensive Cypress POM tests  
✅ README with setup and run instructions  

</details>

---

## 📸 Screenshots

### Login Page
<img width="1883" height="1097" alt="Web APP" src="https://github.com/user-attachments/assets/43c96eb0-570d-4ebf-b363-273d5813c426" />


### Products Page

<img width="1861" height="1097" alt="Products page" src="https://github.com/user-attachments/assets/879e9af2-be35-4a0f-a2df-b3f7d6f6c5d8" />

### Shopping Cart
![Cart](https://via.placeholder.com/800x500/0EA5E9/FFFFFF?text=Shopping+Cart)

### Checkout & Order Confirmation

<img width="1117" height="1087" alt="CheckOut" src="https://github.com/user-attachments/assets/c8b2928a-1624-4e10-ba13-71902e8fdc51" />

### Cypress Tests Running

<img width="1275" height="1127" alt="Cypress Tests" src="https://github.com/user-attachments/assets/de09c35b-a402-4288-adc9-ec72f0e4efdc" />

---

## 🏗️ Architecture

### Application Flow

```
┌─────────────┐
│   Browser   │
│  (React UI) │
└──────┬──────┘
       │
       │ HTTP Requests
       │
       ▼
┌─────────────────┐
│  Express Server │
│   (Port 5000)   │
└──────┬──────────┘
       │
       │ SQL Queries
       │
       ▼
┌─────────────────┐
│ SQLite Database │
│  (ecommerce.db) │
└─────────────────┘
```

### Test Architecture

```
┌──────────────────┐
│  Cypress Runner  │
└────────┬─────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌────────────────┐  ┌──────────────┐
│   E2E Tests    │  │   API Tests  │
│   (UI Flow)    │  │  (Backend)   │
└────────┬───────┘  └──────┬───────┘
         │                 │
         ▼                 ▼
      Browser          Express API
```

---

## 🎓 Learning Resources

This project demonstrates:

✅ **Full-Stack Development**
- React component architecture
- Express REST API design
- SQLite database management
- Client-server communication

✅ **Modern Development Practices**
- ES6+ JavaScript
- Async/await patterns
- Component-based UI
- RESTful API design

✅ **Test Automation**
- Page Object Model pattern
- E2E testing strategies
- API testing approaches
- Test data management

✅ **DevOps & CI/CD**
- Project structure organization
- Environment configuration
- Automated testing
- Database seeding

---

## 🚦 Running in Production

### Build Frontend

```bash
cd frontend
npm run build
```

This creates optimized production files in `frontend/dist/`

### Deploy Backend

Set environment variables:
```bash
export NODE_ENV=production
export PORT=5000
```

Start server:
```bash
cd backend
npm start
```

### Database

For production:
1. Replace plain-text passwords with bcrypt hashing
2. Add input sanitization
3. Implement proper session management
4. Add database backups

---

## 🔒 Security Notes

⚠️ **IMPORTANT**: This is a demo application with simplified security:

- ❌ Passwords stored in plain text (NOT production-ready!)
- ❌ No session management or JWT
- ❌ No HTTPS enforcement
- ❌ No rate limiting

**For production, implement:**
- ✅ Password hashing (bcrypt/argon2)
- ✅ Secure session management or JWT
- ✅ HTTPS/TLS encryption
- ✅ Input sanitization and validation
- ✅ Rate limiting and CSRF protection
- ✅ Security headers

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Run `npm install` in backend directory
- Check database file permissions

### Frontend won't start
- Ensure port 3000 is not in use
- Run `npm install` in frontend directory
- Clear Vite cache: `rm -rf node_modules/.vite`

### Cypress tests failing
- Ensure both servers are running (ports 5000 and 3000)
- Verify database is seeded: `cd backend && npm run seed`
- Clear browser cache in Cypress

### Database errors
- Delete `ecommerce.db` and re-run seed
- Check SQLite3 is installed properly

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Saran Kumar**
- GitHub: [@mvsaran](https://github.com/mvsaran)
- LinkedIn: [www.linkedin.com/in/saran-kumar-a69775215]
- Email: mvsarankumar@gmail.com

---

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Cypress Team** - For the powerful testing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Unsplash** - For product images
- **Community** - For inspiration and support

---

## 📈 Project Stats

![GitHub Stats](https://img.shields.io/github/stars/yourusername/ecommerce-app?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/ecommerce-app?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/ecommerce-app)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/ecommerce-app)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by developers, for developers

**[⬆ Back to Top](#-e-commerce-web-application-with-cypress-testing)**

</div>
