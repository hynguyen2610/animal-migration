import { Router } from 'express';
import Animal from '../models/Animal';

const router = Router();

// GET /animals - Retrieve list of animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving animals', error: err });
  }
});

export default router;
