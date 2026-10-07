import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type AddTodoBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

export function AddTodoBar({ value, onChange, onSubmit }: AddTodoBarProps) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="What to do?"
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        maxLength={200}
        accessibilityLabel="New todo title"
      />
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        onPress={onSubmit}
        accessibilityRole="button"
        accessibilityLabel="Add todo">
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 100,
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minHeight: 50,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
