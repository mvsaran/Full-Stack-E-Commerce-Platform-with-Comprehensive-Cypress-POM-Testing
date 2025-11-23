# Database Testing & Verification Guide

## 🔍 How to Verify Data is Stored in the Database

This guide shows you multiple ways to verify that your login credentials, products, and orders are being stored correctly in the SQLite database.

---

## Method 1: Using the Database Inspector Script (Easiest)

I've created a custom script that shows you everything in your database.

### Run the Inspector:

```bash
cd backend
npm run inspect-db
```

### What You'll See:

```
📊 DATABASE INSPECTION TOOL
============================================================

📋 USERS (2 records)
------------------------------------------------------------
┌─────────┬────┬──────────────┬─────────────────────┬──────────────┐
│ (index) │ id │     name     │        email        │   password   │
├─────────┼────┼──────────────┼─────────────────────┼──────────────┤
│    0    │ 1  │  'John Doe'  │ 'john@example.com'  │ 'password123'│
│    1    │ 2  │ 'Jane Smith' │ 'jane@example.com'  │ 'password456'│
└─────────┴────┴──────────────┴─────────────────────┴──────────────┘

📋 PRODUCTS (12 records)
------------------------------------------------------------
[Shows all products with id, name, price, category, stock]

📋 ORDERS (X records)
------------------------------------------------------------
[Shows all orders placed through checkout]

📋 ORDER ITEMS (X records)
------------------------------------------------------------
[Shows individual items in each order]

📊 SUMMARY
============================================================
  Users:       2
  Products:    12
  Orders:      X
  Order Items: X
```

**Use this to:**
- ✅ Verify initial seed data loaded correctly
- ✅ Check new orders after completing checkout
- ✅ See order details with product names
- ✅ Monitor database growth

---

## Method 2: Direct SQL Queries

### Using Node.js REPL:

1. Open a new terminal in the backend directory
2. Start Node.js:
   ```bash
   node
   ```

3. Run these commands:

```javascript
// Load sqlite3
const sqlite3 = await import('sqlite3');
const db = new sqlite3.default.Database('./ecommerce.db');

// Query users
db.all('SELECT * FROM users', (err, rows) => {
  console.table(rows);
});

// Query orders with user info
db.all(`
  SELECT o.id, o.total_amount, u.name as user_name, o.created_at 
  FROM orders o 
  JOIN users u ON o.user_id = u.id
  ORDER BY o.created_at DESC
`, (err, rows) => {
  console.table(rows);
});

// Query latest order with items
db.all(`
  SELECT 
    oi.order_id,
    p.name as product_name,
    oi.quantity,
    oi.price,
    o.total_amount
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  JOIN orders o ON oi.order_id = o.id
  WHERE oi.order_id = (SELECT MAX(id) FROM orders)
`, (err, rows) => {
  console.table(rows);
});

// Close database when done
db.close();
```

---

## Method 3: Using DB Browser for SQLite (GUI Tool)

