// back/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ApiResponse = require("../models/apiResponse");
const User = require("../models/user");

const router = express.Router();

// INSCRIPTION
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Cet email est déjà utilisé",
        })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json(
      new ApiResponse({
        success: true,
        message: "Utilisateur créé avec succès",
        data: newUser,
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse({
        success: false,
        message: error.message,
      })
    );
  }
});

// CONNEXION
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(
        new ApiResponse({
          success: false,
          message: "Email ou mot de passe incorrect",
        })
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(
        new ApiResponse({
          success: false,
          message: "Email ou mot de passe incorrect",
        })
      );
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json(
      new ApiResponse({
        success: true,
        message: "Connexion réussie",
        data: {
          token,
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        },
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse({
        success: false,
        message: error.message,
      })
    );
  }
});

module.exports = router;
