const fs = require('fs');
const mongoose = require('mongoose');
const config = require('../config/config');

// Load models
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Pharmacy = require('../models/Pharmacy');
const FitnessEvent = require('../models/FitnessEvent');
const NutritionTip = require('../models/NutritionTip');
const Emergency = require('../models/Emergency');

// Connect to DB
mongoose.connect(config.MONGO_URI);

// Sample data
const hospitals = [
  {
    name: "All India Institute of Medical Sciences (AIIMS) Bhopal",
    image: "/img/All India Institute of Medical Sciences (AIIMS) Bhopal.jpeg",
    address: "Saket Nagar, Bhopal, Madhya Pradesh 462020",
    contact: "+91-0755-298260",
    website: "https://www.aiimsbhopal.edu.in",
    description: "A premier government hospital with super-specialty departments including cardiology, neurology, oncology, advanced diagnostics, and research centers. It integrates AYUSH for holistic care.",
    facilities: ["Cardiology", "Neurology", "Oncology", "Advanced Diagnostics", "Research Centers"],
    coordinates: { lat: 23.2125, lng: 77.4572 }
  },
  {
    name: "Bhopal Memorial Hospital and Research Centre (BMHRC)",
    image: "/img/Bhopal Memorial Hospital and Research Centre (BMHRC).jpeg",
    address: "Bhopal ByPass, Raisen Road, Karond, Bhopal 462038",
    contact: "+91-755-2742212",
    website: "http://bmhrc.ac.in/",
    description: "A 350-bed multi-specialty hospital specializing in respiratory diseases, eye care, and psychological support, established for Bhopal Gas Tragedy victims, with modern facilities and a research wing.",
    facilities: ["Respiratory Diseases", "Eye Care", "Psychological Support"],
    coordinates: { lat: 23.2800, lng: 77.3486 }
  },
  {
    name: "Government Jai Prakash District Hospital",
    image: "/img/Government Jai Prakash District Hospital.jpeg",
    address: "1250, Link Road No. 2, Tulsi Nagar, Shivaji Nagar, Bhopal 462001",
    contact: "0755-2556812",
    website: "http://www.jphospital.org",
    description: "A government hospital offering 24/7 services with specialties like Gynecology, Pediatrics, and Nephrology, equipped with a blood bank and upgraded infrastructure.",
    facilities: ["Gynecology", "Pediatrics", "Nephrology", "Blood Bank"],
    coordinates: { lat: 23.2350, lng: 77.4010 }
  }
];

const doctors = [
  {
    name: "Dr. Anand Sharma",
    specialization: "Neurology",
    qualifications: ["MBBS", "MD", "DM Neurology"],
    experience: 15,
    languages: ["Hindi", "English"],
    consultationFee: 1200,
    availableSlots: [
      { day: "Monday", startTime: "10:00 AM", endTime: "1:00 PM" },
      { day: "Wednesday", startTime: "10:00 AM", endTime: "1:00 PM" },
      { day: "Friday", startTime: "10:00 AM", endTime: "1:00 PM" }
    ],
    contactInfo: {
      email: "dr.anand@example.com",
      phone: "+91-9876543210"
    }
  },
  {
    name: "Dr. Meera Patel",
    specialization: "Pediatrics",
    qualifications: ["MBBS", "MD Pediatrics"],
    experience: 10,
    languages: ["Hindi", "English", "Gujarati"],
    consultationFee: 800,
    availableSlots: [
      { day: "Tuesday", startTime: "11:00 AM", endTime: "2:00 PM" },
      { day: "Thursday", startTime: "11:00 AM", endTime: "2:00 PM" },
      { day: "Saturday", startTime: "11:00 AM", endTime: "2:00 PM" }
    ],
    contactInfo: {
      email: "dr.meera@example.com",
      phone: "+91-9876543211"
    }
  },
  {
    name: "Dr. Rajiv Kumar",
    specialization: "Respiratory Medicine",
    qualifications: ["MBBS", "MD Pulmonology"],
    experience: 12,
    languages: ["Hindi", "English"],
    consultationFee: 1000,
    availableSlots: [
      { day: "Monday", startTime: "2:00 PM", endTime: "5:00 PM" },
      { day: "Wednesday", startTime: "2:00 PM", endTime: "5:00 PM" },
      { day: "Friday", startTime: "2:00 PM", endTime: "5:00 PM" }
    ],
    contactInfo: {
      email: "dr.rajiv@example.com",
      phone: "+91-9876543212"
    }
  }
];

