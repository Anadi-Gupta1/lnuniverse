import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Utensils, Activity, HeartPulse } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FitnessEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  registrationLink?: string;
  image?: string;
  category: 'run' | 'yoga' | 'sports' | 'cycling' | 'other';
}

interface NutritionTip {
  id: number;
  title: string;
  content: string;
  category: string;
  source?: string;
}

interface OnlineCheckup {
  id: number;
  name: string;
  description: string;
  website: string;
  services: string[];
  logo?: string;
}

const fitnessEvents: FitnessEvent[] = [
  {
    id: 1,
    name: "Bhopal Marathon",
    date: "October 15, 2025",
    location: "Van Vihar National Park, Bhopal",
    description: "Annual marathon event with 5K, 10K, and 21K categories. The route passes through scenic locations in Bhopal including the Upper Lake area.",
    registrationLink: "https://www.bhopalmarathon.com",
    image: "/img/Bhopal Marathon Run.jpeg",
    category: 'run'
  },
  {
    id: 2,
    name: "Yoga in the Park",
    date: "Every Sunday, 6:00 AM - 7:30 AM",
    location: "Shaurya Smarak, Bhopal",
    description: "Free weekly yoga sessions conducted by certified instructors. Open to all age groups and experience levels.",
    image: "/img/Yoga in the par Shaurya smarak bhopal.jpeg",
    category: 'yoga'
  },
  {
    id: 3,
    name: "Bhopal Cycling Championship",
    date: "September 5-6, 2025",
    location: "BHEL Sports Complex, Bhopal",
    description: "Annual cycling competition with various categories including mountain biking, road cycling, and BMX events.",
    registrationLink: "https://www.bhopalcycling.org",
    image: "/img/Bhopal Cycling Championship Cycling.jpeg",
    category: 'cycling'
  },
  {
    id: 4,
    name: "Corporate Cricket League",
    date: "August 10-25, 2025",
    location: "Ankur Cricket Ground, Bhopal",
    description: "Inter-corporate cricket tournament promoting fitness and team building among professionals in Bhopal.",
    registrationLink: "https://www.bhopalcricketleague.com",
    image: "/img/Corporate Cricket League Sports Ankur Cricket Ground, Bhopal.jpg",
    category: 'sports'
  },
  {
    id: 5,
    name: "Bhopal Fitness Festival",
    date: "November 12-14, 2025",
    location: "DB City Mall, Bhopal",
    description: "Three-day fitness expo featuring workshops, competitions, and demonstrations of various fitness activities and equipment.",
    registrationLink: "https://www.bhopalfitfest.com",
    image: "/events/fitness.jpg",
    category: 'other'
  },
  {
    id: 6,
    name: "Zumba in the Park",
    date: "Every Saturday, 5:30 PM - 6:30 PM",
    location: "Ekant Park, Bhopal",
    description: "Free Zumba sessions conducted by certified instructors. A fun way to stay fit with dance-based exercise.",
    image: "/img/Zumba in the ParkEkant Park, Bhopal.jpeg",
    category: 'other'
  },
  {
    id: 7,
    name: "Lake City Swimming Competition",
    date: "July 15-16, 2025",
    location: "Bhopal Swimming Centre",
    description: "Annual swimming competition with various categories for different age groups and skill levels.",
    registrationLink: "https://www.bhopalswimming.org",
    image: "/img/Lake City Swimming Competition Sports.jpg",
    category: 'sports'
  },
  {
    id: 8,
    name: "Bhopal Night Run",
    date: "December 31, 2025",
    location: "New Market to MP Nagar, Bhopal",
    description: "New Year's Eve night run through the illuminated streets of Bhopal. A 7K fun run open to all.",
    registrationLink: "https://www.bhopalnightrun.com",
    image: "/img/Bhopal Night Run.jpeg",
    category: 'run'
  }
];

