import express from 'express';
import { getAllDocuments, getAllDocumentsCount } from '../../controllers/admin/documentController.js';

const router = express.Router();

router.get('/', getAllDocuments);
router.get('/count', getAllDocumentsCount);
// router.post('/', createScheme);
// router.put('/:id', updateScheme);
// router.delete('/:id', deleteScheme);
// router.get('/stats', getSchemeStats);

export default router;