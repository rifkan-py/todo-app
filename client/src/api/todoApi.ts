import axios from 'axios';

const api = axios.create({
  baseURL: '/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Todo {
  _id: string; // Assuming MongoDB ObjectId based on typical stacks, but consistent with 'id' if needed. User provided router structure, likely backend returns whatever. I should verify response shape or assume standard.
  // The user didn't specify the exact schema, but typical Todo fields are: title, description, completed/done.
  // Routes mention: createTodoSchema, getTodoSchema, updateTodoSchema.
  // "title/description" mentioned.
  title: string;
  description?: string;
  done: boolean; // or 'completed'
  createdAt?: string;
  updatedAt?: string;
}

// Ensure the interface matches what the backend expects/returns
// I'll assume standard _id, title, description, isDone.

export type CreateTodoDto = {
  title: string;
  description?: string;
};

export type UpdateTodoDto = Partial<CreateTodoDto> & { isDone?: boolean };

export const todoApi = {
  getAll: async () => {
    const response = await api.get<Todo[]>('/');
    return response.data;
  },
  create: async (data: CreateTodoDto) => {
    const response = await api.post<Todo>('/', data);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Todo>(`/${id}`);
    return response.data;
  },
  update: async (id: string, data: UpdateTodoDto) => {
    const response = await api.put<Todo>(`/${id}`, data);
    return response.data;
  },
  toggle: async (id: string) => {
    const response = await api.patch<Todo>(`/${id}/toggle`);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/${id}`);
  },
};
