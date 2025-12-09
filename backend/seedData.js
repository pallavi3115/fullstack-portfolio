const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Client = require('./models/Client');

dotenv.config();

const sampleProjects = [
  {
    name: "Consultation Project",
    description: "Project norms and location details for consultation services.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "Consultation"
  },
  {
    name: "Design System",
    description: "Complete design system implementation for brand consistency.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    category: "Design"
  }
];

const sampleClients = [
  {
    name: "Rowhan Smith",
    designation: "CEO, Feverbearer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Shijpa Kayak",
    designation: "Brand Designer",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Client.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Project.insertMany(sampleProjects);
    await Client.insertMany(sampleClients);
    console.log('✅ Sample data inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();