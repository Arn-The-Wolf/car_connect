# CarHubConnect Backend

Backend API for car sales management: authentication with OTP, cars, bookings, orders, Stripe payments, and audit logging.

## Setup

1. Install Node.js 18+ - I work on Node 22, consider resolving concerned issues
2. Copy `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/carhubconnect_db
JWT_SECRET=change_me
CLIENT_URL=http://localhost:3000

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=app_password
MAIL_FROM=CarHubConnect <no-reply@carhubconnect.local>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. Install deps and run:

```
npm install
npm run dev
```

## Auth

- POST `/api/auth/register` { fullname, email, password }
- POST `/api/auth/login` { email, password } → sends OTP
- POST `/api/auth/verify-otp` { email, otp } → sets cookie
- POST `/api/auth/logout`
- GET `/api/auth/me`

## Users (admin)
- GET `/api/users` `?q=&page=&limit=`
- PUT `/api/users/:id/role` { role: user|admin }

## Cars
- GET `/api/cars` `?q=&status=available|reserved|sold`
- GET `/api/cars/:id`
- GET `/api/cars/me/mine` (auth)
- POST `/api/cars` (auth)
  - Body: core car fields; supports `images: [url]`, `primaryImage`
- PUT `/api/cars/:id` (owner/admin)
- DELETE `/api/cars/:id` (owner/admin)
- POST `/api/cars/:id/images` { images: [url] }
- DELETE `/api/cars/:id/images` { imageUrl }
- POST `/api/cars/:id/primary-image` { imageUrl }
- POST `/api/cars/:id/images/reorder` { images: [url] }

## Bookings
- POST `/api/bookings` { carId, notes? } → reserves car 30m
- POST `/api/bookings/:id/confirm`
- POST `/api/bookings/:id/cancel`
- GET `/api/bookings/me`
- GET `/api/bookings` (admin)
- GET `/api/bookings/:id` (owner/admin)

## Orders
- POST `/api/orders` { carId, amount, notes? }
- POST `/api/orders/checkout` { orderId, successUrl, cancelUrl }
- POST `/api/orders/:id/pay` (fallback/manual)
- POST `/api/orders/:id/cancel` (if initiated)
- GET `/api/orders/me`
- GET `/api/orders` (admin)
- GET `/api/orders/:id` (buyer/admin)

## Webhooks
- POST `/api/webhooks/stripe` (raw body) handles `checkout.session.completed`

## Audit Logging
- Request method, path, status, user, IP, UA stored in `AuditLog` collection.

## Notes
- Cookies are httpOnly; set `CLIENT_URL` for CORS
- Car status cannot be edited once sold; reservations respected
- Images stored as Cloudinary URLs only


