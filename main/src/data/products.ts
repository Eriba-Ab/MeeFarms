import { Product } from '@/types/product';

export const products: Product[] = [
  // Crops
  {
    id: '1',
    name: 'Premium Rice',
    price: 2500,
    image: '/src/assets/products-crops.jpg',
    category: 'crops',
    stock: 100,
    description: 'High-quality Nigerian rice, freshly harvested',
    longDescription: 'Our premium rice is grown using sustainable farming practices in the fertile lands of Nigeria. Rich in nutrients and perfect for all your cooking needs.',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Fresh Maize',
    price: 1800,
    image: '/src/assets/products-crops.jpg',
    category: 'crops',
    stock: 50,
    description: 'Sweet and nutritious maize corn',
    longDescription: 'Freshly harvested maize with exceptional sweetness and nutritional value. Perfect for cooking, processing, or direct consumption.',
    status: 'in-stock'
  },
  {
    id: '3',
    name: 'Organic Cassava',
    price: 1200,
    image: '/src/assets/products-crops.jpg',
    category: 'crops',
    stock: 15,
    description: 'Fresh cassava tubers, organically grown',
    longDescription: 'Organically grown cassava tubers, perfect for making flour, chips, or traditional dishes. High in carbohydrates and essential nutrients.',
    status: 'low-stock'
  },
  {
    id: '4',
    name: 'Fresh Plantain',
    price: 800,
    image: '/src/assets/products-crops.jpg',
    category: 'crops',
    stock: 0,
    description: 'Sweet and ripe plantain bunches',
    longDescription: 'Fresh plantain bunches at perfect ripeness. Ideal for frying, boiling, or roasting. Rich in potassium and vitamins.',
    status: 'out-of-stock'
  },
  
  // Livestock
  {
    id: '5',
    name: 'Free-Range Chicken',
    price: 3500,
    image: '/src/assets/products-livestock.jpg',
    category: 'livestock',
    stock: 25,
    description: 'Healthy free-range chicken, farm fresh',
    longDescription: 'Our free-range chickens are raised in natural conditions with access to open pastures. They are healthy, organic, and free from harmful chemicals.',
    status: 'in-stock'
  },
  {
    id: '6',
    name: 'Fresh Catfish',
    price: 2800,
    image: '/src/assets/products-livestock.jpg',
    category: 'livestock',
    stock: 40,
    description: 'Live catfish, pond-raised',
    longDescription: 'Fresh catfish raised in our clean ponds with proper nutrition. Rich in protein and omega-3 fatty acids.',
    status: 'in-stock'
  },
  {
    id: '7',
    name: 'Guinea Fowl',
    price: 4200,
    image: '/src/assets/products-livestock.jpg',
    category: 'livestock',
    stock: 8,
    description: 'Premium guinea fowl, naturally raised',
    longDescription: 'Premium guinea fowl raised in natural conditions. Known for their lean meat and unique flavor profile.',
    status: 'low-stock'
  },
  
  // Agro-Chemicals
  {
    id: '8',
    name: 'NPK Fertilizer',
    price: 5500,
    image: '/src/assets/products-crops.jpg',
    category: 'agro-chemicals',
    stock: 200,
    description: 'High-quality NPK fertilizer for crops',
    longDescription: 'Premium NPK fertilizer with balanced nutrients for optimal crop growth. Suitable for all types of crops and soil conditions.',
    status: 'in-stock'
  },
  {
    id: '9',
    name: 'Herbicide Concentrate',
    price: 3200,
    image: '/src/assets/products-crops.jpg',
    category: 'agro-chemicals',
    stock: 75,
    description: 'Effective herbicide for weed control',
    longDescription: 'Professional-grade herbicide concentrate for effective weed control. Safe for crops when used as directed.',
    status: 'in-stock'
  },
  {
    id: '10',
    name: 'Organic Insecticide',
    price: 2900,
    image: '/src/assets/products-crops.jpg',
    category: 'agro-chemicals',
    stock: 12,
    description: 'Eco-friendly insecticide solution',
    longDescription: 'Organic insecticide made from natural ingredients. Effective against pests while being environmentally friendly.',
    status: 'low-stock'
  }
];