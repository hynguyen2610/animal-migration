import { BaseMigration } from './BaseMigration';
import Animal from '../models/Animal';

export class AppendIsHereMigration extends BaseMigration {
  name = 'appendIsHere';  // Migration name

  // Implement the migration logic
  async run(): Promise<void> {
    const animals = await Animal.find();
    for (const animal of animals) {
      animal.name = `${animal.name} is here`;
      await animal.save();
    }
  }
}
