import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('documents');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, profile } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();
    
    const updatedUser = await User.findById(req.userId)
      .select('-password')
      .populate('documents');
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get recommended schemes based on user profile
router.get('/recommended-schemes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Here you would typically implement recommendation logic based on user profile
    // For now, we'll return all schemes
    const schemes = await Scheme.find();
    
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

export default router; 