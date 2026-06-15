# E-commerce EuroStarDany API

## Description

This is an in-memory e-commerce REST API built with JavaScript and Express. It supports user registration, login with JWT authentication, checkout with payment rules, and a healthcheck endpoint.

## Installation

1. Install Node.js (version 16 or newer recommended).
2. Run:

```bash
npm install
```

## How to Run

```bash
npm start
```

The API will run on `http://localhost:3000` by default.

## Rules

- The API has four endpoints: `login`, `register`, `checkout`, and `healthcheck`.
- Checkout accepts only `cash` or `credit_card`.
- Payment with `cash` gives a 10% discount.
- Only authenticated users can perform checkout.
- Everything runs in memory; no database is used.

## Existent Data

### Users

- `alice@example.com` / `password1`
- `bob@example.com` / `password2`
- `charlie@example.com` / `password3`

### Products

- `1`: Wireless Headphones — 120.0 EUR
- `2`: Smart Watch — 80.0 EUR
- `3`: Coffee Mug — 12.5 EUR

## How to Use the Rest API

### Register

POST `/api/register`

Body:

```json
{
  "name": "Daniel",
  "email": "daniel@example.com",
  "password": "secret123"
}
```

### Login

POST `/api/login`

Body:

```json
{
  "email": "alice@example.com",
  "password": "password1"
}
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

### Checkout

POST `/api/checkout`

Headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

Body:

```json
{
  "paymentMethod": "cash",
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 3, "quantity": 2 }
  ]
}
```

### Healthcheck

GET `/api/healthcheck`

Response:

```json
{
  "status": "ok",
  "message": "E-commerce API is running"
}
```
