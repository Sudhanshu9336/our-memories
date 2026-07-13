import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Define schema if not imported to be safe
const settingsSchema = new mongoose.Schema({
  relationshipStartDate: { type: Date },
}, { strict: false }); // strict: false allows us to just update this one field without redefining everything

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

const updateDate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find the first settings document and update it
    const settings = await Settings.findOne();
    if (settings) {
      settings.relationshipStartDate = new Date('2025-11-21');
      await settings.save();
      console.log('Successfully updated relationship start date to Nov 21, 2025!');
    } else {
      console.log('No settings found. Please seed settings first.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateDate();
