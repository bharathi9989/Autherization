import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema({
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

// --- HASH PASSWORD BEFORE SAVE ---//

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
  const hashedPassword = this.password;
  next();
});

const User = model("User", userSchema);

export default User;
