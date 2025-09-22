import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { createOrder, payOrder, listMyOrders, createCheckoutSession, getOrderById, listOrdersAdmin, cancelOrder } from '../controllers/order.controllers.js'
import { requireAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.post('/checkout', protect, createCheckoutSession)
router.post('/:id/pay', protect, payOrder)
router.get('/:id', protect, getOrderById)
router.get('/', protect, requireAdmin, listOrdersAdmin)
router.post('/:id/cancel', protect, cancelOrder)
router.get('/me', protect, listMyOrders)

export default router

