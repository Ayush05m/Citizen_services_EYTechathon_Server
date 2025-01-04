import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  eligibilityCriteria: {
    type: [String],
    required: true
  },
  requiredDocuments: [{
    type: String,
    required: true
  }],
  applicationProcess: {
    type: [String],
  },
  benefits: {
    type: String,
    required: true
  },
  applicationDeadline: String,
  category: {
    type: String,
    enum: ['education', 'health', 'housing', 'employment', 'company'],
  },
  exclusion: {
    type: [String],
  },
}, { timestamps: true });

export default mongoose.model('Scheme', schemeSchema); 