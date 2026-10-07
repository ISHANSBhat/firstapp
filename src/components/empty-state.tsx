import { StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  return (
    <View style={styles.container} accessibilityLabel="No todos">
      <Text style={styles.title}>No todos yet</Text>
      <Text style={styles.subtitle}>Add one above to get started.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 15,
  },
});
