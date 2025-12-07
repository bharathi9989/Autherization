JWT Authentication API (Node.js + Express + MongoDB)

A clean, production-style JWT Authentication and Authorization system built using Node.js, Express, MongoDB (Mongoose), and tested using Postman.

This project follows a strict MVC folder structure, uses Bearer Token authentication, includes Postman API documentation, and is built for learning real-world backend authentication.

🚀 Features

User Registration (with hashed password)

User Login (returns JWT)

Protected Route (/getMe)

JWT verification middleware

Clean project structure (MVC)

Full Postman documentation

Environment variable support

Proper error handling

📁 Project Structure (MVC)

src/
controllers/
userController.js
models/
UserModel.js
middlewares/
authMiddleware.js
routes/
userRoutes.js
config/
db.js
index.js
.env

🧠 Tech Stack

Node.js – Runtime

Express.js – Framework

MongoDB – Database

Mongoose – ODM

JWT – Authentication

Postman – API testing

🔗 API Endpoints

1. Register User

POST /api/users/register

Creates a new user. Password is hashed automatically.

Body:

{
"username": "velu",
"email": "boss@example.com",
"password": "secret123"
}

Success Response:

{
"message": "User created successfully",
"user": {
"id": "<id>",
"username": "velu",
"email": "boss@example.com"
}
}

2. Login User

POST /api/users/login

Authenticates user and returns a JWT.

Body:

{
"email": "boss@example.com",
"password": "secret123"
}

Success Response:

{
"message": "login successfully",
"token": "<JWT_TOKEN>"
}

3. Get Logged In User (Protected)

GET /api/users/login/:\_id

Requires header:

Authorization: Bearer <token>

Success Response:

{
"message": "User fetched successfully",
"user": {
"id": "<id>",
"email": "boss@example.com"
}
}

🔐 JWT Authentication Flow

User registers → password is hashed

User logs in → server validates password

Server generates JWT token

Client sends token in header for protected routes:

Authorization: Bearer <token>

Middleware verifies token → attaches decoded user to req.user

Controller returns user data

⚙️ Installation & Setup

1. Clone the project

.git clone <repo-url>
cd project-folder

2. Install dependencies

npm install

3. Setup .env

MONGO_URI=mongodb+srv://<your-db>
SECRET_KEY=your-secret-key
PORT=5000

4. Start the server

npm run dev

Server runs at:http://localhost:5000

📘 Postman Documentation

Your collection must contain:

Register endpoint

Login endpoint

Get Me endpoint

Headers, body, and example responses saved for each

You can publish documentation via Postman → View in Web → Publish.

URL for published documentation :

https://documenter.getpostman.com/view/48296551/2sB3dPTWWV

🧾 Error Handling

Missing fields → 400

User exists → 409

Invalid credentials → 401

No token → 401

Invalid token → 401

Server error → 500
