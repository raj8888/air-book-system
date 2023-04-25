# Air Ticket Booking System

## Features:
- Authentication
- JWT Token
- Hash password using Bcrypt
- Book Tickets
- Create Flights

## Tech Stack:

**NPM Modules:** Experss.js,Bcrypt,JsonwebToken,mongoose,.dotenv.

**Database:** MongoDB Atlas

## For Running Locally:

- clone the project
```bash
git clone https://github.com/raj8888/air-book-system.git
```
- Go to project Directory
```bash
cd air-book-system
```
- for Install Modules
```
npm i
```
- for download nodemon globally
```bash
npm install -g nodemon
```
- for Start Server
```bash
nodemon index.js
```
## Enviroment Variables
`mongoURL`

`saltRounds`

`seckey`

## API Refference

- for User Register
```http
POST/api/user/register
```

- for User Login
```http
POST/api/user/login
```

**Authentication Required For next routes**
```
headers/authorizaton: Bearer `token`
```
- for Create Flight Create
```http
POST/api/flights
```

- for get All Flights 
```http
GET/api/flights
```

- for get Single Flight 
```http
GET/api/flights/`flighID`
```

- for Update Flight data
```http
PATCH/api/flights/`flighID`
```

- for Delete Flight data
```http
Delete/api/flights/`flighID`
```

- for book the flight
```http
POST/api/booking/
```

- for get All booking data
```http
GET/api/booking/dashboard
```

##Backend Deployed Link



