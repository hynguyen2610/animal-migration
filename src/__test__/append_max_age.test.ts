// src/__test__/appendMaxAgeMigration.test.ts
import Animal from '../models/Animal'; // Replace with the actual path to your Animal model
import { AppendMaxAgeMigration } from '../migrations/AppendMaxAgeMigration'; // Replace with the actual path

describe('addMaxAgeMigration', () => {
  it('should add a maxAge field with value 0 to all animals', async () => {
    // Insert some test data
    const animal1 = new Animal({ name: 'Lion' });
    const animal2 = new Animal({ name: 'Tiger' });
    await animal1.save();
    await animal2.save();

    // Run the migration
    await new AppendMaxAgeMigration().execute();

    // Fetch the updated animals
    const updatedAnimal1 = await Animal.findById(animal1._id);
    const updatedAnimal2 = await Animal.findById(animal2._id);

    // Check the results
    expect(updatedAnimal1?.maxAge).toBe(0);
    expect(updatedAnimal2?.maxAge).toBe(0);
  });
});
