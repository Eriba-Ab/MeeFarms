import mongoose from 'mongoose';
import { config } from './config/index';
import Product from './models/Product';

const products = [
    // Crops
    {
        name: 'Premium Rice',
        price: 2500,
        image: '/uploads/products/rice.jpg',
        category: 'crops',
        stock: 100,
        description: 'High-quality Nigerian rice, freshly harvested',
        longDescription: 'Our premium rice is grown using sustainable farming practices in the fertile lands of Nigeria. Rich in nutrients and perfect for all your cooking needs. Each grain is carefully selected to ensure the highest quality for your family.',
        status: 'in-stock'
    },
    {
        name: 'Fresh Maize',
        price: 1800,
        image: '/uploads/products/maize.jpg',
        category: 'crops',
        stock: 50,
        description: 'Sweet and nutritious maize corn',
        longDescription: 'Freshly harvested maize with exceptional sweetness and nutritional value. Perfect for cooking, processing, or direct consumption. Our maize is grown without harmful pesticides and is rich in vitamins and minerals.',
        status: 'in-stock'
    },
    {
        name: 'Organic Cassava',
        price: 1200,
        image: '/uploads/products/cassava.jpg',
        category: 'crops',
        stock: 15,
        description: 'Fresh cassava tubers, organically grown',
        longDescription: 'Organically grown cassava tubers, perfect for making flour, chips, or traditional dishes. High in carbohydrates and essential nutrients. Our cassava is harvested at the perfect maturity for optimal taste and texture.',
        status: 'low-stock'
    },
    {
        name: 'Fresh Plantain',
        price: 800,
        image: '/uploads/products/plantain.jpg',
        category: 'crops',
        stock: 0,
        description: 'Sweet and ripe plantain bunches',
        longDescription: 'Fresh plantain bunches at perfect ripeness. Ideal for frying, boiling, or roasting. Rich in potassium and vitamins. Each bunch is carefully selected to ensure you get the best quality plantains for your meals.',
        status: 'out-of-stock'
    },

    // Livestock
    {
        name: 'Free-Range Chicken',
        price: 3500,
        image: '/uploads/products/chicken.jpg',
        category: 'livestock',
        stock: 25,
        description: 'Healthy free-range chicken, farm fresh',
        longDescription: 'Our free-range chickens are raised in natural conditions with access to open pastures. They are healthy, organic, and free from harmful chemicals. Fed with natural grains and allowed to roam freely, resulting in tender, flavorful meat.',
        status: 'in-stock'
    },
    {
        name: 'Fresh Catfish',
        price: 2800,
        image: '/uploads/products/catfish.jpg',
        category: 'livestock',
        stock: 40,
        description: 'Live catfish, pond-raised',
        longDescription: 'Fresh catfish raised in our clean ponds with proper nutrition. Rich in protein and omega-3 fatty acids. Our catfish are raised in controlled environments with regular water quality monitoring to ensure the healthiest fish.',
        status: 'in-stock'
    },
    {
        name: 'Guinea Fowl',
        price: 4200,
        image: '/uploads/products/GuineaFowl.jpeg',
        category: 'livestock',
        stock: 8,
        description: 'Premium guinea fowl, naturally raised',
        longDescription: 'Premium guinea fowl raised in natural conditions. Known for their lean meat and unique flavor profile. Our guinea fowls are free-range and fed with natural feed, making them a healthy and delicious choice.',
        status: 'low-stock'
    },

    // Agro-Chemicals
    {
        name: 'NPK Fertilizer',
        price: 5500,
        image: '/uploads/products/NPKFertilizer.png',
        category: 'agro-chemicals',
        stock: 200,
        description: 'High-quality NPK fertilizer for crops',
        longDescription: 'Premium NPK fertilizer with balanced nutrients for optimal crop growth. Suitable for all types of crops and soil conditions. Contains the perfect ratio of nitrogen, phosphorus, and potassium to boost your crop yields significantly.',
        status: 'in-stock'
    },
    {
        name: 'Herbicide Concentrate',
        price: 3200,
        image: '/uploads/products/HerbicideConcentrate.png',
        category: 'agro-chemicals',
        stock: 75,
        description: 'Effective herbicide for weed control',
        longDescription: 'Professional-grade herbicide concentrate for effective weed control. Safe for crops when used as directed. This powerful formula targets weeds while protecting your valuable crops, ensuring maximum yield.',
        status: 'in-stock'
    },
    {
        name: 'Organic Insecticide',
        price: 2900,
        image: '/uploads/products/insecticide.png',
        category: 'agro-chemicals',
        stock: 12,
        description: 'Eco-friendly insecticide solution',
        longDescription: 'Organic insecticide made from natural ingredients. Effective against pests while being environmentally friendly. Safe for beneficial insects and the environment, this solution provides effective pest control without harmful chemicals.',
        status: 'low-stock'
    },


];

const seedDB = async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Seeded products');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
