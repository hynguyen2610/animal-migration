import Animal from '../models/Animal'; // Replace with the actual path to your Animal model
import { AppendIsHereMigration } from '../migrations/AppendIsHereMigration'; // Replace with the actual path

describe('appendIsHereMigration', () => {
  it('should append " is here" to all animal names', async () => {
    // Insert some test data
    const animal1 = new Animal({ name: 'Lion' });
    const animal2 = new Animal({ name: 'Tiger' });
    await animal1.save();
    await animal2.save();

    // Run the migration
    await new AppendIsHereMigration().execute();

    // Fetch the updated animals
    const updatedAnimal1 = await Animal.findById(animal1._id);
    const updatedAnimal2 = await Animal.findById(animal2._id);

    // Check the results
    expect(updatedAnimal1?.name).toBe('Lion is here');
    expect(updatedAnimal2?.name).toBe('Tiger is here');
  });
});
