import mongoose, { Types } from "mongoose";

export interface ISupplier {
  _id?: Types.ObjectId;
  name: string;
}

const supplierSchema = new mongoose.Schema<ISupplier>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Supplier", supplierSchema);
