import express from 'express';
import { adminAuth } from '../../middleware/adminAuth.js';
import {
  getAllSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
  getSchemeStats
} from '../../controllers/admin/schemeController.js';

const router = express.Router();

router.get('/', adminAuth, getAllSchemes);
router.post('/', adminAuth, createScheme);
router.put('/:id', adminAuth, updateScheme);
router.delete('/:id', adminAuth, deleteScheme);
router.get('/stats', adminAuth, getSchemeStats);

export default router;