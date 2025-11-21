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

userSchema.pre("save", async () => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = bcrypt.hash(password, salt);
});

const User = model("User", userSchema);

export default User;
