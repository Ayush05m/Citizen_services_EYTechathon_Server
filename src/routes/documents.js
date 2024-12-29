import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import { uploadDocument, verifyDocument, getAllDocuments, getDocumentById, deleteDocument } from '../controllers/user/documentController.js';

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
router.post('/upload', auth, upload.single('document'), uploadDocument);

// Get all documents for a user
router.get('/', auth, getAllDocuments);

// Get a specific document
router.get('/:id', auth, getDocumentById);

// Verify a document
router.post('/:id/verify', auth, verifyDocument);

// delete a document
router.delete('/:id', auth, deleteDocument);

export default router; 