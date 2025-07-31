import { useSelector, useDispatch } from 'react-redux'
import AddTask from './AddTask'
import { inProgIcon, completedIcon, wontDoIcon } from '../../data/images'
import {handleShowTaskDetails} from '../../store/slices/taskSlice';
import { AnimatePresence, motion } from 'motion/react';

const STATUS_STYLES = {
  'In Progress': {
    bg: 'bg-taskInProgressCol',
    iconBg: 'bg-AddBtnCol',
    icon: inProgIcon,
  },
  'Completed': {
    bg: 'bg-taskCompCol',
    iconBg: 'bg-taskCompBtnCol',
    icon: completedIcon,
  },
  "Won't do": {
    bg: 'bg-taskWontDoCol',
    iconBg: 'bg-taskWontDoBtnCol',
    icon: wontDoIcon,
  },
  'default': {
    bg: 'bg-taskToDoCol',
    iconBg: '',
    icon: null,
  }
}

const TasksList = () => {
  const { tasksData } = useSelector(state => state.task)
  const dispatch = useDispatch()


  const handleClick = (info) => {
    dispatch(handleShowTaskDetails(info))
  }

  return (
    <motion.ul className="flex flex-col gap-5 overflow-y-auto max-h-[70vh] rounded-xl p-1.5 pr-3 custom-scrollbar">
        <AnimatePresence mode='popLayout'>
      {tasksData?.map(({ id, icon, taskStatus, taskName, taskDescription }, idx) => {
        const status = STATUS_STYLES[taskStatus] || STATUS_STYLES['default']
        return (
            <motion.li
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.7, delay: 0.3*idx}}
                key={id}
            >
            <button
            onClick={() => handleClick({id, icon, taskStatus, taskName, taskDescription})}
              type="button"
              className={`
                ${status.bg}
                outline-2 outline-transparent hover:outline-highlightCol border-3 border-transparent hover:border-primaryColor enabled:focus:outline-highlightCol enabled:focus:border-primaryColor rounded-xl w-full flex items-center gap-5 p-4 cursor-pointer main-transition
              `}
            >
              <div className="flex items-center gap-5 w-full">
                <span className='rounded-xl h-10 w-10 bg-primaryColor flex justify-center items-center'>{icon}</span>
                <main className="flex-1"> 
                    <div className='flex justify-center flex-col gap-2 items-start'>
                        <h3 className='font-bold'>{taskName}</h3>
                        <p className='text-xs text-black/70 text-left'>{taskDescription}</p>
                    </div>
                </main>
                {status.icon && (
                  <div className={`${status.iconBg} rounded-xl h-10 w-10 flex justify-center items-center`}>
                    <img src={status.icon} alt="task status" />
                  </div>
                )}
              </div>
            </button>
          </motion.li>
        )
      })}
      {/* Add a new Task */}
      <motion.li 
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: 0.5 }}
      >
        <AddTask handleClick={handleClick}/>
      </motion.li>
      </AnimatePresence>
    </motion.ul>
  )
}

export default TasksList