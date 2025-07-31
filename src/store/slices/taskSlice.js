import { createSlice } from "@reduxjs/toolkit";

const getInitialTaskData = () => {
    const data = localStorage.getItem('taskData');
    if(data) {
        try {
            return JSON.parse(data) // to get the data as array
        } catch (error) {
            console.log(error);
        }
    }
    // This initial task or default tasks to appear 
    return  [
        {
            id: 1,
            icon: '⏰',
            taskStatus: 'In Progress',
            taskName: 'Task in Progress',
            taskDescription: ''
        },
        {
            id: 2,
            icon: '🏋🏻‍♂️',
            taskStatus: 'Completed',
            taskName: 'Task Completed',
            taskDescription: ''
        },
        {
            id: 3,
            icon: '☕',
            taskStatus: "Won't do",
            taskName: "Task Won't Do",
            taskDescription: ''
        },
        {
            id: 4,
            icon: '📚',
            taskStatus: "",
            taskName: 'Task To Do',
            taskDescription: 'Work on a Challenge on devChallenge.io, Learn TypeScript.'
        },
    ]
}

const saveDataToLocalStorage = (taskdata) => {
    try {
        localStorage.setItem('taskData', JSON.stringify(taskdata));
    } catch (error) {
        console.error("Failed to save task data to localStorage:", error);
    }
} 

const initialState = {
    tasksData: getInitialTaskData(),
    show: false,
    taskInfo: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        handleShowTaskDetails: (state, action) => {
            state.show = true;
            if (action && action.payload) {
                state.taskInfo = action.payload;
            }
        },
        handleHideTaskDetails: (state) => {
            state.show = false;
            state.taskInfo = null;
        },
        // Add Task
        handleAddNewTask: (state, action) => {
            state.tasksData.push(action.payload);
            saveDataToLocalStorage(state.tasksData);
        },
        // Update Task
        handleUpdateTask: (state, action) => {
            // console.log(action.payload)
            const updatedTask = action.payload;
            const index = state.tasksData.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasksData[index] = {
                    ...state.tasksData[index],
                    ...updatedTask
                };
                saveDataToLocalStorage(state.tasksData);
            }
        },
        // Delete Task
        handleDeleteTask: (state, action) => {
            // console.log(action.payload)
            state.tasksData = state.tasksData.filter(task => task.id !== action.payload);
            saveDataToLocalStorage(state.tasksData);
        }
    }
});

export default taskSlice.reducer;
export const {
    handleShowTaskDetails, 
    handleHideTaskDetails,
    handleAddNewTask,
    handleUpdateTask,
    handleDeleteTask
} = taskSlice.actions;