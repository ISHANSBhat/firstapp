import { useCallback, useState } from 'react';

import type { Todo } from '@/types/todo';

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = useCallback((rawTitle: string): boolean => {
    const title = rawTitle.trim();
    if (!title) return false;
    setTodos((prev) => [
      { id: createId(), title, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    return true;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, rawTitle: string): boolean => {
    const title = rawTitle.trim();
    if (!title) return false;
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
    return true;
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
}
