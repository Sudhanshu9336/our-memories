import Place from '../models/Place.js';
import Media from '../models/Media.js';

export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ date: -1 });
    
    // Add media count
    const placesWithCounts = await Promise.all(places.map(async (place) => {
      const photosCount = await Media.countDocuments({ placeId: place._id, type: 'image' });
      const videosCount = await Media.countDocuments({ placeId: place._id, type: 'video' });
      return { ...place._doc, photosCount, videosCount };
    }));

    res.json(placesWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  try {
    const { name, description, coverImage, date } = req.body;
    const place = await Place.create({ name, description, coverImage, date });
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    // Note: should delete media associated with this place from cloudinary too
    // For simplicity, we just remove the db records
    await Media.deleteMany({ placeId: place._id });
    await place.deleteOne();
    res.json({ message: 'Place removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
