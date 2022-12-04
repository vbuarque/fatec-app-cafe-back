import { Document, model, Schema } from "mongoose";

export type THealth = {
  imageUrl: string;
  name: string;
  description: string;
  money: string;
};

export interface IHealth extends THealth, Document {}

const healthSchema: Schema = new Schema({
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

const Health = model<THealth>("Health", healthSchema);

export default Health;