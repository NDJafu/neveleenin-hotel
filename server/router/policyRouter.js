const router = require('express').Router();
const mongoose = require('mongoose');
const Policy = require('../schema/policy');

// Get all policies for a specific hotel
router.get('/getall/:hotelID', async (req, res) => {
  const hotelID = req.params.hotelID;

  try {
    const policies = await Policy.find({ hotelID });
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new policy for a specific hotel
router.post('/create/:hotelID', async (req, res) => {
  const hotelID = req.params.hotelID;
  const { policyName, description } = req.body;

  const newPolicy = new Policy({ hotelID, policyName, description });

  try {
    await newPolicy.save();
    res.status(201).json({ message: 'Policy created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a policy for a specific hotel
router.put('/:policyID', async (req, res) => {
  const policyID = req.params.policyID;
  const { policyName, description } = req.body;

  try {
    const policy = await Policy.findOne(policyID);

    if (!policy) {
      res.status(404).json({ message: 'Policy not found' });
      return;
    }

    policy.policyName = policyName || policy.policyName;
    policy.description = description || policy.description;

    await policy.save();

    res.status(200).json({ message: 'Policy updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a policy for a specific hotel
router.delete('/:policyID', async (req, res) => {
  const policyID = req.params.policyID;

  try {
    const policy = await Policy.findOneAndDelete(policyID);

    if (!policy) {
      res.status(404).json({ message: 'Policy not found' });
      return;
    }

    res.status(200).json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
