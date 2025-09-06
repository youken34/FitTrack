import express from "express";
import dotenv from "dotenv";

// Charger les variables d’environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser le JSON
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Hello, Express + MongoDB!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
