import mongoose, { Types } from "mongoose";

export interface ISupplier {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const supplierSchema = new mongoose.Schema<ISupplier>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

export default mongoose.model("Supplier", supplierSchema);
