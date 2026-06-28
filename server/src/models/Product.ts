import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    description: string;
    longDescription: string;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    status: {
        type: String,
        enum: ['in-stock', 'low-stock', 'out-of-stock'],
        default: 'in-stock'
    }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
