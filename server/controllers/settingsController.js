import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { name, nickname, birthDate } = req.body;
    const settings = await Settings.findOne();
    
    if (!settings) {
      return res.status(400).json({ message: 'Settings not configured yet.' });
    }

    const isNameMatch = name.toLowerCase() === settings.girlfriendName.toLowerCase();
    const isNicknameMatch = nickname.toLowerCase() === settings.nickname.toLowerCase();
    
    // Compare dates (YYYY-MM-DD format)
    const settingsDate = new Date(settings.birthDate).toISOString().split('T')[0];
    const inputDate = new Date(birthDate).toISOString().split('T')[0];
    
    const isDateMatch = settingsDate === inputDate;

    if (isNameMatch && isNicknameMatch && isDateMatch) {
      res.json({ success: true, message: 'Verification successful' });
    } else {
      res.status(400).json({ success: false, message: 'Oops ❤️ Wrong Answer' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
