import { Document, model, Schema } from "mongoose";

export type TAdopt = {
  imageUrl: string;
  name: string;
  description: string;
};

export interface IAdopt extends TAdopt, Document {}

const adoptSchema: Schema = new Schema({
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
});

const Adopt = model<TAdopt>("Adopt", adoptSchema);

export default Adopt;
