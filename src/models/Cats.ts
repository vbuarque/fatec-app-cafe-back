import { Document, model, Schema } from "mongoose";

export type TCats = {
  imageUrl: string;
  name: string;
  description: string;
  birthday: Date;
};

export interface ICats extends TCats, Document {}

const catsSchema: Schema = new Schema({
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

const Cats = model<TCats>("Cats", catsSchema);

export default Cats;