const pharmacies = [
  {
    name: "Apollo Pharmacy",
    type: "online",
    logo: "/img/apollo pharmacy.jpg",
    website: "https://www.apollopharmacy.in",
    services: [
      "Online ordering of medicines, health products, and medical equipment",
      "Fast home delivery, including super-fast options",
      "24-hour pharmacy services in some locations",
      "Prescription injections and medical devices"
    ],
    notes: "With over 5,600 stores across India, Apollo Pharmacy has a strong presence in Bhopal and is known for its reliability",
    contactInfo: {
      phone: "1800-103-0001",
      email: "customercare@apollopharmacy.org"
    },
    operatingHours: {
      is24Hours: true
    },
    deliveryOptions: {
      hasHomeDelivery: true,
      deliveryFee: 0,
      minOrderForFreeDelivery: 500
    }
  },
  {
    name: "Shiv Medical Store",
    type: "local",
    location: "Shop No. 7, 9, 11 No. Bus Stop, E-7, Arera Colony, Bhopal, Madhya Pradesh - 462016",
    services: [
      "Online ordering of prescription drugs, health kits, and supplements",
      "Home delivery of medicines and medical equipment",
      "Online payments",
      "Medical equipment and injections (with valid prescription)"
    ],
    notes: "Established in 1981, known for reliability and wide product range",
    contactInfo: {
      phone: "+91-755-2463123",
      email: "shivmedical@example.com"
    },
    operatingHours: {
      is24Hours: false,
      schedule: {
        monday: "9:00 AM - 10:00 PM",
        tuesday: "9:00 AM - 10:00 PM",
        wednesday: "9:00 AM - 10:00 PM",
        thursday: "9:00 AM - 10:00 PM",
        friday: "9:00 AM - 10:00 PM",
        saturday: "9:00 AM - 10:00 PM",
        sunday: "9:00 AM - 2:00 PM"
      }
    },
    deliveryOptions: {
      hasHomeDelivery: true,
      deliveryFee: 30,
      minOrderForFreeDelivery: 300
    }
  }
];

const events = [
  {
    name: "Bhopal Marathon",
    date: "October 15, 2025",
    location: "Van Vihar National Park, Bhopal",
    description: "Annual marathon event with 5K, 10K, and 21K categories. The route passes through scenic locations in Bhopal including the Upper Lake area.",
    registrationLink: "https://www.bhopalmarathon.com",
    image: "/img/Bhopal Marathon Run.jpeg",
    category: "run",
    organizer: {
      name: "Bhopal Sports Council",
      contact: "+91-9876543213",
      website: "https://www.bhopalmarathon.com"
    },
    eventDetails: {
      startTime: "6:00 AM",
      entryFee: 500,
      participantLimit: 1000
    },
    coordinates: { lat: 23.2125, lng: 77.3500 }
  },
  {
    name: "Yoga in the Park",
    date: "Every Sunday, 6:00 AM - 7:30 AM",
    location: "Shaurya Smarak, Bhopal",
    description: "Free weekly yoga sessions conducted by certified instructors. Open to all age groups and experience levels.",
    image: "/img/Yoga in the par Shaurya smarak bhopal.jpeg",
    category: "yoga",
    organizer: {
      name: "Bhopal Yoga Association",
      contact: "+91-9876543214"
    },
    eventDetails: {
      startTime: "6:00 AM",
      endTime: "7:30 AM",
      entryFee: 0,
      isRecurring: true,
      recurrencePattern: "Every Sunday"
    },
    coordinates: { lat: 23.2300, lng: 77.4000 }
  }
];

