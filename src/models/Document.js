import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  url: {
    type: String,
    required: true
  },
  verificationDetails: {
    verifiedAt: Date,
    verifiedBy: String,
    comments: String
  }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema); 