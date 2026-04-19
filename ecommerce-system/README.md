# StoreX - Full Stack E-commerce Management System

A complete, resume-ready modern e-commerce solution built with a Node.js/Express backend and HTML/Tailwind frontend. Features product browsing, a real-time cart system, secure checkout, and a comprehensive Admin Dashboard to manage products and fulfill orders.

## 🚀 Features

### User Storefront
- **Product Browsing**: Fetches products securely from REST API using asynchronous Javascript.
- **Cart System**: Client-side state managed shopping cart to easily adjust quantities and add/remove products.
- **Responsive UI**: Built with utility-first Tailwind CSS ensuring excellent mobile & desktop behavior.
- **Checkout Flow**: Simple checkout capturing customer details and converting carts into database records securely.

### Admin Dashboard
- **Layout**: Clean dashboard structure separate from the user application.
- **Order Management**: Real-time population of placed orders, including features to quickly mutate order states (`Pending`, `Shipped`, `Delivered`).
- **Product Management**: Full CRUD capabilities allowing admins to dynamically add new products, edit pricing/categories, and delete inventory resulting in an immediate update to the live storefront.

## 🧱 Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS (via CDN)
- **Backend / API**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Cross-Origin**: CORS enabled for separated client/server architecture.

## 🛠 Setup Instructions

### 1. Database Setup
Please ensure you have a running instance of MongoDB locally (default: `mongodb://localhost:27017/ecommerce`) or via a MongoDB Atlas cloud URI.

### 2. Backend Installation
```bash
# Navigate to the ecommerce-system directory
cd server

# Install dependencies
npm install

# Start the Node.js Express server
npm run server
```

### 3. Frontend Execution
This is a cleanly decoupled application. You can simply open `client/index.html` in your favorite web browser (or serve it via a live server extension like VSCode Live Server) to begin browsing the store. For administration, launch `client/admin.html`.

## 🌐 API Documentation

The REST APIs are mounted under `/api` running on port 5000:

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Retrieve an array of all products. |
| **POST** | `/api/products` | Add a new product to the database. |
| **PUT** | `/api/products/:id` | Update an existing product by MongoDB ID. |
| **DELETE** | `/api/products/:id` | Drop a product dynamically. |
| **GET** | `/api/orders` | Fetch comprehensive list of established orders. |
| **POST** | `/api/orders` | Push a new order structure (checkout). |
| **PUT** | `/api/orders/:id` | Modify order status (Admin operation). |

## 🌍 Deployment Guide

This project is separated natively to allow isolated hosting of the frontend and backend. 

*   **Frontend (Client)**: Drag and drop the `client/` folder directly into **Vercel** or **Netlify**. Since it uses pure HTML/JS it will instantly deploy globally. Ensure you update `API_URL` to point to your live backend domain inside `script.js` and `admin.js`.
*   **Backend (Server)**: Upload the repository to GitHub and connect it to a free-tier hosting provider like **Render** or **Railway**. Define a start command `node server/server.js`.
*   **Database**: Utilize **MongoDB Atlas** for clustered cloud data storage. Make sure to define the `MONGO_URI` environment variable in your Render/Railway backend configuration.
