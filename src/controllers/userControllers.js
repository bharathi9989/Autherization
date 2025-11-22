import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "please fill require fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exist" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "user created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

// ----------Login-------------//

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "please fill require fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "invalid username and password" });
    }

    // ---- Genarate Token -----//

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ message: "login successfully", token });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server Error",
    });
  }

  //  ---------- GETME --------------//
};
export const getMe = async (req, res) => {
  try {
    // req.user comes from verifyToken middleware
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
