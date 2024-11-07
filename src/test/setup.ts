import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Animal from '../models/Animal';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Set up an in-memory MongoDB server before tests
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  // Close the in-memory MongoDB server after tests
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clean up the database before each test to ensure isolation
  await Animal.deleteMany({});
});

export {};
