import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
