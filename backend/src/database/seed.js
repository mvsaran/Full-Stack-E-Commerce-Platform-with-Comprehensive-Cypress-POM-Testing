import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSQL, runQuery } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seed() {
    console.log('🌱 Starting database seeding...');

    try {
        // Read and execute schema
        const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
        await execSQL(schema);
        console.log('✅ Schema created successfully');

        // Insert demo users
        // NOTE: PLAIN TEXT PASSWORDS - NOT FOR PRODUCTION!
        const users = [
            { name: 'John Doe', email: 'john@example.com', password: 'password123' },
            { name: 'Jane Smith', email: 'jane@example.com', password: 'password456' }
        ];

        for (const user of users) {
            await runQuery(
                'INSERT OR IGNORE INTO users (name, email, password) VALUES (?, ?, ?)',
                [user.name, user.email, user.password]
            );
        }
        console.log(`✅ Inserted ${users.length} demo users`);

        // Insert demo products
        const products = [
            // Electronics
            {
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
                price: 199.99,
                image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                category: 'Electronics',
                stock: 25
            },
            {
                name: 'Smart Watch',
                description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
                price: 299.99,
                image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                category: 'Electronics',
                stock: 15
            },
            {
                name: 'Laptop Stand',
                description: 'Ergonomic aluminum laptop stand with adjustable height',
                price: 49.99,
                image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                category: 'Electronics',
                stock: 40
            },
            {
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking',
                price: 29.99,
                image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
                category: 'Electronics',
                stock: 50
            },
            // Clothing
            {
                name: 'Classic T-Shirt',
                description: '100% cotton premium quality t-shirt',
                price: 24.99,
                image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                category: 'Clothing',
                stock: 100
            },
            {
                name: 'Denim Jeans',
                description: 'Comfortable slim-fit denim jeans',
                price: 59.99,
                image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
                category: 'Clothing',
                stock: 60
            },
            {
                name: 'Running Shoes',
                description: 'Lightweight running shoes with cushioned sole',
                price: 89.99,
                image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                category: 'Clothing',
                stock: 35
            },
            {
                name: 'Hoodie',
                description: 'Warm and comfortable pullover hoodie',
                price: 44.99,
                image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
                category: 'Clothing',
                stock: 45
            },
            // Home
            {
                name: 'Coffee Maker',
                description: 'Programmable coffee maker with thermal carafe',
                price: 79.99,
                image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
                category: 'Home',
                stock: 20
            },
            {
                name: 'Desk Lamp',
                description: 'LED desk lamp with adjustable brightness',
                price: 39.99,
                image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
                category: 'Home',
                stock: 30
            },
            {
                name: 'Throw Pillow',
                description: 'Decorative throw pillow with soft cover',
                price: 19.99,
                image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
                category: 'Home',
                stock: 80
            },
            {
                name: 'Wall Clock',
                description: 'Modern minimalist wall clock',
                price: 34.99,
                image_url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',
                category: 'Home',
                stock: 25
            }
        ];

        for (const product of products) {
            await runQuery(
                `INSERT OR IGNORE INTO products (name, description, price, image_url, category, stock)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [product.name, product.description, product.price, product.image_url, product.category, product.stock]
            );
        }
        console.log(`✅ Inserted ${products.length} demo products`);

        console.log('🎉 Database seeding completed!');
        console.log('\n📝 Demo credentials:');
        console.log('   Email: john@example.com');
        console.log('   Password: password123');
        console.log('\n   Email: jane@example.com');
        console.log('   Password: password456');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
