import mongoose, { Types } from "mongoose";

export interface IFurniture {
  _id?: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  quantity: number;
  materials: Types.ObjectId[];
  keywords: string[];
}

const furnitureSchema = new mongoose.Schema<IFurniture>(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    keywords: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Furniture", furnitureSchema);
