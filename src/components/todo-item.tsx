import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => boolean;
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const startEditing = () => {
    setDraft(todo.title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(todo.title);
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (onUpdate(todo.id, draft)) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <View style={styles.todo}>
        <TextInput
          style={styles.editInput}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={saveEditing}
          returnKeyType="done"
          autoFocus
          maxLength={200}
          accessibilityLabel="Edit todo title"
        />
        <View style={styles.editActions}>
          <Pressable
            style={({ pressed }) => [styles.smallButton, pressed && styles.pressed]}
            onPress={saveEditing}
            accessibilityRole="button"
            accessibilityLabel="Save todo">
            <Text style={styles.smallButtonText}>Save</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.smallButton, styles.cancelButton, pressed && styles.pressed]}
            onPress={cancelEditing}
            accessibilityRole="button"
            accessibilityLabel="Cancel editing">
            <Text style={styles.smallButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.todo}>
      <Pressable
        style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        onPress={() => onToggle(todo.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        accessibilityLabel={todo.completed ? 'Mark todo as not done' : 'Mark todo as done'}>
        {todo.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </Pressable>

      <Pressable style={styles.titleWrapper} onPress={() => onToggle(todo.id)}>
        <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]} numberOfLines={3}>
          {todo.title}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        onPress={startEditing}
        accessibilityRole="button"
        accessibilityLabel={`Edit ${todo.title}`}>
        <Text style={styles.iconText}>✎</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        onPress={() => onDelete(todo.id)}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${todo.title}`}>
        <Text style={styles.iconText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'white',
  },
  checkmark: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  titleWrapper: {
    flex: 1,
  },
  todoText: {
    color: 'white',
    fontSize: 17,
  },
  todoTextCompleted: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  iconText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
  editInput: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
