import { Document, model, Schema } from "mongoose";

export type TCoffee = {
  imageUrl: string;
  name: string;
  description: string;
  money: number;
};

export interface ICoffee extends TCoffee, Document {}

const coffeeSchema: Schema = new Schema({
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
  birthday: {
    type: Number,
  },
});

const Coffee = model<TCoffee>("Coffee", coffeeSchema);

export default Coffee;