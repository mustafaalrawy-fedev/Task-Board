import mongoose from 'mongoose';

// Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', "Won't do", ''],
      default: '',
    },
  },
  { timestamps: true }
);

// Model
const Task = mongoose.model('Task', taskSchema);

export default Task;
