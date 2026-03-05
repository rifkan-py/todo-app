import { Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description?: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
}
