// Logic xử lý cho các endpoint liên quan đến task
import Task from "../models/Task.js";

// Lấy tất cả nhiệm vụ
export const getAllTasks = async (req, res) => {
   try {
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks)
   } catch (error) {
        console.error("Lỗi khi gọi API getAllTasks", error)
        res.status(500).json({message: "Lỗi hệ thống"})
   }
}

// Tạo mới nhiệm vụ
export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({title});
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi tạo task", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}   

// Cập nhật nhiệm vụ
export const updateTask = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body;;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt,
            },
            {new : true}
        );
        if (!updatedTask) {
            return res.status(404).json({message: "Nhiệm vụ không tồn tại"});
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Lỗi khi cập nhật task", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

// Xóa nhiệm vụ
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        )
        if (!deletedTask) {
            res.status(404).json({message: "Nhiệm vụ không tồn tại"});
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Lỗi khi xóa task", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

