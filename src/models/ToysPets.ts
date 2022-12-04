import { Document, model, Schema } from "mongoose";

export type TToys = {
  imageUrl: string;
  name: string;
  description: string;
  money: string;
};

export interface IToys extends TToys, Document {}

const toysSchema: Schema = new Schema({
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

const Toys = model<TToys>("Toys", toysSchema);

export default Toys;