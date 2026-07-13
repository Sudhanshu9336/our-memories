import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String }, 
  date: { type: Date },
}, { timestamps: true });

const mediaSchema = new mongoose.Schema({
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  publicId: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);
const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

const seedMockData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear old data
    await Place.deleteMany({});
    await Media.deleteMany({});
    
    // Create Places
    const place1 = await Place.create({
      name: 'Our First Date',
      description: 'The beautiful evening we first met and talked for hours under the stars.',
      coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop',
      date: new Date('2023-02-14')
    });

    const place2 = await Place.create({
      name: 'Beach Getaway',
      description: 'That amazing weekend trip where we watched the sunset over the ocean.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      date: new Date('2023-06-20')
    });

    const place3 = await Place.create({
      name: 'City Lights',
      description: 'Exploring the downtown area and grabbing late-night ice cream.',
      coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop',
      date: new Date('2023-11-05')
    });

    // Create Media for Place 1
    await Media.insertMany([
      { placeId: place1._id, type: 'image', url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop', order: 1 },
      { placeId: place1._id, type: 'image', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop', order: 2 },
      { placeId: place1._id, type: 'image', url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop', order: 3 },
    ]);

    // Create Media for Place 2
    await Media.insertMany([
      { placeId: place2._id, type: 'image', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop', order: 1 },
      { placeId: place2._id, type: 'image', url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop', order: 2 },
      { placeId: place2._id, type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', order: 3 },
    ]);

    // Create Media for Place 3
    await Media.insertMany([
      { placeId: place3._id, type: 'image', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop', order: 1 },
      { placeId: place3._id, type: 'image', url: 'https://images.unsplash.com/photo-1444065707204-12decac917e8?q=80&w=800&auto=format&fit=crop', order: 2 },
    ]);
    
    console.log('Mock Data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedMockData();
