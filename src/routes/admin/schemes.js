import express from 'express';
import { adminAuth } from '../../middleware/adminAuth.js';
import {
  getAllSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
  getSchemeStats,
  getAllSchemesCount,
  getSchemeById
} from '../../controllers/admin/schemeController.js';

const router = express.Router();

router.get('/', adminAuth, getAllSchemes);
router.get('/count', adminAuth, getAllSchemesCount);
router.post('/', adminAuth, createScheme);
router.get('/:id', adminAuth, getSchemeById);
router.put('/:id', adminAuth, updateScheme);
router.delete('/:id', adminAuth, deleteScheme);
router.get('/stats', adminAuth, getSchemeStats);

export default router;