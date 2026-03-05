import React, { useState } from 'react';
import { todoApi, type Todo } from '../api/todoApi';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Check, X, Trash2, Edit2, Undo } from 'lucide-react';
import { Input } from './ui/Input';
import { cn } from '../lib/utils';
import { ConfirmationModal } from './ui/Modal';

interface TodoItemProps {
  todo: Todo;
  onRefresh: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description || '',
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      await todoApi.toggle(todo._id);
      onRefresh();
    } catch (error) {
      console.error('Failed to toggle todo', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await todoApi.delete(todo._id);
      setShowDeleteModal(false);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete todo', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // PUT requests often replace the entire resource, ensure we send all necessary fields if required.
      // Or if the backend supports partial updates on PUT (common in some frameworks), just sending changed fields works.
      // To be safe, we send the current isDone status as well.
      await todoApi.update(todo._id, { ...formData, isDone: todo.done });
      setIsEditing(false);
      onRefresh();
    } catch (error) {
      console.error('Failed to update todo', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        isLoading={loading}
      />
      <Card className={cn("p-4 flex items-center justify-between gap-4 transition-colors bg-white")}>
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Task title"
              className="font-medium"
              autoFocus
            />
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description (optional)"
              className="text-sm text-gray-500"
            />
          </div>
        ) : (
          <div onClick={handleToggle} className="cursor-pointer group">
            <h3 className={cn("font-medium text-lg truncate transition-all duration-200", todo.done ? "text-gray-400 line-through decoration-gray-400" : "text-gray-900")}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={cn("text-sm truncate transition-all duration-200", todo.done ? "text-gray-400 line-through decoration-gray-400 opacity-60" : "text-gray-500")}>
                {todo.description}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsEditing(false);
                setFormData({ title: todo.title, description: todo.description || '' });
              }}
              disabled={loading}
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="h-8 w-8 p-0"
              onClick={handleSave}
              disabled={loading}
              title="Save"
            >
              <Check className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggle}
              disabled={loading}
              className={cn("h-8 w-8 p-0 hover:bg-transparent", todo.done ? "text-blue-600 hover:text-blue-700" : "text-gray-400 hover:text-blue-600")}
              title={todo.done ? "Mark as undone" : "Mark as done"}
            >
              {todo.done ? <Undo className="w-4 h-4" /> : <Check className="w-4 h-4" />} 
            </Button>
            
            <Button
              size="sm"
              variant="ghost" 
              className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setIsEditing(true)}
              disabled={loading || todo.done}
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </Card>
    </>
  );
};
