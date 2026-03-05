import React, { useEffect, useState } from 'react';
import { todoApi, type Todo } from '../api/todoApi';
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';
import { Loader2 } from 'lucide-react';

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
      // Maybe show a toast
    } finally {
      setLoading(false);
    }
  };

  const activeTodos = todos.filter(t => !t.done);
  const completedTodos = todos.filter(t => t.done);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <main className="container mx-auto max-w-2xl px-4 pt-24 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back! You have {activeTodos.length} tasks.
          </h2>
          <TodoForm onSuccess={fetchTodos} />
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
          </div>
        ) : (
          <div className="space-y-8">
            {activeTodos.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">
                  Active
                </h3>
                <div className="flex flex-col gap-3">
                  {activeTodos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} onRefresh={fetchTodos} />
                  ))}
                </div>
              </section>
            )}

            {completedTodos.length > 0 && (
              <section className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1 mt-8 border-t pt-4">
                  Completed ({completedTodos.length})
                </h3>
                <div className="flex flex-col gap-3">
                  {completedTodos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} onRefresh={fetchTodos} />
                  ))}
                </div>
              </section>
            )}

            {activeTodos.length === 0 && completedTodos.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p>No tasks yet. Create one to get started!</p>
              </div>
            )}
            
            {activeTodos.length === 0 && completedTodos.length > 0 && (
              <div className="text-center py-10 text-green-600 bg-green-50 rounded-lg">
                <p className="font-medium">All tasks completed! Great job! 🎉</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
