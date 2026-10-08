# Customer Management System using Node.js

## Project Overview

The **Customer Management System** is a web-based application developed using **Node.js, Express.js, and MongoDB**. The system allows users to manage customer information through a simple CRUD (Create, Read, Update, Delete) interface.

Customer details such as **name, email, and phone number** are stored in a MongoDB database. The Node.js backend provides REST API endpoints that allow the frontend to perform different operations on customer records.

---

## Objectives

The main objectives of this project are:

* To develop a customer management application using Node.js.
* To implement CRUD operations for customer records.
* To store customer information using MongoDB.
* To create REST API endpoints using Express.js.
* To connect a web frontend with a Node.js backend.
* To understand the use of Mongoose for MongoDB database operations.
* To implement client-server communication using HTTP requests.

---

## Technologies Used

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | Backend runtime environment   |
| Express.js | Web framework for Node.js     |
| MongoDB    | Database                      |
| Mongoose   | MongoDB object modeling       |
| HTML       | Frontend structure            |
| CSS        | Frontend styling              |
| JavaScript | Frontend functionality        |
| CORS       | Cross-Origin Resource Sharing |

---

## Features

The application provides the following functionality:

1. Add a new customer.
2. View all customers.
3. Update existing customer information.
4. Delete a customer.
5. Store customer information in MongoDB.
6. Provide REST API endpoints for customer operations.
7. Serve frontend files using Express.js.

---

## Customer Data

Each customer record contains the following fields:

| Field   | Description                   |
| ------- | ----------------------------- |
| `name`  | Name of the customer          |
| `email` | Email address of the customer |
| `phone` | Phone number of the customer  |

MongoDB automatically generates a unique `_id` for each customer.

---

## Project Structure

```text
Customer-Management-System/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── node_modules/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

The `node_modules` folder should not be uploaded to GitHub. It can be generated using `npm install`.

---

## Backend Implementation

The backend is developed using Express.js.

The application creates an Express server and serves the frontend files from the `public` directory.

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
```

---

## Database Connection

MongoDB is used as the database for storing customer records.

```javascript
mongoose.connect("mongodb://127.0.0.1:27017/CustomerDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
```

The database used in this project is:

```text
CustomerDB
```

---

## Customer Schema

Mongoose is used to define the structure of customer documents.

```javascript
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Customer = mongoose.model('Customer', CustomerSchema);
```

---

## REST API Endpoints

The application provides the following API endpoints:

| Method | Endpoint         | Function               |
| ------ | ---------------- | ---------------------- |
| GET    | `/customers`     | Retrieve all customers |
| POST   | `/customers`     | Add a new customer     |
| PUT    | `/customers/:id` | Update a customer      |
| DELETE | `/customers/:id` | Delete a customer      |

### 1. Get All Customers

```http
GET /customers
```

This endpoint retrieves all customer records from MongoDB.

### 2. Add Customer

```http
POST /customers
```

A customer can be added by sending data such as:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
}
```

### 3. Update Customer

```http
PUT /customers/:id
```

This endpoint updates an existing customer using the customer's MongoDB ID.

### 4. Delete Customer

```http
DELETE /customers/:id
```

This endpoint deletes a customer from the database.

---

## CRUD Operations

The project implements all four basic database operations:

```text
Create
  |
  v
Add Customer
  |
  v
Read
  |
  v
View Customers
  |
  v
Update
  |
  v
Edit Customer
  |
  v
Delete
  |
  v
Remove Customer
```

---

## How to Run the Project

### Step 1: Install Node.js

Install Node.js on your computer.

Verify the installation:

```bash
node --version
```

and:

```bash
npm --version
```

### Step 2: Clone the Repository

```bash
git clone https://github.com/your-username/Customer-Management-System.git
```

Move into the project directory:

```bash
cd Customer-Management-System
```

### Step 3: Install Dependencies

Run:

```bash
npm install
```

This installs the dependencies specified in `package.json`.

### Step 4: Start MongoDB

Make sure MongoDB is running locally.

The application connects to:

```text
mongodb://127.0.0.1:27017/CustomerDB
```

### Step 5: Start the Server

Run:

```bash
node server.js
```

The terminal should display:

```text
MongoDB Connected
Server Started
```

### Step 6: Open the Application

Open the following address in your browser:

```text
http://localhost:3000
```

---

## Application Workflow

```text
User
 |
 v
Frontend Interface
 |
 v
Express.js Server
 |
 v
REST API
 |
 v
Mongoose
 |
 v
MongoDB
 |
 v
CustomerDB
```

When a user performs an operation on the frontend, the request is sent to the Express.js backend. The backend communicates with MongoDB through Mongoose and returns the appropriate response to the frontend.

---

## Dependencies

The project uses the following Node.js packages:

```text
express
mongoose
cors
```

They can be installed using:

```bash
npm install express mongoose cors
```

---

## .gitignore

The following `.gitignore` file is recommended:

```gitignore
node_modules/
.env
```

The `node_modules` directory should not be committed to GitHub because it contains installed dependencies that can be recreated using `npm install`.

---

## Future Enhancements

The project can be further improved by adding:

* Customer search functionality.
* Customer filtering and sorting.
* Form validation.
* Authentication and authorization.
* Password-protected administrator access.
* Pagination for large customer datasets.
* Improved error handling.
* Responsive user interface.
* Deployment using a cloud database such as MongoDB Atlas.
* Deployment of the Node.js application to a cloud hosting platform.

---

## Conclusion

The Customer Management System demonstrates how **Node.js, Express.js, MongoDB, and Mongoose** can be combined to develop a database-driven web application.

The project provides a complete implementation of CRUD operations and demonstrates communication between a frontend application, REST API, backend server, and MongoDB database. It provides a foundation for developing larger customer relationship and management applications.
