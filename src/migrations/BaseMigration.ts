import Migration from '../models/Migration';

export abstract class BaseMigration {
  abstract name: string;

  // Check if this migration has been executed
  async hasExecuted(): Promise<boolean> {
    const existingMigration = await Migration.findOne({ name: this.name });
    return !!existingMigration;
  }

  // Mark this migration as executed
  async markAsExecuted(): Promise<void> {
    const migration = new Migration({ name: this.name });
    await migration.save();
  }

  // Abstract method that each subclass must implement
  abstract run(): Promise<void>;

  // Method to run the migration logic (checks if already executed and runs the migration if not)
  async execute(): Promise<void> {
    const executed = await this.hasExecuted();
    if (executed) {
      console.log(`Migration "${this.name}" has already been executed.`);
      return;
    }

    console.log(`Running migration "${this.name}"...`);
    await this.run();
    await this.markAsExecuted();
    console.log(`Migration "${this.name}" completed.`);
  }
}
