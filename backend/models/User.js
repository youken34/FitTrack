import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  weight: { type: Number, required: false },
  targetWeight: { type: Number },
  weightHistory: [
    {
      date: { type: Date, default: Date.now },
      weight: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
