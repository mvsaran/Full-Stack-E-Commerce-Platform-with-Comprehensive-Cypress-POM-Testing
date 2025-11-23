import express from 'express';
import { getAll } from '../database/db.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        let products;
        if (category) {
            // Filter by category
            products = await getAll('SELECT * FROM products WHERE category = ?', [category]);
        } else {
            // Get all products
            products = await getAll('SELECT * FROM products');
        }

        res.json({
            success: true,
            products
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching products'
        });
    }
});

export default router;
