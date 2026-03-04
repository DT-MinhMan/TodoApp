// Logic xử lý cho các endpoint liên quan đến task
import Task from "../models/Task.js";

// Lấy tất cả nhiệm vụ
export const getAllTasks = async (req, res) => {
    //Xử lý bộ lọc task theo ngày, tháng, năm
    const {filter = "today"} = req.query;
    const now = new Date();
    let startDate;
    switch (filter){
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "week":
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "all":
        default: {
            startDate = null;
        }
    }
    //Câu lệnh truy vấn 
    const query = startDate ? {createdAt:{$gte: startDate}} : {};


   try {
        const result = await Task.aggregate([ // Sử dụng aggregate để thực hiện nhiều phép truy vấn trong một lần gọi
            //Thực hiện lọc theo ngày trước
            {
                $match: query
            },
            {
                $facet: { // Sử dụng $facet để thực hiện 3 pipeline song song
                    tasks: [{$sort: {createdAt: -1}}], // Sắp xếp tasks theo createdAt giảm dần
                    activeCount: [{$match: {status: "active"}}, {$count: "count"}], // Đếm số lượng tasks có status là active
                    completedCount: [{$match: {status: "completed"}}, {$count: "count"}], 
                }
            }
        ])
        const tasks = result[0].tasks; // Lấy danh sách tasks từ kết quả
        const activeCount = result[0].activeCount[0] ?.count || 0; // Lấy số lượng active tasks, nếu không có thì trả về 0
        const completedCount = result[0].completedCount[0] ?.count || 0; 
        res.status(200).json({tasks, activeCount, completedCount}); 
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

