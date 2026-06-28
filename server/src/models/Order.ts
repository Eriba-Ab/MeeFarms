import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    orderNumber: string;
    user?: mongoose.Types.ObjectId;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
    };
    items: Array<{
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }>;
    total: number;
    paymentMethod: 'cash' | 'transfer';
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    notes?: string;
}

const OrderSchema: Schema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'transfer'],
        default: 'cash'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

export default mongoose.model<IOrder>('Order', OrderSchema);
