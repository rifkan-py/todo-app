import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { CustomError } from './errorHandler';

const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
        if (error instanceof ZodError) {
             const errorMessage = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
             // Pass strict status code 400 for validation errors
             next(new CustomError(400, errorMessage));
        } else {
            next(error);
        }
    }
  };

export default validate;
