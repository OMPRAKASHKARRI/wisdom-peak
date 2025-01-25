# CRM Backend System

A robust backend system for managing customer relationships, built with Node.js, Express, and Supabase.

## Features

- User Authentication (JWT-based)
- Customer Management (CRUD operations)
- Customer Interactions Logging
- Search and Filtering
- Pagination
- API Documentation (Swagger)
- Role-based Access Control
- Data Validation
- Error Handling

## Prerequisites

- Node.js (v14 or higher)
- Supabase account
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Supabase credentials and JWT secret:
   ```bash
   cp .env.example .env
   ```
4. Connect to Supabase and run the migrations
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Customers
- GET /api/customers - Get all customers (with pagination and search)
- POST /api/customers - Create a new customer
- GET /api/customers/:id - Get customer by ID
- PUT /api/customers/:id - Update customer
- DELETE /api/customers/:id - Delete customer

### Interactions
- POST /api/interactions - Create a new interaction
- GET /api/interactions/customer/:customerId - Get interactions for a customer

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- Row Level Security with Supabase
- Protected routes
- Proper error handling

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error