import Booking from '../models/booking.model.js'
import Car from '../models/car.model.js'

const RESERVATION_MINUTES = 30

export const createBooking = async (req, res) => {
  try {
    const { carId, notes } = req.body
    const car = await Car.findById(carId)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (car.status !== 'available') return res.status(400).json({ message: 'Car not available' })

    const expiresAt = new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000)
    const booking = await Booking.create({ car: car._id, user: req.user._id, status: 'pending', expiresAt, notes })

    car.status = 'reserved'
    car.reservedUntil = expiresAt
    car.reservedBy = req.user._id
    await car.save()

    res.status(201).json(booking)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create booking' })
  }
}

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' })
    if (booking.status !== 'pending') return res.status(400).json({ message: 'Cannot confirm booking' })
    if (booking.expiresAt.getTime() <= Date.now()) {
      booking.status = 'expired'
      await booking.save()
      return res.status(400).json({ message: 'Booking expired' })
    }
    booking.status = 'confirmed'
    await booking.save()
    res.json(booking)
  } catch (error) {
    res.status(400).json({ message: 'Failed to confirm booking' })
  }
}

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    const isOwner = booking.user.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })

    booking.status = 'cancelled'
    await booking.save()

    const car = await Car.findById(booking.car)
    if (car && car.status === 'reserved' && car.reservedBy?.toString() === booking.user.toString()) {
      car.status = 'available'
      car.reservedBy = undefined
      car.reservedUntil = undefined
      await car.save()
    }

    res.json({ message: 'Booking cancelled' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to cancel booking' })
  }
}

export const listMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('car')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

export const listBookingsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = {}
    if (status) filter.status = status
    const items = await Booking.find(filter).populate('car user', 'make model year fullname email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
    const total = await Booking.countDocuments(filter)
    res.json({ items, total, page: Number(page), limit: Number(limit) })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user', 'make model year fullname email')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    const isOwner = booking.user._id.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })
    res.json(booking)
  } catch (error) {
    res.status(404).json({ message: 'Booking not found' })
  }
}


