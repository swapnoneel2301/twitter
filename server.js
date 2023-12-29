import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./server/config/db.js";
import postRoutes from "./server/routes/postRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import commentRoutes from "./server/routes/commentRoutes.js";

const app = express();
app.use(express.json());
configDotenv();

// connect to Database
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
