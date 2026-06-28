import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
    // Add payment fields here later
}

const paymentSchema = new mongoose.Schema({
    
})

export default mongoose.model<IPayment>("Payment", paymentSchema);