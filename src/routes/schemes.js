import express from 'express';
import { auth } from '../middleware/auth.js';
import Scheme from '../models/Scheme.js';
import User from '../models/User.js';
import { getSchemeById, getSchemesQuery } from '../controllers/user/schemeController.js';

const router = express.Router();

// Get all schemes with optional filtering
router.get('/', auth, getSchemesQuery);

// Get a specific scheme
router.get('/:id', auth, getSchemeById);

// Check eligibility for a scheme
router.post('/:id/check-eligibility', auth, async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    const user = await User.findById(req.userId).populate('documents');

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    // Check if user has required documents
    const hasRequiredDocuments = scheme.requiredDocuments.every(docType =>
      user.documents.some(doc => doc.type === docType && doc.status === 'verified')
    );

    // Check eligibility criteria based on user profile
    const meetsAgeCriteria = !scheme.eligibilityCriteria.some(criteria =>
      criteria.includes('age') && !checkAgeCriteria(criteria, user.profile.age)
    );

    const meetsIncomeCriteria = !scheme.eligibilityCriteria.some(criteria =>
      criteria.includes('income') && !checkIncomeCriteria(criteria, user.profile.income)
    );

    const eligible = hasRequiredDocuments && meetsAgeCriteria && meetsIncomeCriteria;

    res.json({
      eligible,
      requiredDocuments: scheme.requiredDocuments,
      missingDocuments: scheme.requiredDocuments.filter(docType =>
        !user.documents.some(doc => doc.type === docType && doc.status === 'verified')
      ),
      eligibilityDetails: {
        hasRequiredDocuments,
        meetsAgeCriteria,
        meetsIncomeCriteria
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking eligibility' });
  }
});

// Helper functions for eligibility checks
function checkAgeCriteria(criteria, age) {
  // Implement age criteria checking logic
  return true; // Placeholder
}

function checkIncomeCriteria(criteria, income) {
  // Implement income criteria checking logic
  return true; // Placeholder
}

export default router; 