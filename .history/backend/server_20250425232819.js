const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./routes/authRoutes");
import bcrypt from "bcryptjs"; // Pour sécuriser les mots de passe
import jwt from "jsonwebtoken"; // Pour créer un token d'authentification

const app = express();

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/pfe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

app.use(express.json());

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
