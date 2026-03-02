import React from "react";
import {Card} from "./ui/card";
import {Input} from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTask = () => {
    return(
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <Input 
                type="text"
                placeholder="Enter a new task..."
                className="h-12 text-base bg-slate-50 sm:flex-1 border border-primary/50 focus:ring-primary/20"  
               />

                <Button 
                    variant="gradient"
                    size = "xl"
                    className="px-6"
                >
                    <Plus className="size-5"/>
                    Add Task
                </Button>
            </div>
        </Card>
    );
}

export default AddTask;