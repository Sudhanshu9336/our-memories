import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await Admin.findOne({ email: 'admin@ourmemories.com' });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await Admin.create({ email: 'admin@ourmemories.com', password: hashedPassword });
      console.log('Admin seeded: admin@ourmemories.com / password123');
    } else {
      console.log('Admin already exists.');
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seed();
