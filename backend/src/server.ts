import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth";
import investmentRoutes from "./routes/investments";
import chatRoutes from "./routes/chat";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/chat", chatRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
