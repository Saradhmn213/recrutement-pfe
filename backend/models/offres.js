const express = require('express');
const router = express.Router();
const Offre = require('../models/offres');

// 📌 Route POST : ajouter une offre
router.post('/', async (req, res) => {
  try {
    const nouvelleOffre = new Offre(req.body);
    await nouvelleOffre.save();
    res.status(201).json({ message: 'Offre ajoutée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'offre" });
  }
});

// 📌 Route GET : récupérer toutes les offres
router.get('/', async (req, res) => {
  try {
    const offres = await Offre.find().sort({ dateAjout: -1 });
    res.json(offres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des offres" });
  }
});

module.exports = router;
