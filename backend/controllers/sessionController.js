import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    const { duration, calories, muscleGroup, date } = req.body;
    const userId = req.user.id;
    const session = new Session({
      userId,
      date,
      duration,
      calories,
      muscleGroup,
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de la séance." });
  }
};

export const getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ userId }).sort({ date: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des séances." });
  }
};
