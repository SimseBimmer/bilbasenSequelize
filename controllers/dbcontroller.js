import express from 'express';
import dbConfig from '../config/dbConfig.js';
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

export default dbController;