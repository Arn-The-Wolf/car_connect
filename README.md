# PremiumCars - Luxury Car Marketplace

A sophisticated dark blue themed car marketplace built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication & Security
- Phone number + password authentication
- OTP verification system (6-digit codes)
- 5-minute OTP expiry with 60s resend cooldown
- Rate limiting and attempt tracking
- Secure session management

### Design & User Experience
- Dark blue premium theme with gradients
- Full-screen Toyota Land Cruiser hero section
- Premium brand showcase (Toyota, Porsche, BMW, Mercedes-Benz, etc.)
- Responsive design for all devices
- Smooth animations and hover effects
- SEO optimized

### Pages & Navigation
- ✅ Home page with hero section and brand cards
- ✅ Sign up / Sign in pages
- ✅ OTP verification flow
- ✅ Contact page with form
- ✅ Responsive navigation

### Upcoming Features (Requires Supabase)
- Car listings with advanced filtering
- Admin dashboard with real-time data
- User dashboard for orders/wishlist
- Add new car functionality
- Dynamic data management

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🎨 Design System

The app uses a comprehensive dark blue design system with:
- Semantic color tokens
- Custom gradients and shadows
- Responsive typography
- Smooth transitions and animations
- Premium brand aesthetics

## 🔧 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Authentication Flow

1. User enters phone number + password
2. System sends 6-digit OTP to phone
3. User verifies OTP within 5 minutes
4. Successful verification redirects to dashboard

## 🎯 Next Steps

To enable full functionality including car management, user dashboards, and real-time data:

1. Connect to Supabase backend
2. Set up database tables for cars, users, orders
3. Implement car listing and filtering
4. Create admin and user dashboards
5. Add car management functionality

## 📞 Contact

For questions or support, use the contact form in the app or reach out through the provided contact information.