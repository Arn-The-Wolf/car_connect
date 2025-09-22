import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['initiated', 'paid', 'cancelled'], default: 'initiated' },
  paymentRef: { type: String },
  stripeSessionId: { type: String },
  stripePaymentIntentId: { type: String },
  notes: { type: String, default: '' }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order

