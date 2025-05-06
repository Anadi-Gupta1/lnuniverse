const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const config = require('../config/config');

let token;
let doctorId;
let hospitalId;

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(config.MONGO_URI || 'mongodb://localhost:27017/health-ai-srijan-test');
});

afterAll(async () => {
  // Clean up and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+91-9876543222',
        address: '123 Test Address, Bhopal',
        role: 'user'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    token = res.body.token;
  });
});

describe('Doctor Endpoints', () => {
  it('should create a new doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Dr. Test',
        specialization: 'Cardiology',
        experience: 10,
        contactInfo: {
          email: 'doctor@example.com',
          phone: '1234567890'
        }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    doctorId = res.body.data._id;
  });

  it('should get all doctors', async () => {
    const res = await request(app)
      .get('/api/doctors')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('Hospital Endpoints', () => {
  it('should create a new hospital', async () => {
    const res = await request(app)
      .post('/api/hospitals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Hospital',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '12345'
        },
        contactInfo: {
          email: 'hospital@example.com',
          phone: '1234567890'
        }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    hospitalId = res.body.data._id;
  });

  it('should get all hospitals', async () => {
    const res = await request(app)
      .get('/api/hospitals')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('Appointment Endpoints', () => {
  it('should create a new appointment', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        doctor: doctorId,
        hospital: hospitalId,
        date: new Date(),
        time: '10:00 AM',
        type: 'consultation'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should get user appointments', async () => {
    const res = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});