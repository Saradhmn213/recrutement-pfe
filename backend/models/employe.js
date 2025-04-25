// server/models/Candidat.js
const mongoose = require('mongoose');

const candidatSchema = new mongoose.Schema({
  nom: String,
  email: String,
  posteRecherche: String,
  experience: Number
});

module.exports = mongoose.model('Candidat', candidatSchema);

