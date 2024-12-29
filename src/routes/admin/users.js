import express from 'express';
import { adminAuth } from '../../middleware/adminAuth.js';
import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  getUserStats
} from '../../controllers/admin/userController.js';

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.get('/:id', adminAuth, getUserById);
router.patch('/:id/status', adminAuth, updateUserStatus);
router.get('/stats/overview', adminAuth, getUserStats);

export default router;