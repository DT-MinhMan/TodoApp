import React, { useState } from "react";
import {Card} from "./ui/card";
import {cn} from "@/lib/utils";
import {Button} from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { Circle } from "lucide-react";
import {Input} from "./ui/input";
import {Calendar} from "lucide-react";
import {SquarePen} from "lucide-react";
import {Trash2} from "lucide-react";
import { toast } from "sonner"; 
import api from "../lib/axios"

const TaskCard = ({task, index, handleTaskChange}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    // Xử lý xóa dữ liệu
    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Task deleted successfully");
            handleTaskChange();
        } catch (error) {
            console.error("Error when delete task", error);
            toast.error("Error when delete task");
        }
    }


    //Xử lý cập nhật dữ liệu
    const updateTask = async () => {
        try {
            setIsEditing(false);
            await api.put(`/tasks/${task._id}`,{
                title: updateTaskTitle
            });
            toast.success(`Update task complete become ${updateTaskTitle}`);
            handleTaskChange();
        } catch (error) {
            console.error("Error when update task", error);
            toast.error("Error when update task");
        }
    }

    //Xử lý nút tròn đánh dấu task đã hoàn thành
    const toggleTaskCompleteButton = async() =>{
        try {
            if (task.status === "active"){
                await api.put(`/tasks/${task._id}`,{
                    status : "completed",
                    completedAt: new Date().toISOString()
                });
            toast.success(`${task.title} completed`);
            } else {
                await api.put(`/tasks/${task._id}`,{
                    status : "active",
                    completedAt: null
                });
                toast.success(`${task.title} become activate`);
            }
            handleTaskChange();
        } catch (error) {
            console.error("Error when change status task", error);
            toast.error("Error when change status task");
        }
    };

    //Trường hợp người dùng nhấn enter để tạo nhiệm vụ mới
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            updateTask();
        }
    };

    return (
       <Card className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadw-custom-lg transition-all duration-200 animate-fade-in group", task.status === 'completed' && 'opacity-75'
       )}
        style={{ animationDelay: `${index * 50}ms` }}
       >
        <div className="flex items-center gap-4">
             {/*Nút tròn đánh dấu hoàn thành*/ }
            <Button
                variant='ghost'
                size='icon'
                className={cn(
                    "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                    task.status === 'completed' ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
                )}
                onClick = {toggleTaskCompleteButton}
            >
                {
                    task.status === 'completed' ? <CheckCircle2 className="size-5" /> 
                    : <Circle className="size-5" />
                }
            </Button>

            {/*Hiển thị hoặc chỉnh sửa tiêu đề nhiệm vụ*/ }
            <div className="flex-1 min-w-0">
                {
                    isEditing ? (
                        <Input
                            placeholder="Edit task title..."
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(event)=> setUpdateTaskTitle(event.target.value)}
                            onKeyPress = {handleKeyPress}
                            onBlur={()=>{
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    )
                    : (
                        <p 
                            className= {cn("text-base transition-all duration-200", 
                            task.status === 'completed' ? "line-through text-muted-foreground" 
                            : "text-foreground")}
                        >
                            {task.title}
                        </p>
                    )
                }
                    {/* Ngày tạo và ngày hoàn thành */ }
            <div className="flex items-center gap-2 mt-1">
                <Calendar className="size-3 text-muted-foreground"/>
                <span className="text-xs text-muted-foreground">
                    {
                        new Date(task.createdAt).toLocaleDateString()
                    }
                </span>
                {
                    task.completedAt && (
                        <>
                            <span className="text-xs text-muted-foreground"> - </span>
                            <Calendar className="size-3 text-muted-foreground"/>
                            <span className="text-xs text-muted-foreground">
                                {new Date(task.completedAt).toLocaleDateString()}
                            </span>
                        </>
                    )
                }
            </div>
        </div>

        

            {/* Nút chỉnh sửa và xóa */ }
            <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                {/* Nút chỉnh sửa */ }
                <Button
                    variant="ghost"  
                    size = "icon"
                    className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                    onClick={()=>{
                        setIsEditing(true);
                        setUpdateTaskTitle(task.title || "");
                    }}
                >
                    <SquarePen className="size-4"/>
                </Button>

                {/* Nút xóa */ }
                <Button
                    variant="ghost"
                    size = "icon"
                    className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                    onClick = {() => deleteTask(task._id)}
                >
                    <Trash2 className="size-4"/>
                </Button>
            </div>

        </div>
       </Card>
    );
}

export default TaskCard;