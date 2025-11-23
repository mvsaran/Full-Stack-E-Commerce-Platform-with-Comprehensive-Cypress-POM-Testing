# ⚡ Quick Reference Guide

## 🚀 Quick Start (3 Commands)

```bash
# 1. Seed database
cd backend && npm run seed

# 2. Start backend (new terminal)
cd backend && npm start

# 3. Start frontend (new terminal)
cd frontend && npm run dev
```

Then open: **http://localhost:3000**

---

## 📦 Installation Commands

```bash
# Install all dependencies
cd backend && npm install
cd ../frontend && npm install
cd .. && npm install
```

---

## 🎮 Running the App

| Command | Purpose | URL |
|---------|---------|-----|
| `cd backend && npm start` | Start backend | http://localhost:5000 |
| `cd frontend && npm run dev` | Start frontend | http://localhost:3000 |

---

## 🧪 Testing Commands

| Command | Purpose |
|---------|---------|
| `npm run cy:open` | Open Cypress UI |
| `npm run cy:run` | Run all tests headless |
| `npx cypress run --spec "cypress/e2e/*.spec.js"` | Run E2E tests only |
| `npx cypress run --spec "cypress/e2e/api/**/*.js"` | Run API tests only |
| `npx cypress run --spec "cypress/e2e/login.spec.js"` | Run specific test |

---

## 📊 Database Commands

| Command | Purpose |
|---------|---------|
| `cd backend && npm run seed` | Seed database |
| `cd backend && npm run inspect-db` | View database contents |

---

## 👤 Demo Credentials

**Email:** `john@example.com`  
**Password:** `password123`

---

## 📁 Key Files

```
backend/
  src/server.js          # Express server
  src/database/seed.js   # Database seeding
  
frontend/
  src/App.jsx            # Main app
  src/pages/             # All pages
  
cypress/
  e2e/                   # Test files
  page-objects/          # Page objects
```

---

## 🔧 Useful Scripts

```bash
# Reset database
cd backend
rm ecommerce.db
npm run seed

# View all test files
ls cypress/e2e/

# Check if servers are running
curl http://localhost:5000/health
curl http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Login |
| GET | `/api/products` | Get products |
| GET | `/api/products?category=Electronics` | Filter products |
| POST | `/api/cart/checkout` | Create order |
| GET | `/api/orders/:id` | Get order |

---

## 📋 Common Tasks

### View Database
```bash
cd backend
npm run inspect-db
```

### Run Single Test
```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
```

### Check Test Count
```bash
# E2E tests
ls cypress/e2e/*.spec.js | wc -l

# API tests  
ls cypress/e2e/api/*.spec.js | wc -l
```

### Verify Setup
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check if database exists
ls backend/ecommerce.db
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process: `npx kill-port 3000 5000` |
| Tests failing | Ensure both servers running |
| Database errors | Delete & reseed: `rm ecommerce.db && npm run seed` |
| Frontend won't start | Clear cache: `rm -rf node_modules/.vite` |

---

## 📊 Test Summary

```
Total Tests: 47
├── E2E: 12 tests
│   ├── Login (4)
│   ├── Products (4)
│   └── Checkout (4)
└── API: 35 tests
    ├── Auth (7)
    ├── Products (10)
    ├── Checkout (8)
    └── Orders (10)
```

---

## 🎯 Project Stats

- **Files:** 38+
- **Lines of Code:** 3,000+
- **Tests:** 47
- **Test Pass Rate:** 100%
- **Endpoints:** 4
- **Pages:** 5

---

## 📚 Documentation

- `README.md` - Main documentation
- `DATABASE_TESTING.md` - Database guide
- `API_TESTING_GUIDE.md` - API testing
- `CONTRIBUTING.md` - Contributing
- `PROJECT_SUMMARY.md` - Project summary

---

**Need more help?** Check the full `README.md` file!
