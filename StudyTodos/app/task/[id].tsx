import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../assets/store';
import { fetchTaskById, toggleDone, removeTask } from '../../assets/features/tasks/tasksSlice';
import { getTaskById } from '../../assets/db/tasks';
import { Task } from '../../assets/features/tasks/types';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const row = await getTaskById(Number(id));
      setTask(row);
    };
    load();
  }, [id]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleToggle = async () => {
    await dispatch(toggleDone({ id: task.id, isDone: !task.isDone }));
    const row = await getTaskById(task.id);
    setTask(row);
  };

  const handleDelete = async () => {
    await dispatch(removeTask(task.id));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>Status: {task.isDone ? 'Done ✅' : 'Pending ⏳'}</Text>
      <Text>Created at: {task.createdAt}</Text>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={handleToggle}>
          <Text>{task.isDone ? 'Mark as Pending' : 'Mark as Done'}</Text>
        </Pressable>

        <Pressable style={[styles.button, { borderColor: 'red' }]} onPress={handleDelete}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 12, marginTop: 16 },
  button: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
});
