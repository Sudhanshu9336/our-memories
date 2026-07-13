import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';
import { getSettings, updateSettings, verifyUser } from '../controllers/settingsController.js';
import { getPlaces, getPlaceById, createPlace, updatePlace, deletePlace } from '../controllers/placeController.js';
import { getMediaByPlace, uploadMedia, deleteMedia, reorderMedia } from '../controllers/mediaController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Auth Routes
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin); // Should be removed or protected later

// Settings & Verification
router.get('/settings', getSettings);
router.post('/verify', verifyUser);
router.put('/settings', protect, updateSettings);

// Avatar Upload (for surprise animation)
router.post('/settings/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ url: req.file.path || req.file.secure_url || req.file.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Places
router.get('/places', getPlaces); // Open for verified users (frontend will handle block if not verified)
router.get('/places/:id', getPlaceById);
router.post('/places', protect, createPlace);
router.put('/places/:id', protect, updatePlace);
router.delete('/places/:id', protect, deletePlace);

// Media
router.get('/media/:placeId', getMediaByPlace);
router.post('/media/upload', protect, upload.single('file'), uploadMedia);
router.delete('/media/:id', protect, deleteMedia);
router.put('/media/reorder', protect, reorderMedia);

export default router;
