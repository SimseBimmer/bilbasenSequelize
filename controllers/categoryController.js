import express from 'express';
import { categoryModel } from '../models/categoryModel.js';

const categoryController = express.Router();

// READ: Route til at hente liste
categoryController.get('/', async (req, res) => {
  try {
    const categories = await categoryModel.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Route til at hente detaljer
categoryController.get('/:id([0-9]*)', async (req, res) => {
  try {
    const category = await categoryModel.findOne({ where: { id: req.params.id } });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE: Route til at oprette
categoryController.post('/', async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Route til at opdatere
categoryController.put('/:id([0-9]*)', async (req, res) => {
  try {
    const [updated] = await categoryModel.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCategory = await categoryModel.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Route til at slette
categoryController.delete('/:id([0-9]*)', async (req, res) => {
  try {
    const deleted = await categoryModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default categoryController;