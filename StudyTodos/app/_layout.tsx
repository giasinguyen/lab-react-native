import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../assets/store';
import { useEffect } from 'react';
import { initDb } from '../assets/db/tasks';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Study Todos' }} />
        <Stack.Screen name="task/new" options={{ title: 'New Task' }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Task Detail' }} />
      </Stack>
    </Provider>
  );
}
