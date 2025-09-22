import Order from '../models/order.model.js'
import Car from '../models/car.model.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export const createOrder = async (req, res) => {
  try {
    const { carId, amount, notes } = req.body
    const car = await Car.findById(carId)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (car.status === 'sold') return res.status(400).json({ message: 'Car already sold' })
    if (car.status === 'reserved' && car.reservedBy?.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'Car reserved by another user' })
    }
    const order = await Order.create({ car: car._id, buyer: req.user._id, amount, notes })
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order' })
  }
}

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId, successUrl, cancelUrl } = req.body
    const order = await Order.findById(orderId).populate('car')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.buyer.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' })
    if (order.status !== 'initiated') return res.status(400).json({ message: 'Invalid order status' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `${order.car.make} ${order.car.model} ${order.car.year}` },
            unit_amount: Math.round(order.amount * 100)
          },
          quantity: 1
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { orderId: order._id.toString(), carId: order.car._id.toString() }
    })

    order.stripeSessionId = session.id
    await order.save()

    res.json({ id: session.id, url: session.url })
  } catch (error) {
    res.status(400).json({ message: 'Failed to create checkout session', error: error.message })
  }
}

export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('car')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.buyer.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' })
    if (order.status !== 'initiated') return res.status(400).json({ message: 'Invalid order status' })

    const { paymentRef } = req.body
    order.paymentRef = paymentRef || `PAY-${Date.now()}`
    order.status = 'paid'
    await order.save()

    const car = await Car.findById(order.car)
    car.status = 'sold'
    car.reservedBy = undefined
    car.reservedUntil = undefined
    await car.save()

    res.json(order)
  } catch (error) {
    res.status(400).json({ message: 'Failed to complete payment' })
  }
}

export const listMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).populate('car')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
}

export const listOrdersAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = {}
    if (status) filter.status = status
    const items = await Order.find(filter).populate('car buyer', 'make model year fullname email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
    const total = await Order.countDocuments(filter)
    res.json({ items, total, page: Number(page), limit: Number(limit) })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    const isBuyer = order.buyer.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isBuyer && !isAdmin) return res.status(403).json({ message: 'Forbidden' })
    if (order.status !== 'initiated') return res.status(400).json({ message: 'Cannot cancel this order' })
    order.status = 'cancelled'
    await order.save()
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: 'Failed to cancel order' })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('car')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    const isBuyer = order.buyer.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isBuyer && !isAdmin) return res.status(403).json({ message: 'Forbidden' })
    res.json(order)
  } catch (error) {
    res.status(404).json({ message: 'Order not found' })
  }
}


