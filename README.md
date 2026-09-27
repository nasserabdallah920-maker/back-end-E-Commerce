# E-Commerce Backend

## Project Overview
This project is a complete backend for an E-Commerce application. It provides a RESTful API for managing users, products, categories, shopping carts, orders, coupons, and other core e-commerce features. The project is designed with scalability, maintainability, and security in mind.

## Features
- Authentication and Authorization using JWT and Cookies.
- Complete Product and Category Management.
- Shopping Cart and Order Management.
- Secure Payment Gateway Integration using Paymob.
- Coupon and Discount System.
- File and Image Uploads handling using Multer.
- Data validation using Zod.
- Centralized Error Handling.
- Enhanced Security (Helmet, CORS, Rate Limiting).
- API Documentation using Swagger.
- Automated Testing with Jest and Supertest.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & Cookie Parser
- **Password Hashing:** bcryptjs
- **Validation:** Zod
- **File Uploads:** Multer
- **Payment Gateway:** Paymob
- **Security:** Helmet, express-rate-limit, CORS
- **Testing:** Jest, Supertest
- **Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)

## Environment Variables

Create a `.env` file in the project root and add the following variables (you can use `.env.example` as a reference):

```env
SERVER_PORT=5000
DATABASE_URL=mongodb://localhost:27017/eCommerce
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
BCRYPT_SALT_ROUNDS=10
PAYMOB_BASE_URL=https://accept.paymob.com/api
PAYMOB_API_KEY=your_paymob_api_key
INTEGRATION_ID=your_integration_id
PAYMOB_IFRAME_ID=your_iframe_id
PAYMOB_HMAC_SECRET=your_paymob_hmac
SHIPPING_PRICE=50
CLIENT_URL=http://localhost:3000
```

## API Endpoints

Some of the main endpoints included in the project:

- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Authenticate a user.
- `GET /api/products` – Retrieve all products.
- `POST /api/orders` – Create a new order.
- `POST /api/payment/paymob/pay` – Initiate a Paymob payment session.
- `POST /api/payment/paymob/webhook` – Handle Paymob transaction webhooks.

> Full API documentation (Swagger) is available at `/api-docs` when running the server.

## Scripts
- `npm run server`: Run the application using nodemon (Development).
- `npm run test`: Run the automated test suite using Jest.

## Project Structure

```text
Back-end/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── docs/             # Swagger documentation files
│   ├── middlewares/      # Middleware (auth, validation, error handling, etc.)
│   ├── models/           # Mongoose models / Database schema
│   ├── repositories/     # Database access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── testing/          # Test files (Jest/Supertest)
│   ├── uploads/          # Directory for uploaded files/images
│   ├── utils/            # Utility functions and helpers
│   └── validators/       # Zod validation schemas
├── .env.example          # Environment variables example
├── app.js / main.js      # Application entry point
└── package.json          # Dependencies and scripts
```