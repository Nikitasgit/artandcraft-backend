import mongoose, { Types } from "mongoose";

export interface IMaterial {
  _id?: Types.ObjectId;
  name: string;
  type: string;
  keywords: string[];
  supplier: Types.ObjectId;
}

const materialSchema = new mongoose.Schema<IMaterial>({
  name: { type: String, required: true },
  type: { type: String, enum: ["wood", "metal", "plastic"], required: true },
  keywords: [String],
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
});

export default mongoose.model("Material", materialSchema);
