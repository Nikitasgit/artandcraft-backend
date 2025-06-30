import mongoose, { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Category", categorySchema);
