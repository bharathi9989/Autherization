import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 2000;

// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  //   res.status(200).json({ message: "Application is Healthy" });
  res.send("<h1>Application is running well</h1>");
});

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
  connectDB();
});
