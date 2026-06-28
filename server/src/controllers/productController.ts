import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, search, sort } = req.query;
        let query: any = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let productsQuery = Product.find(query);

        if (sort) {
            switch (sort) {
                case 'name-asc':
                    productsQuery = productsQuery.sort({ name: 1 });
                    break;
                case 'name-desc':
                    productsQuery = productsQuery.sort({ name: -1 });
                    break;
                case 'price-asc':
                    productsQuery = productsQuery.sort({ price: 1 });
                    break;
                case 'price-desc':
                    productsQuery = productsQuery.sort({ price: -1 });
                    break;
                case 'stock-desc':
                    productsQuery = productsQuery.sort({ stock: -1 });
                    break;
            }
        }

        const products = await productsQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, longDescription, price, category, stock, image } = req.body;
        const product = new Product({
            name,
            description,
            longDescription,
            price,
            category,
            stock,
            image
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, longDescription, price, category, stock, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.longDescription = longDescription || product.longDescription;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
