const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/** In-memory mock storage. Replace with a real DB later. */
let vehicles = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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

app.get('/api/vehicles', (req, res) => {
  const { make } = req.query;
  let data = vehicles;
  if (make) {
    const lower = String(make).toLowerCase();
    data = data.filter(v => (v.make || '').toLowerCase().includes(lower));
  }
  res.json(data);
});

app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Not found' });
  res.json(vehicle);
});

app.post('/api/vehicles', (req, res) => {
  const body = req.body || {};
  if (!body.name || !body.year || !body.price) {
    return res.status(400).json({ message: 'name, year, price are required' });
  }
  const newVehicle = {
    id: String(Date.now()),
    name: body.name,
    year: Number(body.year),
    subtitle: body.subtitle || '',
    image: body.image || '',
    price: Number(body.price),
    mileage: Number(body.mileage || 0),
    fuelType: body.fuelType || 'Petrol',
    transmission: body.transmission || 'Automatic',
    badge: body.badge,
    make: body.make || '',
  };
  vehicles.unshift(newVehicle);
  res.status(201).json(newVehicle);
});

app.put('/api/vehicles/:id', (req, res) => {
  const idx = vehicles.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const existing = vehicles[idx];
  const body = req.body || {};
  const updated = {
    ...existing,
    ...body,
    year: body.year !== undefined ? Number(body.year) : existing.year,
    price: body.price !== undefined ? Number(body.price) : existing.price,
    mileage: body.mileage !== undefined ? Number(body.mileage) : existing.mileage,
  };
  vehicles[idx] = updated;
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});


