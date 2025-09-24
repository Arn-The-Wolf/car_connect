import Car from '../models/car.model.js'

export const createCar = async (req, res) => {
  try {
    const { images, primaryImage, ...rest } = req.body
    const data = { ...rest, owner: req.user._id }

    if (Array.isArray(images) && images.length > 0) {
      data.images = images
    }

    if (primaryImage) {
      data.primaryImage = primaryImage
    } else if (Array.isArray(images) && images.length > 0) {
      data.primaryImage = images[0]
    }

    const car = await Car.create(data)
    res.status(201).json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create car', error: error.message })
  }
}

export const getCars = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, status, sellEnabled, rentEnabled, condition } = req.query
    const filter = {}
    if (q) {
      filter.$or = [
        { make: new RegExp(q, 'i') },
        { model: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ]
    }
    if (status) {
      filter.status = status
    }
    if (typeof sellEnabled !== 'undefined') {
      filter.sellEnabled = sellEnabled === 'true'
    }
    if (typeof rentEnabled !== 'undefined') {
      filter.rentEnabled = rentEnabled === 'true'
    }
    if (condition) {
      filter.condition = condition
    }
    const cars = await Car.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('owner', 'fullname email')
    const count = await Car.countDocuments(filter)
    res.json({ items: cars, total: count, page: Number(page), limit: Number(limit) })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars' })
  }
}

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', 'fullname email')
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (error) {
    res.status(404).json({ message: 'Car not found' })
  }
}

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    const isOwner = car.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })

    const updates = { ...req.body }
    if (car.status === 'sold') {
      delete updates.status
    }
    Object.assign(car, updates)
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update car' })
  }
}

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    const isOwner = car.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })

    await car.deleteOne()
    res.json({ message: 'Car deleted' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete car' })
  }
}

export const listMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id }).sort({ createdAt: -1 })
    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars' })
  }
}

export const reorderImages = async (req, res) => {
  try {
    const { id } = req.params
    const { images } = req.body // full ordered array
    if (!Array.isArray(images)) return res.status(400).json({ message: 'images must be array' })
    const car = await Car.findById(id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    const isOwner = car.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })
    const setOld = new Set(car.images || [])
    const setNew = new Set(images)
    if (setOld.size !== setNew.size || [...setOld].some(u => !setNew.has(u))) {
      return res.status(400).json({ message: 'images must contain same URLs as existing' })
    }
    car.images = images
    if (!images.includes(car.primaryImage)) car.primaryImage = images[0] || ''
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to reorder images' })
  }
}

export const setPrimaryImage = async (req, res) => {
  try {
    const { id } = req.params
    const { imageUrl } = req.body
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl is required' })
    const car = await Car.findById(id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    const isOwner = car.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' })
    if (!(car.images || []).includes(imageUrl)) return res.status(400).json({ message: 'imageUrl must be one of the car images' })
    car.primaryImage = imageUrl
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to set primary image' })
  }
}

export const addCarImages = async (req, res) => {
  try {
    const { id } = req.params
    const { images } = req.body // array of cloudinary URLs
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'images must be a non-empty array' })
    }
    const car = await Car.findById(id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
    car.images = [...(car.images || []), ...images]
    if (!car.primaryImage && car.images.length > 0) {
      car.primaryImage = car.images[0]
    }
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to add images' })
  }
}

export const removeCarImage = async (req, res) => {
  try {
    const { id } = req.params
    const { imageUrl } = req.body
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl is required' })
    const car = await Car.findById(id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
    car.images = (car.images || []).filter(u => u !== imageUrl)
    if (car.primaryImage === imageUrl) {
      car.primaryImage = car.images[0] || ''
    }
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: 'Failed to remove image' })
  }
}

