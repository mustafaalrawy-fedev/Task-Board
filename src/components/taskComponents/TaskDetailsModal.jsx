import { useDispatch } from "react-redux"
import { closeIcon } from "../../data/images"
import { handleHideTaskDetails } from "../../store/slices/taskSlice"
import { motion } from "motion/react"
import TaskForm from "./TaskForm"

const TaskDetailsModal = () => {
  const dispatch = useDispatch();
  return (
    <motion.section 
      initial={{opacity: 0, x: 100}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 100}}
      transition={{duration: 0.3}}
      className="fixed top-0 right-0 w-full md:w-[50%] h-full p-5 bg-white z-10"
    >
      <motion.main 
        className="flex justify-between items-center mb-5"
      >
        <motion.h3 
          initial={{opacity: 0, x: 30}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.7, delay: 0.3}}
          className="text-lg"
        >Task details</motion.h3>
        {/* Close Icon */}
        <motion.button 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.7, delay: 0.3}}
          onClick={() => dispatch(handleHideTaskDetails())} 
          type="button" 
          className="border border-subTitleCol rounded-md p-1.5 cursor-pointer"
        >
          <img src={closeIcon} alt="Close Icon" />
        </motion.button>
      </motion.main>
        {/* Tasks Forms */}
        <TaskForm />
    </motion.section> 
  )
}

export default TaskDetailsModal