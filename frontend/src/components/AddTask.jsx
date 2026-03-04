import React, { useState } from "react";
import {Card} from "./ui/card";
import {Input} from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner"; 
import api from "../lib/axios"

const AddTask = ({handleNewTaskAdded}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    
    //Xử lý thêm dữ liệu
    const addTask = async () => {
        //Kiểm tra người dùng đã nhập thông tin chưa
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", {title: newTaskTitle});
                toast.success(`Task ${newTaskTitle} created successfully`);
                handleNewTaskAdded(); //Thông báo cho component cha biết khi có task mới được tạo
            } catch (error) {
                console.error("Error when add new task",error);
                toast.error("Error when add new task");
            }
            // Đặt lại input thành rỗng sau khi thêm task
            setNewTaskTitle("")
        } else {
            toast.error("You need fill your task")
        }
    };

    //Trường hợp người dùng nhấn enter để tạo nhiệm vụ mới
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    return(
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <Input 
                type="text"
                placeholder="Enter a new task..."
                className="h-12 text-base bg-slate-50 sm:flex-1 border border-primary/50 focus:ring-primary/20"  
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                onKeyPress={handleKeyPress}          
               />

                <Button 
                    variant="gradient"
                    size="lg"
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5"/>
                    Add Task
                </Button>
            </div>
        </Card>
    );
}

export default AddTask;