import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Générer le hash du mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Créer l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Erreur création utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
