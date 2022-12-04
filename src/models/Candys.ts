import { Document, model, Schema } from "mongoose";

export type TCandy = {
  imageUrl: string;
  name: string;
  description: string;
  birthday: Date;
};

export interface ICandy extends TCandy, Document {}

const candySchema: Schema = new Schema({
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
    type: Date,
    default: Date.now,
  },
});

const Candy = model<TCandy>("Coffee", candySchema);

export default Candy;
