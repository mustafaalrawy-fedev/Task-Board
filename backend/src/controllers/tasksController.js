import Task from '../models/Task.js';

// GET ALL TASKS
export const getAllTasks = async (_req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('getAllTasks Controller is not Working as Expected!', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET TASK BY ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task Not Found' });
    }

    res.status(200).json({ task, message: 'Task Found Successfully!' });
  } catch (error) {
    console.error('getTaskById Controller is not Working as Expected!', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// CREATE TASK
export const createTask = async (req, res) => {
  const { title, description, icon, status } = req.body;
  try {
    const task = new Task({ title, description, icon, status });
    const newTask = await task.save();
    res.status(201).json({ newTask, message: 'Task Created Successfully!' });
  } catch (error) {
    console.error('createTask Controller is not Working as Expected!', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, icon, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task Not Found' });
    }

    res
      .status(200)
      .json({ updatedTask, message: 'Task Updated Successfully!' });
  } catch (error) {
    console.error('updateTask Controller is not Working as Expected!', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task Not Found' });
    }

    res
      .status(200)
      .json({ deletedTask, message: 'Task Deleted Successfully!' });
  } catch (error) {
    console.error('deleteTask Controller is not Working as Expected!', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
