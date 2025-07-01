const mongoose = require('mongoose');
const Product = require('./server/models/Product');
require('dotenv').config();

console.log('Starting seed script...');

const products = [
  {
    name: 'Premium Dog Food',
    price: 29.99,
    oldPrice: 39.99,
    description: 'High-quality dog food with balanced nutrition',
    category: 'food',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80'],
    location: 'Karachi'
  },
  {
    name: 'Cat Scratching Post',
    price: 39.99,
    oldPrice: 49.99,
    description: 'Durable cat scratching post with multiple levels',
    category: 'toys',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80'],
    location: 'Lahore'
  },
  {
    name: 'Pet Carrier',
    price: 49.99,
    description: 'Comfortable and secure pet carrier for travel',
    category: 'accessories',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'],
    location: 'Islamabad'
  },
  {
    name: 'Pet Grooming Kit',
    price: 34.99,
    oldPrice: 44.99,
    description: 'Complete grooming kit for pets',
    category: 'grooming',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'],
    location: 'Karachi'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pet-marketplace', {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    console.log('Connected to MongoDB successfully');

    console.log('Deleting existing products...');
    await Product.deleteMany({});
    console.log('Existing products deleted');

    console.log('Inserting new products...');
    const result = await Product.insertMany(products);
    console.log('Products inserted successfully:', result);

    console.log('Seeded products successfully!');
  } catch (error) {
    console.error('Error in seed script:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
    }
  } finally {
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed(); 