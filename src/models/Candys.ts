import { Document, model, Schema } from "mongoose";

export type TCandy = {
  imageUrl: string;
  name: string;
  description: string;
  money: String;
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
  money: {
    type: String,
  },
});

const Candy = model<TCandy>("Coffee", candySchema);

export default Candy;
