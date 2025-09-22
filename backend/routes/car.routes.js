import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { createCar, getCars, getCarById, updateCar, deleteCar, addCarImages, removeCarImage, setPrimaryImage, listMyCars, reorderImages } from '../controllers/car.controllers.js'

const router = express.Router()

router.get('/', getCars)
router.get('/:id', getCarById)
router.get('/me/mine', protect, listMyCars)
router.post('/', protect, createCar)
router.put('/:id', protect, updateCar)
router.delete('/:id', protect, deleteCar)
router.post('/:id/images', protect, addCarImages)
router.delete('/:id/images', protect, removeCarImage)
router.post('/:id/primary-image', protect, setPrimaryImage)
router.post('/:id/images/reorder', protect, reorderImages)

export default router

