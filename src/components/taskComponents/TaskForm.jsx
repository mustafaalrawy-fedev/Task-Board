import { motion } from "motion/react";
import { icons } from "../../data/icons";
import { rightMarkIcon, trashIcon, completedIcon } from "../../data/images";
import { taskStatus } from "../../data/tasksStatus";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddNewTask, handleDeleteTask, handleHideTaskDetails, handleUpdateTask } from "../../store/slices/taskSlice";
import { addToastInfo } from "../../store/slices/toastSlice";

const STATUS_BG = {
  "In Progress": "bg-AddBtnCol",
  Completed: "bg-taskCompBtnCol",
  "Won't do": "bg-taskWontDoBtnCol",
};

const TaskForm = () => {
  const dispatch = useDispatch()
  const { taskInfo } = useSelector((state) => state.task);

  // Initialize state with taskInfo if present, otherwise defaults
  const [taskName, setTaskName] = useState(taskInfo?.taskName || "");
  const [description, setDescription] = useState(taskInfo?.taskDescription || "");
  // Use icon char for selectedIcon
  const [selectedIcon, setSelectedIcon] = useState(
    taskInfo?.icon
      ? icons.find((i) => i.icon === taskInfo.icon)?.icon ?? null
      : null
  );
  // Use status text for selectedStatus
  const [selectedStatus, setSelectedStatus] = useState(
    taskInfo?.taskStatus
      ? taskStatus.find((s) => s.text === taskInfo.taskStatus)?.text ?? null
      : null
  );

  // Update form fields if taskInfo changes (e.g. when opening a different task)
  useEffect(() => {
    setTaskName(taskInfo?.taskName || "");
    setDescription(taskInfo?.taskDescription || "");
    setSelectedIcon(
      taskInfo?.icon
        ? icons.find((i) => i.icon === taskInfo.icon)?.icon ?? null
        : null
    );
    setSelectedStatus(
      taskInfo?.taskStatus
        ? taskStatus.find((s) => s.text === taskInfo.taskStatus)?.text ?? null
        : null
    );
  }, [taskInfo]);

  const handleInputChange = useCallback((e) => {
    setTaskName(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  // Use icon char for value and state
  const handleIconChange = useCallback((e) => {
    setSelectedIcon(e.target.value);
  }, []);

  // Use status text for value and state
  const handleStatusChange = useCallback((e) => {
    setSelectedStatus(e.target.value);
  }, []);

  const handleDelete = useCallback(
    (id=null) => {
      if(taskInfo) {
        dispatch(handleDeleteTask(id))
        dispatch(addToastInfo({
          colorInfo: 'DELETE', 
          message: 'Task Deleted Successfully!',
          position: 'TOP_LEFT'
        }))
      } else {
        setTaskName("");
        setDescription("");
        setSelectedIcon(null);
        setSelectedStatus(null);
      }
      dispatch(handleHideTaskDetails())
    },
    [dispatch, taskInfo]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Submit logic here
      // console.log({ taskName, description, selectedIcon, selectedStatus, taskInfo });
      if(taskInfo) {
        dispatch(handleUpdateTask({
          id: taskInfo.id,   
          taskName: taskName, 
          taskDescription: description, 
          icon: selectedIcon, 
          taskStatus: selectedStatus 
        }))
        dispatch(addToastInfo({
          colorInfo: 'UPDATE', 
          message: 'Task Updated Successfully!',
          position: 'TOP_LEFT'
        }))
      } else {
        dispatch(handleAddNewTask({ 
          id: Date.now(),
          taskName: taskName, 
          taskDescription: description, 
          icon: selectedIcon, 
          taskStatus: selectedStatus 
        }))
        dispatch(addToastInfo({
          colorInfo: 'SAVE', 
          message: 'Task Added Successfully!',
          position: 'TOP_LEFT'
        }))
      }
      dispatch(handleHideTaskDetails())
    },
    [dispatch, taskInfo, taskName, description, selectedIcon, selectedStatus]
  );

  return (
    <form className="flex flex-col gap-3 h-[85vh]" onSubmit={handleSubmit}>
      {/* Task Input */}
      <div className="flex gap-2 flex-col">
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          htmlFor="taskName"
          className="text-sm text-delBtnColor"
        >
          Task name
        </motion.label>
        <motion.input
          required
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          type="text"
          id="taskName"
          className="border-1 border-subTitleCol py-1.5 px-5 rounded-md outline-highlightCol"
          value={taskName}
          onChange={handleInputChange}
        />
      </div>
      {/* Description */}
      <div className="flex gap-2 flex-col">
        <motion.label
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          htmlFor="description"
          className="text-sm text-delBtnColor"
        >
          Description
        </motion.label>
        <motion.textarea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          id="description"
          className="border-1 border-subTitleCol py-2 p-5 rounded-md outline-highlightCol w-full h-26 md:h-32 resize-none placeholder:text-sm placeholder:text-delBtnColor"
          placeholder="Enter a short description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      {/* Icons Of Task */}
      <aside>
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm text-delBtnColor"
        >
          Icons
        </motion.label>
        <div className="flex gap-3 flex-wrap mt-2">
          {icons.map(({ id, icon }, idx) => (
            <motion.label
              key={id}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * idx }}
            >
              <input
                required
                type="radio"
                name="taskIcon"
                value={icon}
                className="peer hidden"
                checked={selectedIcon === icon}
                onChange={handleIconChange}
              />
              <span className="cursor-pointer bg-subTitleCol/40 p-2 rounded-xl hover:bg-taskInProgressCol peer-checked:bg-taskInProgressCol main-transition text-md md:text-xl inline-flex items-center justify-center">
                {icon}
              </span>
            </motion.label>
          ))}
        </div>
      </aside>
      {/* Status */}
      <aside className="w-full">
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm text-delBtnColor"
        >
          Status
        </motion.label>
        <div className="grid gap-1.5 md:gap-2.5 sm:grid-cols-2 grid-cols-1">
          {taskStatus.map(({ id, icon, text }, idx) => (
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 * idx }}
              key={id}
              className="w-full"
            >
              <input
                type="radio"
                name="taskStatus"
                value={text}
                className="peer hidden"
                checked={selectedStatus === text}
                onChange={handleStatusChange}
              />
              <div className="cursor-pointer border-2 border-subTitleCol rounded-xl hover:border-highlightCol peer-checked:border-highlightCol main-transition text-xl h-12 w-full py-0.5 pl-0.5 pr-3">
                <span className="flex items-center justify-between h-full">
                  <img
                    className={`${STATUS_BG[text] || ""} p-2 w-10 h-full rounded-xl`}
                    src={icon}
                    alt={`${text}-Icon`}
                  />
                  <p className="text-sm">{text}</p>
                  {/* Checked Icon */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      selectedStatus === text
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.3 }}
                    className={`${
                      selectedStatus === text
                        ? "bg-highlightCol opacity-100"
                        : "opacity-0"
                    } rounded-full`}
                    src={completedIcon}
                    alt={`checked Icon`}
                  />
                </span>
              </div>
            </motion.label>
          ))}
        </div>
      </aside>
      {/* Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex justify-end items-end gap-5 mt-auto"
      >
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          className="w-fit cursor-pointer px-4 py-2 rounded-md bg-delBtnColor text-white flex gap-2 items-center justify-center shadow-lg main-transition hover:bg-taskWontDoBtnCol"
          type="button"
          onClick={() => handleDelete(taskInfo.id)}
        >
          <motion.span
            initial={false}
            whileHover={{ letterSpacing: "0.08em" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Delete
          </motion.span>
          <motion.img
            src={trashIcon}
            alt="Trash Icon"
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 2 }}
          className="lg:w-fit w-full cursor-pointer px-4 py-2 rounded-md bg-highlightCol text-white flex gap-2 items-center justify-center shadow-lg main-transition hover:bg-taskCompBtnCol"
          type="submit"
        >
          <motion.span
            initial={false}
            whileHover={{ letterSpacing: "0.08em"}}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Save
          </motion.span>
          <motion.img
            src={rightMarkIcon}
            alt="Right mark icon"
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.button>
      </motion.div>
    </form>
  );
};

export default TaskForm;