import { motion } from 'motion/react';
import { icons } from '../../data/icons';
import { rightMarkIcon, trashIcon, completedIcon } from '../../data/images';
import { taskStatus } from '../../data/tasksStatus';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTask,
  getAllTasks,
  getTaskById,
  setShowTaskModel,
  updateTask,
} from '../../store/slices/task2Slice';
import { createTask } from '../../store/slices/task2Slice';
import toast from 'react-hot-toast';

const STATUS_BG = {
  'In Progress': 'bg-AddBtnCol',
  Completed: 'bg-taskCompBtnCol',
  "Won't do": 'bg-taskWontDoBtnCol',
};

const TaskForm = () => {
  const dispatch = useDispatch();
  const { taskDetails, taskId } = useSelector((state) => state.task2);

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(taskDetails?.icon || '');
  const [selectedStatus, setSelectedStatus] = useState(
    taskDetails?.status || ''
  );

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskById({ id: taskId }));
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (taskDetails) {
      setTaskName(taskDetails.title);
      setDescription(taskDetails.description);
      setSelectedIcon(taskDetails.icon);
      setSelectedStatus(taskDetails.status);
    }
  }, [taskDetails]);

  // Create Task Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !description || !selectedIcon) {
      toast.error('Please fill all the fields');
      return;
    }
    const task = {
      title: taskName,
      description,
      icon: selectedIcon,
      status: selectedStatus,
    };
    if (taskId) {
      handleUpdate(taskId, task);
      return;
    }
    dispatch(createTask({ task }))
      .unwrap()
      .then(() => {
        dispatch(getAllTasks());
      });
    setTaskName('');
    setDescription('');
    setSelectedIcon('');
    setSelectedStatus('');
    dispatch(setShowTaskModel(false));
  };

  const handleDelete = (id) => {
    if (!id) {
      setTaskName('');
      setDescription('');
      setSelectedIcon('');
      setSelectedStatus('');
      return;
    }
    dispatch(deleteTask({ id }))
      .unwrap()
      .then(() => {
        dispatch(getAllTasks());
      });
    dispatch(setShowTaskModel(false));
  };

  const handleUpdate = () => {
    if (!taskId) return;
    if (!taskName || !description || !selectedIcon) {
      toast.error('Please fill all the fields');
      return;
    }
    const task = {
      title: taskName,
      description,
      icon: selectedIcon,
      status: selectedStatus,
    };
    dispatch(updateTask({ id: taskId, task }))
      .unwrap()
      .then(() => {
        dispatch(getAllTasks());
      });
    setTaskName('');
    setDescription('');
    setSelectedIcon('');
    setSelectedStatus('');
    dispatch(setShowTaskModel(false));
  };

  return (
    <form className='flex flex-col gap-3 h-[85vh]' onSubmit={handleSubmit}>
      {/* Task Input */}
      <div className='flex gap-2 flex-col'>
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          htmlFor='taskName'
          className='text-sm text-delBtnColor'
        >
          Task name
        </motion.label>
        <motion.input
          // required
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          type='text'
          id='taskName'
          className='border-1 border-subTitleCol py-1.5 px-5 rounded-md outline-highlightCol'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      {/* Description */}
      <div className='flex gap-2 flex-col'>
        <motion.label
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          htmlFor='description'
          className='text-sm text-delBtnColor'
        >
          Description
        </motion.label>
        <motion.textarea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          id='description'
          className='border-1 border-subTitleCol py-2 p-5 rounded-md outline-highlightCol w-full h-26 md:h-32 resize-none placeholder:text-sm placeholder:text-delBtnColor'
          placeholder='Enter a short description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Icons Of Task */}
      <aside>
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className='text-sm text-delBtnColor'
        >
          Icons
        </motion.label>
        <div className='flex gap-3 flex-wrap mt-2'>
          {icons.map(({ id, icon }, idx) => (
            <motion.label
              key={id}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * idx }}
            >
              <input
                // required
                type='radio'
                name='taskIcon'
                className='peer hidden'
                checked={selectedIcon === icon}
                onChange={() => setSelectedIcon(icon)}
              />
              <span className='cursor-pointer bg-subTitleCol/40 p-2 rounded-xl hover:bg-taskInProgressCol peer-checked:bg-taskInProgressCol main-transition text-md md:text-xl inline-flex items-center justify-center'>
                {icon}
              </span>
            </motion.label>
          ))}
        </div>
      </aside>
      {/* Status */}
      <aside className='w-full'>
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='text-sm text-delBtnColor'
        >
          Status
        </motion.label>
        <div className='grid gap-1.5 md:gap-2.5 sm:grid-cols-2 grid-cols-1'>
          {taskStatus.map(({ id, icon, text }, idx) => (
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 * idx }}
              key={id}
              className='w-full'
            >
              <input
                type='radio'
                name='taskStatus'
                className='peer hidden'
                checked={selectedStatus === text}
                onChange={() => setSelectedStatus(text)}
              />
              <div className='cursor-pointer border-2 border-subTitleCol rounded-xl hover:border-highlightCol peer-checked:border-highlightCol main-transition text-xl h-12 w-full py-0.5 pl-0.5 pr-3'>
                <span className='flex items-center justify-between h-full'>
                  <img
                    className={`${
                      STATUS_BG[text] || ''
                    } p-2 w-10 h-full rounded-xl`}
                    src={icon}
                    alt={`${text}-Icon`}
                  />
                  <p className='text-sm'>{text}</p>
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
                        ? 'bg-highlightCol opacity-100'
                        : 'opacity-0'
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
      {/* Action  CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='flex justify-end items-end gap-5 mt-auto'
      >
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: 'spring',
            bounce: 0.4,
            delay: 0.5,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          className='w-fit cursor-pointer px-4 py-2 rounded-md bg-delBtnColor text-white flex gap-2 items-center justify-center shadow-lg main-transition hover:bg-taskWontDoBtnCol'
          type='button'
          onClick={() => handleDelete(taskId)}
        >
          <motion.span
            initial={false}
            whileHover={{ letterSpacing: '0.08em' }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Delete
          </motion.span>
          <motion.img
            src={trashIcon}
            alt='Trash Icon'
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: 'spring',
            bounce: 0.4,
            delay: 0.6,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 2 }}
          className='lg:w-fit w-full cursor-pointer px-4 py-2 rounded-md bg-highlightCol text-white flex gap-2 items-center justify-center shadow-lg main-transition hover:bg-taskCompBtnCol'
          type='submit'
        >
          <motion.span
            initial={false}
            whileHover={{ letterSpacing: '0.08em' }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Save
          </motion.span>
          <motion.img
            src={rightMarkIcon}
            alt='Right mark icon'
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
        </motion.button>
      </motion.div>
    </form>
  );
};

export default TaskForm;
