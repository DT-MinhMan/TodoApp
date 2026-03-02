import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = () => {
    let filter = "all";
    const filteredTasks = [
        {
            _id: "1",
            title: "learn react",
            status: "active",
            completedAt: null,
            createsAt: new Date(),
        },
        {
            _id: "2",
            title: "learn javascript",
            status: "completed",
            completedAt: new Date(),
            createsAt: new Date(),
        }
    ]; 
    // Lọc tasks dựa trên filter, nếu filter là "all" thì trả về tất cả, nếu "active" thì trả về tasks chưa hoàn thành, nếu "completed" thì trả về tasks đã hoàn thành
    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter}/>;
    }
    return(
        <div className="space-y-3">
            {filteredTasks.map((task, index) => (
                <TaskCard 
                key={task._id ?? index} 
                task={task}
                index = {index}
                />
            ))}
        </div>
        
    );
};

export default TaskList;