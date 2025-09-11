import Session from "../models/Session.js";
import User from "../models/user.js";

// Récupérer les stats pour le dashboard
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔹 Total des séances
    const totalSessions = (await Session.countDocuments({ userId })) || 0;

    // 🔹 Heures ce mois
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const sessionsThisMonth = await Session.aggregate([
      { $match: { userId, date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, totalDuration: { $sum: "$duration" } } },
    ]);

    const hoursThisMonth = (sessionsThisMonth[0]?.totalDuration || 0) / 60;

    // 🔹 Poids actuel + objectif
    const user = await User.findById(userId);

    res.json({
      totalSessions,
      hoursThisMonth,
      currentWeight: user.weight,
      targetWeight: user.targetWeight,
    });
  } catch (error) {
    console.error("❌ Dashboard error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
