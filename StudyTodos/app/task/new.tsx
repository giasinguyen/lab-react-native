import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../assets/store';
import { addTask } from '../../assets/features/tasks/tasksSlice';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    if (!title.trim()) return;
    await dispatch(addTask(title.trim()));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Ôn React Native Hooks"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: { fontWeight: 'bold' },
});
