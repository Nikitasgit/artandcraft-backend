import mongoose, { Types } from "mongoose";

export interface IFurniture {
  _id: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  quantity: number;
  materials: {
    material: Types.ObjectId;
    quantity: number;
  }[];
  keywords: string[];
  user: Types.ObjectId;
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
    materials: [
      {
        material: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    keywords: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Furniture", furnitureSchema);
