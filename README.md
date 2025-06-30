# SubDub - Subscription Management API

A comprehensive Node.js backend API for managing subscriptions with automated renewal reminders and security features.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with sign-up, sign-in, and sign-out
- **Subscription Management**: Create, read, update, and delete subscriptions
- **Automated Reminders**: Smart email reminder system that sends notifications 7, 5, 2, and 1 days before renewal
- **Security**: Rate limiting and bot protection using Arcjet
- **Email Notifications**: Beautiful HTML email templates for renewal reminders
- **Multi-Currency Support**: Support for USD, EUR, GBP, and INR
- **Flexible Billing**: Daily, weekly, monthly, and yearly subscription frequencies
- **Category Management**: Organize subscriptions by category (sports, entertainment, education, health, technology, finance)

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for password hashing
- **Email Service**: Nodemailer for sending emails
- **Security**: Arcjet for rate limiting and bot protection
- **Task Scheduling**: Upstash Workflow for automated reminder scheduling
- **Date Handling**: Day.js for date manipulation
- **Development**: Nodemon for hot reloading, ESLint for code linting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Email service credentials (SMTP)
- Arcjet account for security features
- Upstash account for workflow management

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create environment files for different environments:
   - `.env.development.local` for development
   - `.env.production.local` for production

   **Required Environment Variables:**
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   SERVER_URL=http://localhost:3000

   # Database
   DB_URI=mongodb://localhost:27017/subdub

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d

   # Arcjet Security
   ARCJET_KEY=your-arcjet-key
   ARCJET_ENV=development

   # Upstash Workflow
   QSTASH_TOKEN=your-qstash-token
   QSTASH_URL=https://qstash.upstash.io

   # Email Configuration (add your SMTP credentials)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/sign-up
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Sign In
```http
POST /auth/sign-in
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Sign Out
```http
POST /auth/sign-out
```

### User Endpoints

#### Get All Users
```http
GET /users
```

#### Get User by ID
```http
GET /users/:id
```
*Requires authentication*

### Subscription Endpoints

#### Create Subscription
```http
POST /subscriptions
```
*Requires authentication*

**Body:**
```json
{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "Credit Card",
  "startDate": "2024-01-01T00:00:00.000Z",
  "renewalDate": "2024-02-01T00:00:00.000Z"
}
```

#### Get User Subscriptions
```http
GET /subscriptions/user/:id
```
*Requires authentication*

### Workflow Endpoints

#### Trigger Subscription Reminder
```http
POST /workflows/subscription/reminder
```

## 📊 Data Models

### User Schema
```javascript
{
  name: String (required, 2-50 characters),
  email: String (required, unique, valid email),
  password: String (required, min 6 characters),
  timestamps: true
}
```

### Subscription Schema
```javascript
{
  name: String (required, 2-100 characters),
  price: Number (required, min 0),
  currency: Enum ["USD", "EUR", "GBP", "INR"],
  frequency: Enum ["daily", "weekly", "monthly", "yearly"],
  category: Enum ["sports", "entertainment", "education", "health", "technology", "finance"],
  paymentMethod: String (required),
  status: Enum ["active", "cancelled", "expired"] (default: "active"),
  startDate: Date (required),
  renewalDate: Date (required),
  user: ObjectId (ref: User),
  timestamps: true
}
```

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable rate limits
- **Bot Protection**: Automatically detects and blocks malicious bots
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for password security
- **Input Validation**: Mongoose schema validation for all data inputs

## 📧 Email Reminder System

The application automatically sends email reminders at:
- **7 days** before renewal
- **5 days** before renewal  
- **2 days** before renewal
- **1 day** before renewal

Each reminder includes:
- Subscription details (name, price, payment method)
- Renewal date
- Account management links
- Beautiful HTML formatting

## 🏗️ Project Structure

```
project_backend/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── config/                     # Configuration files
│   ├── env.js                 # Environment variables
│   ├── arcjet.js              # Security configuration
│   ├── nodemailer.js          # Email configuration
│   └── upstash.js             # Workflow configuration
├── controllers/               # Business logic
│   ├── auth.controller.js     # Authentication logic
│   ├── user.controller.js     # User management
│   ├── subscription.controller.js # Subscription management
│   └── workflow.controller.js # Automated workflows
├── database/                  # Database configuration
│   └── mongodb.js            # MongoDB connection
├── middlewares/              # Custom middleware
│   ├── auth.middleware.js    # JWT authentication
│   ├── arcjet.middleware.js  # Security middleware
│   └── error.middleware.js   # Error handling
├── models/                   # Data models
│   ├── user.model.js        # User schema
│   └── subscription.model.js # Subscription schema
├── routes/                   # API routes
│   ├── auth.routes.js       # Authentication endpoints
│   ├── user.routes.js       # User endpoints
│   ├── subscription.routes.js # Subscription endpoints
│   └── workflow.routes.js   # Workflow endpoints
└── utils/                    # Utility functions
    ├── email-template.js    # Email templates
    └── send-email.js        # Email sending logic
```

## 🚀 Deployment

1. **Environment Setup**: Ensure all production environment variables are set
2. **Database**: Set up MongoDB Atlas or your preferred MongoDB hosting
3. **Email Service**: Configure SMTP settings for email delivery
4. **Security**: Update Arcjet configuration for production
5. **Workflows**: Configure Upstash for production workflow management