const nutritionTips: NutritionTip[] = [
  {
    id: 1,
    title: "Local Seasonal Fruits for Optimal Nutrition",
    content: "Bhopal's seasonal fruits like guavas, oranges, and berries are packed with antioxidants and vitamins. Include at least 2-3 servings daily for improved immunity and digestion.",
    category: "Seasonal Eating",
    source: "MP State Nutrition Board"
  },
  {
    id: 2,
    title: "Hydration Tips for Bhopal's Climate",
    content: "In Bhopal's varied climate, staying hydrated is essential. Aim for 3-4 liters of water daily, and increase intake during summer months. Consider adding lemon, mint, or cucumber for flavor and added benefits.",
    category: "Hydration",
    source: "AIIMS Bhopal Nutrition Department"
  },
  {
    id: 3,
    title: "Protein Sources for Vegetarians",
    content: "For vegetarians in Bhopal, good protein sources include local lentils (dal), chickpeas, paneer, milk, and soy products. Combine different plant proteins for complete amino acid profiles.",
    category: "Protein Intake",
    source: "Indian Dietetic Association"
  },
  {
    id: 4,
    title: "Balanced Meal Planning",
    content: "A balanced meal should include 1/4 plate of protein, 1/4 plate of whole grains, and 1/2 plate of vegetables and fruits. This ensures you get all essential nutrients in proper proportions.",
    category: "Meal Planning",
    source: "National Institute of Nutrition"
  },
  {
    id: 5,
    title: "Healthy Snacking Options",
    content: "Replace processed snacks with nuts, seeds, fresh fruits, or homemade chaat with sprouts. These provide sustained energy and essential nutrients without excess calories.",
    category: "Snacking",
    source: "Fitness First Nutritionists"
  },
  {
    id: 6,
    title: "Pre and Post Workout Nutrition",
    content: "Before workouts, consume easily digestible carbs like bananas or oats. After exercise, have a combination of protein and carbs within 30-45 minutes to aid recovery and muscle growth.",
    category: "Fitness Nutrition",
    source: "Sports Authority of India"
  }
];

const onlineCheckups: OnlineCheckup[] = [
  {
    id: 1,
    name: "Practo",
    description: "Online consultations with doctors across specialties, health records management, and medicine delivery.",
    website: "https://www.practo.com",
    services: ["Video consultations", "Specialist appointments", "Health records", "Medicine delivery"],
    logo: "/telehealth/practo.png"
  },
  {
    id: 2,
    name: "Apollo 24|7",
    description: "Comprehensive healthcare platform offering teleconsultations, diagnostics, and pharmacy services.",
    website: "https://www.apollo247.com",
    services: ["Doctor consultations", "Lab tests", "Health records", "Medicine delivery", "Health risk assessments"],
    logo: "/telehealth/apollo.png"
  },
  {
    id: 3,
    name: "MediBuddy",
    description: "Digital healthcare platform for online doctor consultations, lab tests, and preventive health checkups.",
    website: "https://www.medibuddy.in",
    services: ["24/7 doctor consultations", "Lab tests at home", "Health checkups", "Corporate wellness"],
    logo: "/telehealth/medibuddy.png"
  },
  {
    id: 4,
    name: "Tata Health",
    description: "Online consultation platform with doctors from various specialties and digital health records.",
    website: "https://www.tatahealth.com",
    services: ["Video consultations", "Specialist appointments", "Digital prescriptions", "Health tracking"],
    logo: "/telehealth/tatahealth.png"
  },
  {
    id: 5,
    name: "DocsApp",
    description: "Mobile app for doctor consultations, medicine delivery, and lab tests.",
    website: "https://www.docsapp.in",
    services: ["Chat with doctors", "Video consultations", "Medicine delivery", "Lab tests"],
    logo: "/telehealth/docsapp.png"
  }
];

