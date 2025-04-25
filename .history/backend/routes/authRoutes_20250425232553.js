const express = require("express");
const ApiResponse = require("../models/apiResponse");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = new User({ firstname, lastname, email, password });
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json(
        new ApiResponse({
          success: false,
          message: "Email ou mot de passe incorrect",
        })
      );
    }
    res.status(200).json(
      new ApiResponse({
        success: true,
        message: "Connexion réussie",
        data: user,
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
