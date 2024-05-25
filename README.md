# Restaurant API

This is a simple RESTful API for a restaurant application. It includes endpoints for managing menu items, reservations, and orders.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node server.js` to start the server

## Endpoints

### Menu Items

- GET /api/menuItems
- POST /api/menuItems
- GET /api/menuItems/:id
- PUT /api/menuItems/:id
- DELETE /api/menuItems/:id

### Reservations

- GET /api/reservations
- POST /api/reservations
- GET /api/reservations/:id
- PUT /api/reservations/:id
- DELETE /api/reservations/:id

### Orders

- GET /api/orders
- POST /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id
- DELETE /api/orders/:id

## Middleware

- Custom middleware for logging requests
- Custom middleware for validating menu item data
- Error-handling middleware

## Views

- EJS template for displaying menu items and creating new menu items

## Static Files

- CSS for styling the views

## License

MIT
