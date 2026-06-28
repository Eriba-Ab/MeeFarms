import express from 'express';
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Public route - create order (guest checkout)
router.post('/', createOrder);

// Protected routes - user orders
router.get('/my-orders', protect, getUserOrders);
router.get('/:id', getOrderById);

// Admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
