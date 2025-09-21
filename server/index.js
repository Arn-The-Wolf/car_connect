const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  mileage: { type: Number, default: 0 },
  fuelType: { type: String, default: 'Petrol' },
  transmission: { type: String, default: 'Automatic' },
  badge: { type: String, default: '' },
  make: { type: String, default: '' },
  location: { type: String, default: '' },
  seats: { type: Number, default: 5 },
  condition: { type: String, default: 'Used' },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Seed data
const seedVehicles = async () => {
  const count = await Vehicle.countDocuments();
  if (count === 0) {
    const vehicles = [
      {
        name: 'Ford Transit',
        year: 2021,
        subtitle: '4.0 D5 PowerPulse Momentum 5dr AWD',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        price: 22000,
        mileage: 2500,
        fuelType: 'Diesel',
        transmission: 'Manual',
        badge: 'Great Price',
        make: 'Ford',
      },
      {
        name: 'New GLC',
        year: 2023,
        subtitle: '4.0 D5 PowerPulse Momentum 5dr AWD',
        image: 'https://images.unsplash.com/photo-1606016595464-d0b5c54a8f87?w=600&h=400&fit=crop',
        price: 95000,
        mileage: 50,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        badge: 'Low Mileage',
        make: 'Mercedes Benz',
      },
      {
        name: 'Audi A6 3.5',
        year: 2024,
        subtitle: '3.5 D5 PowerPulse Momentum 5dr AWD',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
        price: 58000,
        mileage: 100,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        make: 'Audi',
      },
      {
        name: 'Corolla Altis',
        year: 2023,
        subtitle: '3.5 D5 PowerPulse Momentum 5dr AWD',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
        price: 45000,
        mileage: 15000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        make: 'Toyota',
      },
    ];
    await Vehicle.insertMany(vehicles);
    console.log('Seeded initial vehicles');
  }
};

// Seed data on startup
seedVehicles();

// GET /api/vehicles - Get all vehicles with filtering and sorting
app.get('/api/vehicles', async (req, res) => {
  try {
    const { search, make, year, sort } = req.query;
    let query = {};

    // Build filter query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { make: { $regex: search, $options: 'i' } }
      ];
    }
    if (make) {
      query.make = { $regex: make, $options: 'i' };
    }
    if (year) {
      query.year = parseInt(year);
    }

    // Build sort query
    let sortQuery = { createdAt: -1 }; // Default: newest first
    if (sort) {
      switch (sort) {
        case 'price_low':
          sortQuery = { price: 1 };
          break;
        case 'price_high':
          sortQuery = { price: -1 };
          break;
        case 'year_new':
          sortQuery = { year: -1 };
          break;
        case 'mileage':
          sortQuery = { mileage: 1 };
          break;
        case 'newest':
        default:
          sortQuery = { createdAt: -1 };
      }
    }

    const vehicles = await Vehicle.find(query).sort(sortQuery);
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/vehicles/:id - Get single vehicle
app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/vehicles - Create new vehicle
app.post('/api/vehicles', async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/vehicles/:id - Update vehicle
app.put('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/vehicles/:id - Delete vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});