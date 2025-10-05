# Product Management Application - Full Stack Developer Assignment

A full-stack web application with user authentication and complete product management CRUD functionality, built as part of the Full Stack Developer internship assignment.

**Website Reference:** [https://fakestoreapi.com/](https://fakestoreapi.com/)

---

## 📋 Assignment Requirements Completed

## 📸 Screenshots

### 1. Login Page
![Login Page](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/Login.jpg)
*User authentication interface with "Invalid credentials" error message shown*

### 2. Add Product Form
![Add Product](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/Add%20new%20product.jpg)
*Complete form with Product Name, Price, Category, and Description fields*

### 3. Products Grid View
![Products Grid](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/Filter%20a%20product.jpg)
*Grid layout showing Nike Air Max Sneakers (₹8999.19), Samsung Galaxy S24 (₹89999.00), and other products with category badges and action buttons*

### 4. Category Filter
![Category Filter](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/Register.jpg)
*Filter dropdown demonstrating category-based product filtering functionality*

### 5. Delete Confirmation
![Delete Product](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/delete%20a%20product.jpg)
*Browser confirmation dialog before product deletion*

### 6. Edit Product Form
![Edit Product](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/edit%20a%20product.jpg)
*Edit interface showing existing product data ready for modification*

### 7. Success Message
![Success Message](https://github.com/SRUJANKS99/product-management-app/raw/main/Images/Add%20new%20product.jpg)
*Success notification after product update operation*


### ✅ 1. Authentication Module
- User registration system with email and username validation
- User login system with secure password handling
- JWT (JSON Web Token) based authentication
- Protected routes - only authenticated users can add, edit, or delete products
- Session persistence using localStorage

### ✅ 2. Product Management (CRUD Operations)
- **Create:** Add new products with all required fields
- **Read:** View all products in a responsive grid layout
- **Update:** Edit existing product details
- **Delete:** Remove products with confirmation dialog
- **Required Fields Implemented:**
  - Product Name
  - Price (with decimal support)
  - Category
  - Description

### ✅ 3. Backend Development
- **REST API Endpoints:**
  - `POST /register` - User registration
  - `POST /login` - User authentication
  - `GET /products` - Fetch all products (with pagination, search, and filtering)
  - `POST /products` - Create new product
  - `PUT /products/:id` - Update existing product
  - `DELETE /products/:id` - Delete product
- **Technology Stack:** Node.js with Express.js
- **Database:** PostgreSQL with connection pooling
- **Authentication:** JWT with bcrypt password hashing
- **Validation:** Input validation and error handling on all routes

### ✅ 4. Frontend Development
- **Framework:** React (functional components with Hooks)
- **Styling:** Tailwind CSS for responsive design
- **Features Implemented:**
  - Login and Registration forms with validation
  - Product add/edit forms with all required fields
  - Product grid display with responsive layout
  - Search functionality for products
  - Category filter dropdown
  - Success and error message notifications (green/red alerts)
  - Edit and delete action buttons on each product card
  - User welcome message and logout functionality

### ✅ 5. Integration
- Seamless frontend-backend integration via REST API
- Complete user flow: Registration → Login → View Products → Add/Edit/Delete Products
- Real-time data updates after CRUD operations
- JWT token management for authenticated requests

### ✅ 6. Project Structure & Code Quality
- Clear separation of frontend and backend folders
- Modular, clean, and readable code
- Comprehensive error handling and validation
- Environment variable configuration for security
- Database indexing for optimized queries
- RESTful API design principles

---

## 🛠️ Technologies Used

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **CORS:** Enabled for cross-origin requests
- **Environment Management:** dotenv

### Frontend
- **Library:** React 18
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)
- **HTTP Client:** Fetch API

### Development Tools
- **Code Editor:** VS Code
- **Version Control:** Git & GitHub
- **Database Management:** PostgreSQL / pgAdmin

---

## 📁 Project Structure

```
product-management-app/
├── backend/
│   ├── server.js              # Express server with all API routes
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (DB credentials, JWT secret)
│   └── .gitignore            # Ignore node_modules and sensitive files
│
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template with Tailwind CDN
│   ├── src/
│   │   ├── App.js            # Main React component with all functionality
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global CSS styles
│   ├── package.json          # Frontend dependencies
│   └── .gitignore           # Ignore node_modules and build files
│
└── README.md                 # Project documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/SRUJANKS99/product-management-app.git
cd product-management-app
```

### 2. Database Setup
Create PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE product_db;
\q
```

The application will automatically create the required tables (`users` and `products`) on first run.

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=product_db
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

Start the backend server:
```bash
npm start
```

Server will run at `http://localhost:5000`

### 4. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm start
```

Application will open at `http://localhost:3000`

---

## 🎯 Key Features Demonstrated

### Authentication Flow
- New users can register with username, email, and password (minimum 6 characters)
- Existing users can login with username and password
- JWT tokens are generated and stored in localStorage
- Protected routes automatically redirect to login if not authenticated
- Logout functionality clears authentication state

### Product Management
- **Grid Layout:** Products displayed in responsive card layout (3 columns on desktop)
- **Add Product:** Modal form with validation for all required fields
- **Edit Product:** Pre-populated form with existing product data
- **Delete Product:** Confirmation dialog before deletion
- **Search:** Real-time search across product names and descriptions
- **Filter:** Category-based filtering with dynamic dropdown
- **Timestamps:** Displays creation date for each product

### User Experience
- Success notifications (green) for successful operations
- Error notifications (red) for failures
- Loading states during API calls
- Responsive design works on mobile, tablet, and desktop
- Clean and modern UI with gradient backgrounds


## 🔐 Security Features

- **Password Hashing:** All passwords hashed using bcrypt (salt rounds: 10)
- **JWT Authentication:** Secure token-based authentication with 24-hour expiry
- **Protected Routes:** Middleware validates JWT tokens on all protected endpoints
- **Input Validation:** Server-side validation for all user inputs
- **SQL Injection Prevention:** Parameterized queries using PostgreSQL prepared statements
- **CORS Configuration:** Controlled cross-origin resource sharing
- **Environment Variables:** Sensitive credentials stored in .env file (not in repository)

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_products_user_id` on `products(user_id)`
- `idx_products_category` on `products(category)`

---

## 🚀 API Endpoints Documentation

### Authentication Endpoints

#### POST /register
Register a new user
```json
Request Body:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### POST /login
Authenticate user
```json
Request Body:
{
  "username": "johndoe",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Product Endpoints (Protected - Requires JWT Token)

#### GET /products
Get all products with optional filters
```
Query Parameters:
- search (optional): Search in name and description
- category (optional): Filter by category
- page (optional): Page number (default: 1)
- limit (optional): Items per page (default: 20)

Headers:
Authorization: Bearer <jwt_token>

Response (200):
{
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

#### POST /products
Create new product
```json
Headers:
Authorization: Bearer <jwt_token>

Request Body:
{
  "name": "Product Name",
  "price": 99.99,
  "category": "Electronics",
  "description": "Product description"
}

Response (201):
{
  "message": "Product created successfully",
  "product": { ... }
}
```

#### PUT /products/:id
Update existing product
```json
Headers:
Authorization: Bearer <jwt_token>

Request Body:
{
  "name": "Updated Name",
  "price": 149.99,
  "category": "Electronics",
  "description": "Updated description"
}

Response (200):
{
  "message": "Product updated successfully",
  "product": { ... }
}
```

#### DELETE /products/:id
Delete product
```
Headers:
Authorization: Bearer <jwt_token>

Response (200):
{
  "message": "Product deleted successfully"
}
```

---

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Register a new user with valid credentials
- [ ] Try registering with duplicate username (should fail)
- [ ] Login with correct credentials
- [ ] Try accessing products page without login (should redirect)
- [ ] Add a new product with all fields
- [ ] View products in grid layout
- [ ] Search for products by name
- [ ] Filter products by category
- [ ] Edit an existing product
- [ ] Delete a product (with confirmation)
- [ ] Logout and verify session is cleared

---

## 📝 Development Notes

### Validation Rules
- **Username:** Minimum 3 characters, unique
- **Email:** Valid email format, unique
- **Password:** Minimum 6 characters
- **Product Name:** Required, non-empty
- **Price:** Required, positive number
- **Category:** Required, non-empty
- **Description:** Required, non-empty

### Error Handling
- Network errors display user-friendly messages
- Invalid inputs show specific validation errors
- Database errors caught and logged on server
- JWT expiry handled with appropriate redirect

---

## 🎓 Assignment Submission

**Submitted By:** Srujan KS  
**GitHub Repository:** [https://github.com/SRUJANKS99/product-management-app](https://github.com/SRUJANKS99/product-management-app)  
**Submission Date:** October 5, 2025  
**Email:** info@dwarkadhishoverseas.com

---

## 🔄 Future Enhancements (Optional)

- Image upload for products
- User profile management
- Product reviews and ratings
- Shopping cart functionality
- Admin dashboard with analytics
- Email verification for registration
- Password reset functionality
- Export products to Excel/PDF
- Dark mode theme

---

## 📄 License

This project was created for the Full Stack Developer internship assignment.

---

## 🙏 Acknowledgments

- Assignment provided by Dwarkadhish Overseas
- API reference: [https://fakestoreapi.com/](https://fakestoreapi.com/)
- Built with Node.js, Express, PostgreSQL, React, and Tailwind CSS

---

## 📞 Contact developer
emai- srujan.ks0903@gmail.com
Number -7483183720

