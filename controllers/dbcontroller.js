import express from 'express';
import { seedFromCsv } from '../utils/seedUtils.js';
import { brandModel } from '../models/brandModel.js';
import { categoryModel } from '../models/categoryModel.js';
import { carModel } from '../models/carModel.js';

const dbController = express.Router();

// Endpoint to synchronize the database
dbController.get('/sync', async (req, res) => {
  try {
    const resp = await dbConfig.sync({ force: true });
    res.send('Data successfully synchronized');
  } catch (err) {
    res.send(err);
  }
});

// Seed database fra CSV filer
dbController.get('/seedfromcsv', async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
    await seedFromCsv('brands.csv', brandModel);
    await seedFromCsv('categories.csv', categoryModel);
    await seedFromCsv('cars.csv', carModel);

    // Send succes respons
    res.send({ message: 'Seeding completed' });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});

export default dbController;