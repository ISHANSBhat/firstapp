import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddTodoBar } from '@/components/add-todo-bar';
import { EmptyState } from '@/components/empty-state';
import { TodoItem } from '@/components/todo-item';
import { useTodos } from '@/hooks/use-todos';

export default function TodoListScreen() {
  const [text, setText] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleAdd = () => {
    if (addTodo(text)) {
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <Text style={styles.title}>TO-DO</Text>
          <Text style={styles.counter} accessibilityLabel={`${completedCount} of ${todos.length} done`}>
            {todos.length === 0 ? 'Nothing to do yet' : `${completedCount}/${todos.length} done`}
          </Text>

          <AddTodoBar value={text} onChange={setText} onSubmit={handleAdd} />

          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            )}
            ListEmptyComponent={<EmptyState />}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={todos.length === 0 ? styles.emptyList : styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 22,
  },
  counter: {
    color: '#888',
    fontSize: 15,
    marginTop: 4,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
});
