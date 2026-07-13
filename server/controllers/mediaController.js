import Media from '../models/Media.js';
import cloudinary from '../config/cloudinary.js';

export const getMediaByPlace = async (req, res) => {
  try {
    const media = await Media.find({ placeId: req.params.placeId }).sort({ order: 1, createdAt: 1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { placeId } = req.body;
    const isVideo = req.file.mimetype.startsWith('video/');

    const media = await Media.create({
      placeId,
      type: isVideo ? 'video' : 'image',
      url: req.file.path,
      publicId: req.file.filename,
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMediaUrl = async (req, res) => {
  try {
    const { placeId, url, type } = req.body;
    
    if (!url) {
      return res.status(400).json({ message: 'No URL provided' });
    }

    const media = await Media.create({
      placeId,
      type: type || 'image',
      url: url,
      publicId: 'url_' + Date.now(),
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    // Delete from cloudinary if it's an uploaded file
    if (media.publicId && !media.publicId.startsWith('url_')) {
      await cloudinary.uploader.destroy(media.publicId, { resource_type: media.type === 'video' ? 'video' : 'image' });
    }
    
    await media.deleteOne();

    res.json({ message: 'Media removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderMedia = async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, order }
    
    for (const item of items) {
      await Media.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: 'Media reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
