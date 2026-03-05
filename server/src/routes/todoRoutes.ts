import { Router } from 'express';
import * as TodoController from '../controllers/todoControllers';
import validate from '../middlewares/validate';
import { createTodoSchema, updateTodoSchema, getTodoSchema } from '../schemas/todoSchemas';

const router: Router = Router();

router.get('/', TodoController.getAllTodos);
router.post('/', validate(createTodoSchema), TodoController.createTodo);
router.get('/:id', validate(getTodoSchema), TodoController.getTodoById);
router.put('/:id', validate(updateTodoSchema), TodoController.updateTodoById);
router.patch('/:id/toggle', validate(getTodoSchema), TodoController.toggleTodoDone);
router.delete('/:id', validate(getTodoSchema), TodoController.deleteTodoById);

export default router;