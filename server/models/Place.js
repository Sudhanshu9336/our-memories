import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String }, // URL from cloudinary
  date: { type: Date },
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);
export default Place;
