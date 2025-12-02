import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Posts" }} />
        <Stack.Screen name="post/new" options={{ title: "Post New" }} />
        <Stack.Screen name="post/[id]" options={{ title: "Post Detail" }} />
      </Stack>
    </Provider>
  );
}