import express from 'express';
import { runQuery } from '../database/db.js';

const router = express.Router();

// POST /api/cart/checkout
router.post('/checkout', async (req, res) => {
    try {
        const { userId, cartItems, customerInfo, totalAmount } = req.body;

        // Validate input
        if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid checkout data'
            });
        }

        // Insert order
        const orderResult = await runQuery(
            `INSERT INTO orders (user_id, total_amount) VALUES (?, ?)`,
            [userId, totalAmount]
        );

        const orderId = orderResult.lastID;

        // Insert order items
        for (const item of cartItems) {
            await runQuery(
                `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
                [orderId, item.id, item.quantity, item.price]
            );
        }

        res.json({
            success: true,
            orderId,
            message: 'Order placed successfully'
        });

    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during checkout'
        });
    }
});

export default router;
