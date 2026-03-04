// Tạo một key ngắn gọn dễ dùng và dễ thay đổi ngôn ngữ nếu cần thiết

//Tạo biến quản lý bộ lọc theo phân loại
export const FilterType = {
    all: "all",
    active: "active",
    completed: "completed",
};

//Tạo biến quản lý bộ lọc theo ngày tháng
export const options = [
    {
        value: "today",
        label: "Today"
    },
    {
        value: "week",
        label: "Week"
    },
    {
        value: "month",
        label: "Month"
    },
    {
        value: "all",
        label: "All"
    }
];

export const visibleTaskLimit = 4;
