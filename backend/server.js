import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import carRoutes from './routes/car.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import orderRoutes from './routes/order.routes.js'
import webhookRoutes from './routes/webhook.routes.js'
import userRoutes from './routes/user.routes.js'
import { auditLogger } from './middlewares/audit.middleware.js'

dotenv.config()

const app = express()

// Webhooks must be mounted before json parser for raw body
app.use('/api/webhooks', webhookRoutes)

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}))

// Audit logging
app.use(auditLogger)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
