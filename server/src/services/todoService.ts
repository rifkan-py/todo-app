import Todo from '../models/todoModel';
import { ITodo } from '../types/todo';

export const getAllTodos = async (): Promise<ITodo[]> => {
  return await Todo.find();
};

export const createTodo = async (todoData: Partial<ITodo>): Promise<ITodo> => {
  const todo = new Todo(todoData);
  return await todo.save();
};

export const getTodoById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findById(id);
};

export const updateTodoById = async (
  id: string,
  todoData: Partial<ITodo>
): Promise<ITodo | null> => {
  return await Todo.findByIdAndUpdate(id, todoData, { new: true });
};

export const deleteTodoById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findByIdAndDelete(id);
};

export const toggleTodoDone = async (id: string): Promise<ITodo | null> => {
    const todo = await Todo.findById(id);
    if (!todo) return null;
    todo.done = !todo.done;
    return await todo.save();
}
