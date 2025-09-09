import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  targetWeight: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
