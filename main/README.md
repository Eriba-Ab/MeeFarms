# MEE FARMS - E-Commerce & Agribusiness Platform

MEE FARMS is an integrated agribusiness company addressing food insecurities through crop and livestock farming, agro-inputs distribution, and farmer empowerment in Nigeria.

This repository contains the full-stack web application for MEE FARMS, providing an e-commerce platform for users to shop for agricultural products, and an admin dashboard for managing products and orders.

## Project Structure

The project is structured as a monorepo containing two main parts:

- `main/`: The frontend application built with React, Vite, Tailwind CSS, and shadcn/ui.
- `server/`: The backend REST API built with Node.js, Express, and MongoDB.

## Features

### Frontend (User & Admin)
- **User Authentication**: Login, Register, and secure routing.
- **E-Commerce**: Browse products, view product details, add to cart, and checkout.
- **Admin Dashboard**: Manage products (add/edit) and view/manage customer orders.
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components.
- **State Management**: React Query for data fetching and React Context for local state (Auth, Cart).

### Backend (API)
- **RESTful Endpoints**: Dedicated routes for users, products, and orders.
- **Authentication**: JWT-based secure authentication mechanism.
- **Database**: MongoDB integration via Mongoose for flexible data modeling.
- **File Uploads**: Image uploads using Multer.

## Tech Stack

**Frontend (`main/`)**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- React Query (TanStack Query)
- Axios
- React Hook Form + Zod

**Backend (`server/`)**
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Multer

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```sh
   cd main
   npm install
   ```
3. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```

### Configuration

Create a `.env` file in the `server/` directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application Locally

You can run both the frontend and backend servers simultaneously.

**Start the Backend Server:**
```sh
cd server
npm run dev
```
The server will typically start on `http://localhost:5000`.

**Start the Frontend Development Server:**
```sh
cd main
npm run dev
```
The frontend application will start (usually on `http://localhost:5173`) with auto-reloading enabled.

## Available Scripts

### Frontend (`main/package.json`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run preview`: Previews the production build locally.

### Backend (`server/package.json`)
- `npm run dev`: Starts the server in development mode using `ts-node-dev`.
- `npm run build`: Compiles TypeScript code to JavaScript.
- `npm run start`: Runs the compiled JavaScript application.
- `npm run seed`: Runs the database seeder script.

## License

This project is proprietary and confidential to MEE FARMS.
