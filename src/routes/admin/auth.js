import express from 'express';
import { login, getProfile } from '../../controllers/admin/authController.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', adminAuth, getProfile);

export default router;