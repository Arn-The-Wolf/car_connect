import express from 'express'
import { login, register, logout, me, verifyOtp } from '../controllers/auth.controllers.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/logout', protect, logout)
router.get('/me', protect, me)

export default router
