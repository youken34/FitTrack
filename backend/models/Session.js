import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // en minutes
  calories: { type: Number }, // optionnel
  muscleGroup: {
    type: String,
    enum: ["Dos", "Biceps", "Triceps", "Jambes", "Épaules"],
    required: true,
  },
});

export default mongoose.model("Session", sessionSchema);
