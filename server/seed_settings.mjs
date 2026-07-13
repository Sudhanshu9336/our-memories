import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const settingsSchema = new mongoose.Schema({
  girlfriendName: { type: String, default: 'My Love' },
  nickname: { type: String, default: 'Babu' },
  birthDate: { type: Date },
  landingPageText: { type: String, default: 'Ready to relive our beautiful moments?' },
  websiteTitle: { type: String, default: 'Our Memories' },
  themeColor: { type: String, default: '#e11d48' },
  backgroundMusicUrl: { type: String, default: '' },
  boyAvatarUrl: { type: String, default: '' },
  girlAvatarUrl: { type: String, default: '' },
  relationshipStartDate: { type: Date },
  loveReasons: [{ type: String }],
}, { timestamps: true });

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Settings.deleteMany({});
    
    await Settings.create({
      girlfriendName: 'mayank',
      nickname: 'manku',
      birthDate: new Date('2004-08-26'),
      landingPageText: 'Ready to relive our beautiful moments?',
      websiteTitle: 'Our Memories',
      relationshipStartDate: new Date('2025-01-13'),
      loveReasons: [
        'Your smile lights up my entire world',
        'The way you laugh at my terrible jokes',
        'How you always know exactly what to say',
        'Your eyes are the most beautiful thing I have ever seen',
        'Because you make every ordinary day feel extraordinary',
        'The way you hold my hand makes everything better',
        'You are the kindest soul I have ever known',
        'Because home is wherever you are',
        'The way you care about the little things',
        'You make me want to be a better person every single day',
      ],
    });
    
    console.log('Settings seeded with new fields successfully!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seed();
