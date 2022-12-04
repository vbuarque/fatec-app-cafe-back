import { Document, model, Schema } from "mongoose";

export type TClothes = {
  imageUrl: string;
  name: string;
  description: string;
  money: string;
};

export interface IClothes extends TClothes, Document {}

const clothesSchema: Schema = new Schema({
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

const Clothes = model<TClothes>("Clothes", clothesSchema);

export default Clothes;