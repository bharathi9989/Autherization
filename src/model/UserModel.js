import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// --- HASH PASSWORD BEFORE SAVE ---
userSchema.pre("save", async function (next) {
  // Only hash if the password was modified
  if (!this.isModified("password")) return next();

  const saltRounds = Number(process.env.SALT) || 10; // safe fallback
  const salt = await bcrypt.genSalt(saltRounds);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = model("User", userSchema);

export default User;
