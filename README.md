## 🚀 Project Description
This project demonstrates a backend authentication system with *user registration, login, and secure password handling* using *bcrypt and JWT (JSON Web Token)*.  
It is designed to provide a foundation for integrating authentication in full-stack applications.



## ✨ Features
- 🔐 User Registration (with email & password)
- 🔑 Secure Login using *JWT tokens*
- 🛡 Password hashing with *bcrypt*
- 🗄 Database integration with *MongoDB*
- 🧑‍💻 Organized backend structure (models, routes, middleware)
- 📦 Simple setup and easy to extend for frontend use



## 🛠 Tech Stack
- *Frontend: *(Not implemented yet — can be React, Angular, or any framework of choice)  
- *Backend*: Node.js, Express.js  
- *Database*: MongoDB  

## Project Structure
CODECRAFT_FS_01/ │── auth-system/ │   │── frontend/ │   │   ├── index.html  │   │   ├── script.js │   │   ├── style.css │   │ │   ├── middleware/ │   ├── models/ │   ├── routes/  │   │ │   ├── .env │   ├── backend.js │   ├── server.js │   ├── package.json │   ├── package-lock.json │ │── frontend/  │   ├── public/ │   ├── src/ │   ├── package.json │ │── README.md  

## 🛠 Setup Instructions
### Backend
1. Go inside auth-system folder 
   ```bash
   cd auth-system
   npm install
   node server.js
### MongoDB 
1. Database Name: mydb
2. Collection Name: users
