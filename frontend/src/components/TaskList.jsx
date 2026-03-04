import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({filteredTasks, filter, handleTaskChanged}) => {
     
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
                handleTaskChange = {handleTaskChanged}
                />
            ))}
        </div>
        
    );
};

export default TaskList;