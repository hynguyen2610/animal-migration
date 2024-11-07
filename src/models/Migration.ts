import { Schema, model, Document } from 'mongoose';

interface Migration extends Document {
  name: string;
  executedAt: Date;
}

const migrationSchema = new Schema<Migration>({
  name: { type: String, required: true, unique: true },
  executedAt: { type: Date, default: Date.now },
});

const Migration = model<Migration>('Migration', migrationSchema);

export default Migration;