const HealthGoals: React.FC = () => {
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Health Goals</h1>
      
      <Tabs defaultValue="events" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">
            <Calendar className="mr-2 h-4 w-4" />
            Fitness Events
          </TabsTrigger>
          <TabsTrigger value="nutrition">
            <Utensils className="mr-2 h-4 w-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="checkups">
            <HeartPulse className="mr-2 h-4 w-4" />
            Online Checkups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Sports & Fitness Events in Bhopal</h2>
            <p className="text-gray-600 mb-6">
              Stay active and engaged with these upcoming sports and fitness events happening in Bhopal throughout the year.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fitnessEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden h-full flex flex-col">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.name}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.category === 'run' ? 'bg-red-100 text-red-800' :
                        event.category === 'yoga' ? 'bg-purple-100 text-purple-800' :
                        event.category === 'cycling' ? 'bg-green-100 text-green-800' :
                        event.category === 'sports' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-start text-gray-600">
                        <span className="mr-2">📍</span>
                        {event.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{event.description}</p>
                  </CardContent>
                  {event.registrationLink && (
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => window.open(event.registrationLink, '_blank')}
                      >
                        Register Now <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
            <p className="text-gray-600 mb-6">
              Proper nutrition is essential for achieving your fitness goals. Here are some nutrition tips to help you stay healthy and fit.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nutritionTips.map((tip) => (
                <Card key={tip.id} className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {tip.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tip.content}</p>
                  </CardContent>
                  {tip.source && (
                    <CardFooter className="text-xs text-gray-500">
                      Source: {tip.source}
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Nutrition Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Balanced Diet Guidelines</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">A balanced diet should include:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Plenty of fruits and vegetables (at least 5 portions a day)</li>
                        <li>Starchy foods like potatoes, bread, rice, or pasta (choose wholegrain varieties)</li>
                        <li>Protein sources such as beans, pulses, fish, eggs, and meat</li>
                        <li>Dairy or dairy alternatives</li>
                        <li>Small amounts of unsaturated oils and spreads</li>
                        <li>Plenty of fluids (6-8 glasses a day)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Nutrition for Active Individuals</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">If you're physically active, your nutritional needs may differ:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Increased calorie intake to fuel activity</li>
                        <li>Higher protein intake for muscle repair and growth (1.2-2.0g per kg of body weight)</li>
                        <li>Complex carbohydrates for sustained energy</li>
                        <li>Proper hydration before, during, and after exercise</li>
                        <li>Timing of meals around workouts for optimal performance</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Local Nutritionists in Bhopal</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Dr. Meena Sharma</strong><br />
                          Nutrition Consultant at AIIMS Bhopal<br />
                          Contact: 0755-XXXXXXXX
                        </li>
                        <li>
                          <strong>Ms. Priya Verma</strong><br />
                          Sports Nutritionist at Fitness First<br />
                          Contact: 0755-XXXXXXXX
                        </li>
                        <li>
                          <strong>Dr. Rajesh Kumar</strong><br />
                          Clinical Nutritionist at People's Hospital<br />
                          Contact: 0755-XXXXXXXX
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="checkups" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Online Health Checkups</h2>
            <p className="text-gray-600 mb-6">
              Access healthcare services from the comfort of your home with these online checkup platforms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineCheckups.map((checkup) => (
                <Card key={checkup.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{checkup.name}</CardTitle>
                      {checkup.logo && (
                        <img 
                          src={checkup.logo} 
                          alt={checkup.name} 
                          className="h-10 w-auto object-contain"
                        />
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {checkup.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h3 className="font-semibold mb-2">Services:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {checkup.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(checkup.website, '_blank')}
                    >
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Benefits of Online Health Checkups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Convenience
                    </h3>
                    <p className="text-gray-600">
                      Access healthcare services from anywhere, anytime without the need to travel or wait in queues.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Affordability
                    </h3>
                    <p className="text-gray-600">
                      Online consultations are often more affordable than in-person visits, with various packages available.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Privacy
                    </h3>
                    <p className="text-gray-600">
                      Discuss health concerns in the privacy of your home, which can be more comfortable for sensitive issues.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Continuity of Care
                    </h3>
                    <p className="text-gray-600">
                      Digital health records allow for better tracking of your health over time and easier sharing with healthcare providers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthGoals;