import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const settingsSchema = new mongoose.Schema({}, { strict: false });
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

const fixDate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find all settings
    const allSettings = await Settings.find();
    console.log(`Found ${allSettings.length} settings documents.`);
    
    if (allSettings.length > 0) {
      // Keep the one that has loveReasons or just the first one
      const mainSettings = allSettings[0];
      
      // Delete duplicates
      if (allSettings.length > 1) {
         console.log(`Deleting ${allSettings.length - 1} duplicate settings documents...`);
         for (let i = 1; i < allSettings.length; i++) {
            await Settings.findByIdAndDelete(allSettings[i]._id);
         }
      }
      
      mainSettings.set('relationshipStartDate', new Date('2025-11-21T00:00:00.000Z'));
      await mainSettings.save();
      console.log('Force updated relationship start date to Nov 21, 2025 on the primary document!');
    } else {
      console.log('No settings found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixDate();
