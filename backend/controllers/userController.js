import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Contrôleur pour l'inscription
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Cet email est déjà utilisé" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  });
};

// Contrôleur pour le login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email ou mot de passe incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Email ou mot de passe incorrect" });
  }

  const token = generateToken(user._id);
  const lastSessions = await Session.find({ userId: user._id })
    .sort({ date: -1 })
    .limit(3);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      weight: user.weight,
      targetWeight: user.targetWeight,
      weightHistory: user.weightHistory,
      lastSessions: lastSessions,
    },
  });
};

export const updateInfo = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, weight, targetWeight } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    if (weight) {
      user.weight = weight;

      user.weightHistory.push({
        weight: weight,
      });
    }

    user.targetWeight = targetWeight || user.targetWeight;

    await user.save();

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      weight: user.weight,
      targetWeight: user.targetWeight,
      weightHistory: user.weightHistory,
    });
  } catch (error) {
    console.error("❌ updateInfo error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
