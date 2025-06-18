import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Ngo', ngoSchema);
