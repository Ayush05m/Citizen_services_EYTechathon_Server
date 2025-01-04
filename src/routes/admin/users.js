import express from 'express';
import { adminAuth } from '../../middleware/adminAuth.js';
import {
  getAllUsers,
  getAllUsersCount,
  getUserById,
  updateUserStatus,
  getUserStats
} from '../../controllers/admin/userController.js';

const router = express.Router();

// Admin Protected
router.use(adminAuth)
router.get('/', getAllUsers);
router.get('/count', getAllUsersCount);
router.get('/:id', getUserById);
router.patch('/:id/status', updateUserStatus);
router.get('/stats/overview', getUserStats);

export default router;