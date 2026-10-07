import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Todo } from '@/types/todo';

const STORAGE_KEY = '@test-app/todos-v1';

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isValidTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  const todo = value as Record<string, unknown>;
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'number'
  );
}

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw != null && mounted) {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setTodos(parsed.filter(isValidTodo));
          }
        }
      } catch (error) {
        console.warn('[useTodos] Failed to load todos from cache', error);
      } finally {
        if (mounted) setIsLoaded(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.warn('[useTodos] Failed to save todos to cache', error);
      }
    })();
  }, [todos, isLoaded]);

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

  return { todos, isLoaded, addTodo, toggleTodo, deleteTodo, updateTodo };
}
