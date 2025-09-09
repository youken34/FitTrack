import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

  res.status(200).json({
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};
