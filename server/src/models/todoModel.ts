import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../types/todo';

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>('Todo', TodoSchema);
