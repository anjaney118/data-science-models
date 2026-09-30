const express = require('express');
const router = express.Router();
const Algorithm = require('../models/Algorithm');

// POST /api/algorithms — save a new algorithm
router.post('/', async (req, res) => {
  try {
    const algorithm = new Algorithm(req.body);
    const saved = await algorithm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/algorithms — fetch all algorithms
router.get('/', async (req, res) => {
  try {
    const algorithms = await Algorithm.find();
    res.json(algorithms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
