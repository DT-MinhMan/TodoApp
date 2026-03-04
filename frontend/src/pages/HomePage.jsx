import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
import StatsAndFilter from "../components/StatsAndFilters";
import DateTimeFilter from "../components/DateTimeFilter";
import Footer from "../components/Footer";
import { toast } from "sonner"; 
import api from "../lib/axios"
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([]); // Lưu trữ tạm thời danh sách tasks để truyền vào TaskList
  const [activeTasksCount, setActiveTasksCount] = useState(0); 
  const [completedTasksCount, setCompletedTasksCount] = useState(0); 
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('all');
  const [page, setPage] = useState(1);

  // Fetch tasks khi component được load lần đầu tiên hoặc dateQuery thay đổi
  useEffect(() => { 
    fetchTasks();
  }, [dateQuery]);

  const fetchTasks = async () => {
    try {
     const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompletedTasksCount(res.data.completeCount);
      // console.log("Fetched tasks:", res.data);
    }
    catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks. Please try again later.");
    }
  };

  // Tạo biến lưu task theo phân loại active, completed
    const filteredTasks = taskBuffer.filter((task) => {
      switch (filter){
        case "active" : 
          return task.status === "active"
        case "completed":
          return task.status === "completed"
        default:
          return true;
      }
    });

    //Lấy task hiển thị ở trang hiện tại
    const visibleTasks = filteredTasks.slice(
      (page -1) * visibleTaskLimit, page * visibleTaskLimit
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    // Load lại trang nếu người dùng thay đổi data
    const handleTaskChanged = ()=> {
      fetchTasks();
    }

    //Xây dựng hàm tiến lùi qua các trang
    const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen w-full relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
    }}
  />
     <div className="container pt-8 mx-auto relative z-10"> 
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
           
          {/* <Đầu trang /> */}
          <Header/>

          {/* <Thêm nhiệm vụ /> */}
          <AddTask handleNewTaskAdded={handleTaskChanged}/>

          {/* <Thống kê và bộ lọc /> */}
          <StatsAndFilter 
            filter = {filter}
            setFilter = {setFilter}
            activeTasksCount={activeTasksCount} 
            completedTasksCount={completedTasksCount}/>

          {/* <Danh sách nhiệm vụ /> */}
          <TaskList 
          filteredTasks={visibleTasks}
          filter = {filter}
          handleTaskChanged={handleTaskChanged}
          />

          {/*Phân trang và lọc theo ngày*/}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              handleNext ={handleNext}
              handlePrev ={handlePrev}
              handlePageChange ={handlePageChange}
              page ={page}
              totalPages ={totalPages}
              />
            <DateTimeFilter 
              dateQuery={dateQuery} 
              setDateQuery={setDateQuery}
            />
          </div>

          {/* <Chân trang /> */}
          <Footer 
            activeTaskCount={activeTasksCount} 
            completedTaskCount={completedTasksCount}
          />
        </div>
    </div>
</div>
    
  )
}

export default HomePage