import React from "react";

const Footer = ({completedTaskCount = 0, activeTaskCount = 0}) => {
    return <>
        {
            /* Thiết lập điều kiện hiển thị footer */
            completedTaskCount + activeTaskCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {
                            completedTaskCount > 0 &&  (
                                <>
                                    Congratulation !!! you have completed {completedTaskCount} tasks.
                                    {
                                        activeTaskCount > 0 && (`, keep up the good work and complete the remaining ${activeTaskCount} tasks!`)
                                    }
                                </>
                            )
                        }

                        {
                            completedTaskCount === 0 && activeTaskCount > 0 && (
                                <>
                                    You have {activeTaskCount} active tasks. Stay focused and complete them to achieve your goals!
                                </>
                            )
                        }
                    </p>

                </div>
            )

        }
        </>
       
}

export default Footer;