### Install DB Browser:
- **Windows**: Download from [sqlitebrowser.org](https://sqlitebrowser.org/dl/)
- **Mac**: `brew install --cask db-browser-for-sqlite`

### Steps:
1. Open DB Browser for SQLite
2. Click "Open Database"
3. Navigate to: `c:\Users\mvsar\Projects\Antigravity\ecommerce-app\backend\ecommerce.db`
4. Browse tables, run custom queries, export data

**Benefits:**
- Visual interface
- Write and save custom queries
- Export data to CSV/JSON
- See table relationships

---

## Method 4: Add Cypress Database Verification

You can add database checks directly in your Cypress tests!

### Create a Cypress Task:

**In `cypress.config.js`:**

```javascript
const { defineConfig } = require('cypress')
const sqlite3 = require('sqlite3')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,spec.js}',
    setupNodeEvents(on, config) {
      // Add database query task
      on('task', {
        queryDb({ query, params = [] }) {
          return new Promise((resolve, reject) => {
            const dbPath = path.join(__dirname, 'backend', 'ecommerce.db')
            const db = new sqlite3.Database(dbPath)
            
            db.all(query, params, (err, rows) => {
              db.close()
              if (err) reject(err)
              else resolve(rows)
            })
          })
        }
      })
    },
  },
})
```

### Use in Your Tests:

```javascript
it('should create order in database after checkout', () => {
  // ... complete checkout flow ...
  
  // Verify order was created in database
  cy.task('queryDb', {
    query: 'SELECT * FROM orders ORDER BY id DESC LIMIT 1'
  }).then((orders) => {
    expect(orders).to.have.length(1)
    expect(orders[0]).to.have.property('total_amount')
    cy.log('Latest order:', orders[0])
  })
  
  // Verify order items were created
  cy.task('queryDb', {
    query: 'SELECT * FROM order_items WHERE order_id = ?',
    params: [orders[0].id]
  }).then((items) => {
    expect(items.length).to.be.greaterThan(0)
    cy.log('Order items:', items)
  })
})
```

---

## Method 5: Watch Database in Real-Time

### Using `watch` to Monitor Changes:

**PowerShell:**
```powershell
while ($true) { 
  Clear-Host
  node -e "
    import('sqlite3').then(m => {
      const db = new m.default.Database('./ecommerce.db');
      db.get('SELECT COUNT(*) as count FROM orders', (e,r) => {
        console.log('Orders:', r.count);
      });
      db.get('SELECT COUNT(*) as count FROM order_items', (e,r) => {
        console.log('Order Items:', r.count);
        db.close();
      });
    })
  "
  Start-Sleep -Seconds 5
}
```

---

## 📊 Useful SQL Queries

### Check Latest Order:
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
```

### Get Order with Customer Name:
```sql
SELECT 
  o.id as order_id,
  u.name as customer_name,
  u.email,
  o.total_amount,
  o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;
```

### Get Complete Order Details:
```sql
SELECT 
  o.id as order_id,
  u.name as customer,
  p.name as product,
  oi.quantity,
  oi.price,
  (oi.quantity * oi.price) as line_total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 1;
```

### Check Product Stock:
```sql
SELECT name, stock FROM products WHERE stock < 20;
```

---

## 🧪 Testing Workflow

### After Placing an Order:

1. **Run the inspector:**
   ```bash
   cd backend
   npm run inspect-db
   ```

2. **Verify:**
   - ✅ Orders table has new entry
   - ✅ Order items table has product entries
   - ✅ Order ID matches what's shown in confirmation page
   - ✅ Total amount is correct
   - ✅ Created_at timestamp is recent

### During Development:

1. Keep inspector script handy
2. Run after each test checkout
3. Verify data integrity
4. Check for duplicate orders or missing items

---

## 🎯 Quick Test

**Try this now:**

1. Run the inspector:
   ```bash
   cd backend
   npm run inspect-db
   ```

2. Note the current order count

3. Complete a checkout in the app:
   - Login → Add products → Checkout → Place order

4. Run inspector again:
   ```bash
   npm run inspect-db
   ```

5. You should see:
   - Orders count increased by 1
   - New order items for your purchase
   - Correct total amount

---

## 📝 Database Location

Your SQLite database file is located at:
```
c:\Users\mvsar\Projects\Antigravity\ecommerce-app\backend\ecommerce.db
```

You can:
- ✅ Open it with any SQLite tool
- ✅ Copy it for backup
- ✅ Delete it and re-run `npm run seed` to start fresh
- ✅ Share it with others (it's just a file!)

---

## 🆘 Troubleshooting

**No orders showing?**
- Make sure you completed the checkout flow
- Check backend server logs for errors
- Verify API endpoint returned success

**Database file not found?**
- Run `npm run seed` first
- Check you're in the backend directory

**Old data still there?**
- Delete `ecommerce.db` file
- Run `npm run seed` again

---

**Recommended Method:** Use `npm run inspect-db` - it's the quickest and easiest way! 🚀
