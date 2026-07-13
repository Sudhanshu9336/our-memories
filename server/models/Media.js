import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true }, // For deletion from Cloudinary
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);
export default Media;
