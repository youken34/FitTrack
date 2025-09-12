import mongoose from "mongoose";
import Session from "../models/Session.js";
import User from "../models/user.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

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
      {
        $match: {
          userId,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: "$duration" },
        },
      },
    ]);

    const hoursThisMonth = (sessionsThisMonth[0]?.totalDuration || 0) / 60;

    const user = await User.findById(userId);

    const lastSessions = await Session.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    res.json({
      totalSessions,
      hoursThisMonth: hoursThisMonth,
      currentWeight: user?.weight || 0,
      targetWeight: user?.targetWeight || 0,
      lastSessions: lastSessions,
    });
  } catch (error) {
    console.error("❌ Dashboard error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
