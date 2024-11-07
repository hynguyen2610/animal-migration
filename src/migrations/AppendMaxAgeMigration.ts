import { BaseMigration } from './BaseMigration';
import Animal from '../models/Animal';

export class AppendMaxAgeMigration extends BaseMigration {
  name = 'appendMaxAge';  // Migration name

  // Implement the migration logic
  async run(): Promise<void> {
    const animals = await Animal.find();
    for (const animal of animals) {
      animal.maxAge = 0;
      await animal.save();
    }
  }
}
