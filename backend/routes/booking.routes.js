import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { createBooking, confirmBooking, cancelBooking, listMyBookings, listBookingsAdmin, getBookingById } from '../controllers/booking.controllers.js'
import { requireAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', protect, createBooking)
router.post('/:id/confirm', protect, confirmBooking)
router.post('/:id/cancel', protect, cancelBooking)
router.get('/me', protect, listMyBookings)
router.get('/', protect, requireAdmin, listBookingsAdmin)
router.get('/:id', protect, getBookingById)

export default router

