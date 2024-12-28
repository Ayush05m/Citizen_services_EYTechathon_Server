import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import Document from '../models/Document.js';
import User from '../models/User.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Upload a new document
router.post('/upload', auth, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const document = new Document({
      user: req.userId,
      type: req.body.type,
      url: `/uploads/${req.file.filename}`,
    });

    await document.save();

    // Add document reference to user
    await User.findByIdAndUpdate(req.userId, {
      $push: { documents: document._id }
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading document' });
  }
});

// Get all documents for a user
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.userId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
});

// Get a specific document
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document' });
  }
});

// Verify a document
router.post('/:id/verify', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Here you would typically integrate with an AI service for verification
    // For now, we'll simulate verification
    document.status = 'verified';
    document.verificationDetails = {
      verifiedAt: new Date(),
      verifiedBy: 'AI System',
      comments: 'Document verified successfully'
    };

    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying document' });
  }
});

export default router; 