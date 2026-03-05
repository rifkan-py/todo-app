import React, { useState } from 'react';
import { todoApi } from '../api/todoApi';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSuccess: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsLoading(true);
      await todoApi.create({ title, description });
      setTitle('');
      setDescription('');
      onSuccess();
    } catch (error) {
      console.error('Failed to create todo', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex gap-2">
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
          autoFocus
        />
        <Button disabled={isLoading || !title.trim()} type="submit" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-sm text-gray-500 bg-gray-50/50 border-transparent focus:bg-white focus:border-gray-300 transition-colors"
        />
      </div>
    </form>
  );
};
