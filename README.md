# SNAPBUY E-Commerce Platform

SNAPBUY is a modern, full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It features a clean, user-friendly interface for shopping, order management, and admin controls.

## Features
- User authentication and profile management
- Product browsing, search, and filtering
- Shopping cart and order placement
- Admin dashboard for managing products, categories, users, and orders
- Responsive design for desktop and mobile

## Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB

## Live Demo

[SNAPBUY Live ](https://snapbuy-frontend-2wx7.onrender.com/)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/itaayush/snapbuy.git
cd snapbuy
```

### 2. Install dependencies
- **Frontend:**
  ```bash
  cd frontend
  npm install
  ```
- **Backend:**
  ```bash
  cd ../backend
  npm install
  ```

### 3. Set up environment variables
- **Backend:** Create a `backend/.env` file for your backend environment variables (e.g., `MONGO_URI`, `JWT_SECRET`,`PORT`).
- **Frontend:** Create a `frontend/.env` file and add your API URL(e,g,. `VITE_API_URL`)_
  

### 4. Create the uploads folder in backend
- **Backend:**
  - Manually create a folder named `uploads` inside the `backend` directory. This folder is required for storing user-uploaded images and should not be committed to GitHub.

### 5. Run the development servers
- **Frontend:**
  ```bash
  cd frontend
  npm run dev
  ```
- **Backend:**
  ```bash
  cd backend
  npm run dev
  ```
---

## License
This project is for educational and demonstration purposes.
