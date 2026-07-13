import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  girlfriendName: { type: String, default: 'My Love' },
  nickname: { type: String, default: 'Babu' },
  birthDate: { type: Date },
  landingPageText: { type: String, default: 'Ready to relive our beautiful moments?' },
  websiteTitle: { type: String, default: 'Our Memories' },
  themeColor: { type: String, default: '#e11d48' }, // Rose 600
  backgroundMusicUrl: { type: String, default: '' },
  // New fields for special features
  boyAvatarUrl: { type: String, default: '' },
  girlAvatarUrl: { type: String, default: '' },
  relationshipStartDate: { type: Date },
  loveReasons: [{ type: String }],
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
