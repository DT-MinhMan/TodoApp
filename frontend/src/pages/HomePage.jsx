import React from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
import StatsAndFilter from "../components/StatsAndFilters";
import DateTimeFilter from "../components/DateTimeFilter";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
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
          <AddTask/>

          {/* <Thống kê và bộ lọc /> */}
          <StatsAndFilter/>

          {/* <Danh sách nhiệm vụ /> */}
          <TaskList/>

          {/*Phân trang và lọc theo ngày*/}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination/>
            <DateTimeFilter/>
          </div>

          {/* <Chân trang /> */}
          <Footer/>
        </div>
    </div>
</div>
    
  )
}

export default HomePage