import { NextFunction, Request, Response } from 'express';
import * as TodoService from '../services/todoService';

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await TodoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoService.createTodo(req.body);
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
}

export const getTodoById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoService.getTodoById(req.params.id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}

export const updateTodoById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoService.updateTodoById(req.params.id, req.body);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}

export const deleteTodoById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoService.deleteTodoById(req.params.id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export const toggleTodoDone = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoService.toggleTodoDone(req.params.id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
}