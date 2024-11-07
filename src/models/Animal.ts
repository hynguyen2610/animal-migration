import { Schema, model, Document } from 'mongoose';

interface Animal extends Document {
  name: string;
  maxAge: number;
}

const animalSchema = new Schema<Animal>({
  name: { type: String, required: true },
  maxAge: { type: Number, default: 0 },
});

const Animal = model<Animal>('Animal', animalSchema);

export default Animal;
