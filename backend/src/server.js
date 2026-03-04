import express from "express";
import taskRoute from "./routes/taskRouters.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Lấy đường dẫn đến thư mục hiện tại
const __dirname = path.resolve()

// Middleware
if(process.env.NODE_ENV !== "production"){
  app.use(cors()); // Cho phép CORS để frontend có thể gọi API
}
app.use(express.json()); // Middleware parse dữ liệu JSON từ request body

app.use("/api/tasks", taskRoute);

//Chỉ chạy khi đã là prodution hoàn chỉnh
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); //Lấy code từ path thư mục frontend
  //Bất kì url nào người dùng gõ đều trả về index.html
  app.get("*",(req,res) => {
    res.sendFile((path.join(__dirname, "../frontend/dist/index.html")))
  })
}



connectDB().then(() => { // Kết nối db thành công mới bắt đầu server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})




