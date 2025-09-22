import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ message: 'Not authenticated' })

    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return res.status(401).json({ message: 'User not found' })

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
  next()
}


