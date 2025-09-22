import express from 'express'
import { protect, requireAdmin } from '../middlewares/auth.middleware.js'
import { listUsers, updateUserRole } from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/', protect, requireAdmin, listUsers)
router.put('/:id/role', protect, requireAdmin, updateUserRole)

export default router