const nutritionTips = [
  {
    title: "Local Seasonal Fruits for Optimal Nutrition",
    content: "Bhopal's seasonal fruits like guavas, oranges, and berries are packed with antioxidants and vitamins. Include at least 2-3 servings daily for improved immunity and digestion.",
    category: "Seasonal Eating",
    source: "MP State Nutrition Board",
    tags: ["fruits", "seasonal", "immunity"],
    relevantTo: {
      ageGroups: ["Children", "Adults", "Seniors"],
      dietaryPreferences: ["Vegetarian", "Vegan"]
    }
  },
  {
    title: "Hydration Tips for Bhopal's Climate",
    content: "In Bhopal's varied climate, staying hydrated is essential. Aim for 3-4 liters of water daily, and increase intake during summer months. Consider adding lemon, mint, or cucumber for flavor and added benefits.",
    category: "Hydration",
    source: "AIIMS Bhopal Nutrition Department",
    tags: ["hydration", "summer", "water"],
    relevantTo: {
      ageGroups: ["Children", "Adults", "Seniors"],
      medicalConditions: ["Diabetes", "Hypertension"]
    }
  }
];

const emergencyServices = [
  {
    name: "Bhopal Emergency Ambulance Service",
    type: "ambulance",
    contactNumber: "108",
    alternateNumber: "+91-755-2555108",
    description: "24/7 emergency ambulance service covering all areas of Bhopal. Equipped with advanced life support systems and trained paramedics.",
    coverage: {
      areas: ["North Bhopal", "South Bhopal", "East Bhopal", "West Bhopal"],
      radius: 25
    },
    responseTime: "10-15 minutes",
    operatingHours: {
      is24Hours: true
    },
    coordinates: { lat: 23.2500, lng: 77.4000 }
  },
  {
    name: "Bhopal Police Emergency",
    type: "police",
    contactNumber: "100",
    alternateNumber: "+91-755-2443333",
    description: "Emergency police services for Bhopal city. Handles law and order emergencies, accidents, and safety concerns.",
    coverage: {
      areas: ["All Bhopal"],
      radius: 30
    },
    responseTime: "10-20 minutes",
    operatingHours: {
      is24Hours: true
    },
    coordinates: { lat: 23.2600, lng: 77.4100 }
  }
];

// Import into DB
const importData = async () => {
  try {
    // Clear existing data
    await Hospital.deleteMany();
    await Doctor.deleteMany();
    await Pharmacy.deleteMany();
    await FitnessEvent.deleteMany();
    await NutritionTip.deleteMany();
    await Emergency.deleteMany();

    console.log('Data cleared...');

    // Create admin user
    await User.findOneAndUpdate(
      { email: 'admin@healthai.com' },
      {
        name: 'Admin User',
        email: 'admin@healthai.com',
        password: 'password123',
        role: 'admin',
        phone: '+91-9876543200'
      },
      { upsert: true, new: true, runValidators: true }
    );

    // Create test user
    await User.findOneAndUpdate(
      { email: 'user@healthai.com' },
      {
        name: 'Test User',
        email: 'user@healthai.com',
        password: 'password123',
        role: 'user',
        phone: '+91-9876543201',
        address: {
          street: '123 Test Street',
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          zipCode: '462001'
        },
        healthMetrics: {
          height: 170,
          weight: 70,
          bloodGroup: 'O+',
          allergies: ['Pollen'],
          chronicConditions: []
        },
        fitnessGoals: {
          dailyStepsTarget: 10000,
          weeklyWorkoutTarget: 4,
          calorieTarget: 2000
        }
      },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('Users created...');

    // Create hospitals
    const createdHospitals = await Hospital.create(hospitals);
    console.log('Hospitals created...');

    // Create doctors with hospital references
    const doctorsWithHospitals = doctors.map((doctor, index) => {
      return {
        ...doctor,
        hospital: createdHospitals[index % createdHospitals.length]._id,
        image: '/img/default-doctor.jpg'
      };
    });

    await Doctor.create(doctorsWithHospitals);
    console.log('Doctors created...');

    // Create other data
    await Pharmacy.create(pharmacies);
    console.log('Pharmacies created...');

    await FitnessEvent.create(events);
    console.log('Fitness events created...');

    await NutritionTip.create(nutritionTips);
    console.log('Nutrition tips created...');

    await Emergency.create(emergencyServices);
    console.log('Emergency services created...');

    console.log('Data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Hospital.deleteMany();
    await Doctor.deleteMany();
    await Pharmacy.deleteMany();
    await FitnessEvent.deleteMany();
    await NutritionTip.deleteMany();
    await Emergency.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Determine which operation to run based on command line args
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please add proper flag: -i (import) or -d (delete)');
  process.exit();
}
