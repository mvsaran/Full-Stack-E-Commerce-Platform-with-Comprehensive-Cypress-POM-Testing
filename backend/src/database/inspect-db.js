import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../ecommerce.db');

console.log('\n📊 DATABASE INSPECTION TOOL\n');
console.log('='.repeat(60));
console.log(`Database: ${dbPath}\n`);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
});

function runQuery(title, sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(`❌ Error querying ${title}:`, err);
                reject(err);
            } else {
                console.log(`\n📋 ${title.toUpperCase()} (${rows.length} records)`);
                console.log('-'.repeat(60));
                if (rows.length > 0) {
                    console.table(rows);
                } else {
                    console.log('  (No records found)');
                }
                resolve(rows);
            }
        });
    });
}

async function inspectDatabase() {
    try {
        // Users
        await runQuery('Users', 'SELECT * FROM users');

        // Products (limited columns for readability)
        await runQuery('Products',
            'SELECT id, name, price, category, stock FROM products'
        );

        // Orders
        await runQuery('Orders',
            'SELECT * FROM orders ORDER BY created_at DESC'
        );

        // Order Items with product names
        await runQuery('Order Items',
            `SELECT 
        oi.id,
        oi.order_id,
        p.name as product_name,
        oi.quantity,
        oi.price,
        (oi.quantity * oi.price) as total
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      ORDER BY oi.order_id DESC`
        );

        // Summary
        console.log('\n📊 SUMMARY');
        console.log('='.repeat(60));

        db.get('SELECT COUNT(*) as count FROM users', [], (err, row) => {
            if (!err) console.log(`  Users:       ${row.count}`);
        });

        db.get('SELECT COUNT(*) as count FROM products', [], (err, row) => {
            if (!err) console.log(`  Products:    ${row.count}`);
        });

        db.get('SELECT COUNT(*) as count FROM orders', [], (err, row) => {
            if (!err) console.log(`  Orders:      ${row.count}`);
        });

        db.get('SELECT COUNT(*) as count FROM order_items', [], (err, row) => {
            if (!err) console.log(`  Order Items: ${row.count}`);

            // Close and exit after last query
            setTimeout(() => {
                db.close();
                console.log('\n✅ Database inspection complete!\n');
                process.exit(0);
            }, 100);
        });

    } catch (error) {
        console.error('\n❌ Error during inspection:', error);
        db.close();
        process.exit(1);
    }
}

inspectDatabase();
