import "../global.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Text, View } from "react-native";
import { store } from "@/features/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Todos" }} />
        <Stack.Screen name="todo/[id]" options={{ title: "Todo Detail" }} />
      </Stack>
    </Provider>
  );
}
