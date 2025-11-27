import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import React from 'react';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Posts' }} />
        <Stack.Screen name="post/new" options={{ title: 'New Post' }} />
        <Stack.Screen name="post/[id]" options={{ title: 'Post Detail' }} />
      </Stack>
    </Provider>
  );
}
