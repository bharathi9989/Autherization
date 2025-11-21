import User from "../model/UserModel.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "please fill require fields" });
    }
    const existingUser = await User.findOne(email);
    if (existingUser) {
      return res.status(401).json({ message: "user already exist" });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
export const login = (req, res) => {
  res.status(201).json({
    success: true,
    message: "user loged in successfully",
  });
};
export const getMe = (req, res) => {
  res.status(201).json({
    success: true,
    message: "user loged in successfully",
  });
};
