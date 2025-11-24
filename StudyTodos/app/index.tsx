import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../assets/store';
import { fetchTasks, toggleDone, removeTask } from '../assets/features/tasks/tasksSlice';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={() => router.push('/task/new')}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>

      {items.length === 0 ? (
        <Text>No tasks yet. Add one!</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => router.push(`/task/${item.id}`)}
            >
              <Pressable
                onPress={() =>
                  dispatch(toggleDone({ id: item.id, isDone: !item.isDone }))
                }
                style={styles.checkbox}
              >
                <Text>{item.isDone ? '✅' : '⬜'}</Text>
              </Pressable>

              <View style={{ flex: 1 }}>
                <Text style={[styles.title, item.isDone && styles.doneText]}>
                  {item.title}
                </Text>
              </View>

              <Pressable onPress={() => dispatch(removeTask(item.id))}>
                <Text style={{ color: 'red' }}>X</Text>
              </Pressable>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  addButtonText: { fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  checkbox: {
    padding: 4,
  },
  title: { fontSize: 16 },
  doneText: { textDecorationLine: 'line-through', opacity: 0.6 },
});
