import User from '../models/user.model.js'

export const listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, q } = req.query
    const filter = {}
    if (q) {
      filter.$or = [
        { fullname: new RegExp(q, 'i') },
        { email: new RegExp(q, 'i') }
      ]
    }
    const users = await User.find(filter)
      .select('-password -otpCode -otpExpiresAt')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
    const count = await User.countDocuments(filter)
    res.json({ items: users, total: count, page: Number(page), limit: Number(limit) })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' })
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password -otpCode -otpExpiresAt')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user role' })
  }
}


