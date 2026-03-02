import React from "react";
import {Card} from "./ui/card";
import {Circle} from "lucide-react";

const TaskEmptyState = (filter) => {
    return (
        <Card className= " p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <Circle className="mx-auto size-12 text-muted-foreground"/>
                <div>
                    <h3 className="font-medium text-foreground">
                        {
                            filter === "active" ? "No active tasks" 
                            : filter === "completed" ? "No completed tasks"
                            : "No tasks found"
                        }
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {
                            filter === "all" ? "You should add some tasks to stay organized and productive!"
                            : "Change the filter to 'All' to see all tasks or add new tasks to see them here." + (filter ==="active" ? " Don't forget to mark tasks as completed when you're done!" : " Keep up the good work and stay productive!")
                        }
                    </p>
                </div>
            </div>

        </Card>
        
    )
}

export default TaskEmptyState;