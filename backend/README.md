# Health AI Srijan System - Backend API

This is the backend API for the Health AI Srijan System, a healthcare application for Bhopal, India.

## Features

- Hospital listing and details
- Doctor information and appointment booking
- Medical & Pharmacy services
- Health Goals (events, nutrition, online checkups)
- User dashboard with fitness tracking
- Emergency services

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Google Maps API Integration

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Environment Variables**

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health-ai-srijan
JWT_SECRET=srijan_health_ai_secure_secret_2025
JWT_EXPIRE=30d
GOOGLE_MAPS_API_KEY=AIzaSyCesPBARNYutMVUODlpz66FTHJ7f8DYRgY
```

3. **Run the server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user
- `PUT /api/users/updatedetails` - Update user details
- `PUT /api/users/updatepassword` - Update user password

### Hospitals

- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get single hospital
- `POST /api/hospitals` - Create new hospital (Admin)
- `PUT /api/hospitals/:id` - Update hospital (Admin)
- `DELETE /api/hospitals/:id` - Delete hospital (Admin)
- `GET /api/hospitals/radius/:zipcode/:distance` - Get hospitals within radius

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `POST /api/hospitals/:hospitalId/doctors` - Create new doctor (Admin)
- `PUT /api/doctors/:id` - Update doctor (Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin)
- `GET /api/hospitals/:hospitalId/doctors` - Get doctors by hospital

### Appointments

- `GET /api/appointments` - Get all appointments (User: own, Admin: all)
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Pharmacies

- `GET /api/pharmacies` - Get all pharmacies
- `GET /api/pharmacies/:id` - Get single pharmacy
- `POST /api/pharmacies` - Create new pharmacy (Admin)
- `PUT /api/pharmacies/:id` - Update pharmacy (Admin)
- `DELETE /api/pharmacies/:id` - Delete pharmacy (Admin)
- `GET /api/pharmacies/type/:type` - Get pharmacies by type (local/online)

### Fitness Events

- `GET /api/events` - Get all fitness events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)
- `GET /api/events/category/:category` - Get events by category

### Nutrition Tips

- `GET /api/nutrition` - Get all nutrition tips
- `GET /api/nutrition/:id` - Get single nutrition tip
- `POST /api/nutrition` - Create new nutrition tip (Admin)
- `PUT /api/nutrition/:id` - Update nutrition tip (Admin)
- `DELETE /api/nutrition/:id` - Delete nutrition tip (Admin)
- `GET /api/nutrition/category/:category` - Get nutrition tips by category

### Emergency Services

- `GET /api/emergency` - Get all emergency services
- `GET /api/emergency/:id` - Get single emergency service
- `POST /api/emergency` - Create new emergency service (Admin)
- `PUT /api/emergency/:id` - Update emergency service (Admin)
- `DELETE /api/emergency/:id` - Delete emergency service (Admin)
- `GET /api/emergency/type/:type` - Get emergency services by type
- `GET /api/emergency/nearest` - Get nearest emergency services

## Data Models

The API uses the following data models:

- User
- Hospital
- Doctor
- Appointment
- Pharmacy
- FitnessEvent
- NutritionTip
- Emergency

## Security

- JWT Authentication
- Role-based access control
- Password hashing
- Protected routes

## Integration

This backend API integrates with:

- Google Maps API for location-based services
- Frontend React application

## License

This project is licensed under the ISC License.
