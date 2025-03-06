import express from 'express';
import { carModel } from '../models/carModel.js';

const carController = express.Router();

// READ: Route to get list
carController.get('/', async (req, res) => {
  try {
    const cars = await carModel.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Route to get details
carController.get('/:id([0-9]*)', async (req, res) => {
  try {
    const car = await carModel.findOne({ where: { id: req.params.id } });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE: Route to create
carController.post('/', async (req, res) => {
  try {
    const car = await carModel.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Route to update
carController.put('/:id([0-9]*)', async (req, res) => {
  try {
    const [updated] = await carModel.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCar = await carModel.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedCar);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Route to delete
carController.delete('/:id([0-9]*)', async (req, res) => {
  try {
    const deleted = await carModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Car deleted' });
    } else {
      res.status(404).json({ message: "Couldn't delete car" }); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default carController;