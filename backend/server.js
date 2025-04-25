// server.js
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js'; // Assure-toi d'importer ton modèle User
import bcrypt from 'bcryptjs'; // Pour sécuriser les mots de passe
import jwt from 'jsonwebtoken'; // Pour créer un token d'authentification

const app = express();

// Connexion à MongoDB
mongoose
  .connect('mongodb://localhost:27017/pfe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connexion à MongoDB réussie'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

app.use(express.json()); // Middleware pour parser le JSON

// Route d'inscription
app.post('/api/register', async (req, res) => {
  const { nom, email, password, role } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new User({
      nom,
      email,
      password: hashedPassword,
      role,
    });

    // Enregistrement de l'utilisateur dans la base de données
    await newUser.save();

    // Création d'un token JWT pour la session (optionnel, pour l'authentification)
    const token = jwt.sign({ userId: newUser._id }, 'votre_clé_secrète', { expiresIn: '1h' });

    // Retourne la réponse avec le rôle de l'utilisateur
    res.status(201).json({ message: 'Utilisateur inscrit avec succès', role: newUser.role, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
