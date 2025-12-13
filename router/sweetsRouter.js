const express = require('express');
const router = express.Router();
const Sweet = require('../models/Sweet');
const { authMiddleware , adminMiddleware} = require('../middleware/authMiddleware');

// Add a new sweet
router.post('/',authMiddleware,adminMiddleware,async (req, res) => {
  const sweets = req.body;
  try{
    const newSweet = new Sweet(sweets);
    const response = await newSweet.save();
    res.status(201).json({message: "Sweet added successfully", response: response});
    console.log("Sweet added:", response);
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error",error: err});
  }
});

// Get all sweets
router.get('/',authMiddleware, async (req, res) => {
  try{
    const sweets =  await Sweet.find({});
    res.status(200).json({reportErroresponse: sweets});
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error",error: err});
  }
});


// Update sweet details
router.put('/:id',authMiddleware,adminMiddleware, async (req, res) => {
  const sweetId = req.params.id;
  const updateData = req.body;
  try{
    const updatedSweet = await Sweet.findByIdAndUpdate(sweetId, updateData, {new: true});
    res.status(200).json({message: "Sweet updated successfully", response: updatedSweet});
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error",error: err});
  }
});


// Delete a sweet
router.delete('/:id',authMiddleware,adminMiddleware, async (req, res) => {
  const sweetId = req.params.id;
  try{
    const Sweent = await Sweet.findByIdAndDelete(sweetId);
    console.log("Sweet deleted:", Sweent);
    res.status(200).json({message: "Sweet deleted successfully"});
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error",error: err});
  }
});

// Search sweets
router.get('/search',authMiddleware, async (req, res) => {
  const { name, category , minPrice, maxPrice } = req.query;
  let filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }
  try {
    const sweets = await Sweet.find(filter);
    res.status(200).json({ response: sweets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  } 
});

// Purchase sweets
router.post('/:id/purchase',authMiddleware, async (req, res) => {
    const sweetId = req.params.id;
    const {quantity} = req.body;
    try {
        const sweet = await Sweet.findById(sweetId);
        if (!sweet) {
            return res.status(404).json({ message: "Sweet not found" });
        }
        if (sweet.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }
        sweet.quantity -= quantity;
        await sweet.save();
        res.status(200).json({ message: "Purchase successful", sweet: sweet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

// Restock sweets
router.post('/:id/restock',authMiddleware,adminMiddleware, async (req, res) => {
    const sweetId = req.params.id;
    const { quantity } = req.body;
    try {
        const sweet = await Sweet.findById(sweetId);
        if (!sweet) {
            return res.status(404).json({ message: "Sweet not found" });
        }
        sweet.quantity += quantity;
        const response = await sweet.save();
        res.status(200).json({ message: "Restock successful", sweet: response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }   
});

module.exports = router;