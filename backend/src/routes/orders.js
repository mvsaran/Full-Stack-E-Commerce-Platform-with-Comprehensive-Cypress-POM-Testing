import express from 'express';
import { getOne, getAll } from '../database/db.js';

const router = express.Router();

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Get order details
        const order = await getOne('SELECT * FROM orders WHERE id = ?', [id]);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Get order items with product details
        const orderItems = await getAll(
            `SELECT 
        oi.*, 
        p.name as product_name,
        p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?`,
            [id]
        );

        res.json({
            success: true,
            order: {
                ...order,
                items: orderItems
            }
        });

    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching order'
        });
    }
});

export default router;
