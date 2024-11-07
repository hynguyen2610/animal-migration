import mongoose from 'mongoose';
import Animal from '../models/Animal'; // Replace with the actual path to your Animal model
import { AppendIsHereMigration } from '../migrations/AppendIsHereMigration'; // Replace with the actual path
import { AppendMaxAgeMigration } from '../migrations/AppendMaxAgeMigration'; // Replace with the actual path
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Migrations', () => {
  let mongoServer: MongoMemoryServer;

  // Set up an in-memory MongoDB server before tests
  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connect to MongoDB
    await mongoose.connect(uri);

    // Optional: wait for MongoDB server to be fully ready
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
  });

  // Close the in-memory MongoDB server after tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clean up the database before each test to ensure isolation
  beforeEach(async () => {
    await Animal.deleteMany({});
  });

  // Test appendIsHereMigration
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

  // Test addMaxAgeMigration
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
});
