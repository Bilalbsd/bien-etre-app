const Theme = require('../models/theme.model');

// Créer un nouveau thème
exports.createTheme = async (req, res) => {
  try {
    const { id, color } = req.body;
    const theme = await Theme.create({ id, color });
    res.status(201).json({ message: 'Theme created successfully', theme });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create theme', error: error.message });
  }
};

// Obtenir tous les thèmes
exports.getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.findAll();
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get themes', error: error.message });
  }
};

// Obtenir un thème par son ID
exports.getThemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const theme = await Theme.findByPk(id);
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get theme', error: error.message });
  }
};

// Mettre à jour un thème par son ID
exports.updateThemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.body;
    await Theme.update({ color }, { where: { id } });
    res.status(200).json({ message: 'Theme updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update theme', error: error.message });
  }
};

// Supprimer un thème par son ID
exports.deleteThemeById = async (req, res) => {
  try {
    const { id } = req.params;
    await Theme.destroy({ where: { id } });
    res.status(200).json({ message: 'Theme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete theme', error: error.message });
  }
};
