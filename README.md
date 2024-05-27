# Restaurant API

This is a simple RESTful API for a restaurant application. It includes endpoints for managing menus, orders, and users.

## Requirements

- Node.js
- npm
-express
-body-parser
-ejs
-view engime
-router

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node server.js` to start the server
6. edit package.json

## homepage is linked to index.ejs
-api/menus/addMenu
- after submit buttom it posts directly on api/menus

### Menu

- GET /api/menus
- POST /api/menus
- GET /api/menus/:id
- PUT /api/menus/:id
- DELETE /api/menus/:id

### users

- GET /api/users
- POST /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

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

