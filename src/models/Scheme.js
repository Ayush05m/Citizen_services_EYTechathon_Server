import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibilityCriteria: {
    type: String,
    required: true
  },
  requiredDocuments: [{
    type: String,
    required: true
  }],
  benefits: [{
    type: String,
    required: true
  }],
  applicationDeadline: Date,
  category: {
    type: String,
    enum: ['education', 'health', 'housing', 'employment', 'company'],
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Scheme', schemeSchema); 