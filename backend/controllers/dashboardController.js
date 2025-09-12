import mongoose from "mongoose";
import Session from "../models/Session.js";
import User from "../models/user.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // 🔹 Total des séances + Heures ce mois + récupérer toutes les séances de ce mois
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

    const monthAggregation = await Session.aggregate([
      { $match: { userId, date: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: "$duration" },
          totalSessions: { $sum: 1 },
        },
      },
    ]);

    const totalSessions = monthAggregation[0]?.totalSessions || 0;
    const hoursThisMonth = (monthAggregation[0]?.totalDuration || 0) / 60;

    // 🔹 Dernières 3 séances
    const lastSessions = await Session.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    const today = new Date();
    const day = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((day + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weekSessions = await Session.find({
      userId,
      date: { $gte: monday, $lte: sunday },
    }).sort({ date: 1 });

    const sessionsByDay = Array(7).fill(0);
    weekSessions.forEach((s) => {
      const sDate = new Date(s.date);
      const dayIndex = (sDate.getDay() + 6) % 7;
      sessionsByDay[dayIndex] += s.calories || 0;
    });

    // 🔹 Infos utilisateur
    const user = await User.findById(userId);

    res.json({
      totalSessions,
      hoursThisMonth,
      currentWeight: user?.weight || 0,
      targetWeight: user?.targetWeight || 0,
      lastSessions,
      sessionsByDay,
    });
  } catch (error) {
    console.error("❌ Dashboard error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
