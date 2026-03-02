import express from "express";
import taskRoute from "./routes/taskRouters.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware parse dữ liệu JSON từ request body

app.use("/api/tasks", taskRoute);

connectDB().then(() => { // Kết nối db thành công mới bắt đầu server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})




