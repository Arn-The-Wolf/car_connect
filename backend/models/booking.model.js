import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'expired'], default: 'pending' },
  expiresAt: { type: Date, required: true },
  notes: { type: String, default: '' }
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking

