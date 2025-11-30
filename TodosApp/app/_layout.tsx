import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Todos App" }} />
        <Stack.Screen name="todos/new" options={{ title: "New Todo" }} />
        <Stack.Screen name="todos/[id]" options={{ title: "Todo Detail" }} />
      </Stack>
    </Provider>
  );
}
