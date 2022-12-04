import { Document, model, Schema } from "mongoose";

export type TFood = {
  imageUrl: string;
  name: string;
  description: string;
  money: string;
};

export interface IFood extends TFood, Document {}

const foodSchema: Schema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  money: {
    type: String,
  },
});

const Food = model<TFood>("Food", foodSchema);

export default Food;