import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    age: Number,
    income: Number,
    location: String,
    occupation: String,
    familySize: Number
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema); 