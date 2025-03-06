import express from 'express';
import { brandModel } from '../models/brandModel.js';

const brandController = express.Router();

// READ: Route til at hente liste
brandController.get('/', async (req, res) => {
  try {
    const brands = await brandModel.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Route til at hente detaljer
brandController.get('/:id([0-9]*)', async (req, res) => {
  try {
    const brand = await brandModel.findOne({ where: { id: req.params.id } });
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE: Route til at oprette
brandController.post('/', async (req, res) => {
  try {
    const brand = await brandModel.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Route til at opdatere
brandController.put('/:id([0-9]*)', async (req, res) => {
  try {
    const [updated] = await brandModel.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedBrand = await brandModel.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedBrand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Route til at slette
brandController.delete('/:id([0-9]*)', async (req, res) => {
  try {
    const deleted = await brandModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Brand deleted' });
    } else {
      res.status(404).json({ message: "Couldn't delete brand" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default brandController;