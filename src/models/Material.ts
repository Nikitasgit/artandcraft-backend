import mongoose, { Types } from "mongoose";

export interface IMaterial {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  keywords: string[];
  supplier: Types.ObjectId;
}

const materialSchema = new mongoose.Schema<IMaterial>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  keywords: [String, { unique: true }],
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
});

export default mongoose.model("Material", materialSchema);
