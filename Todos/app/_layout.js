import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Todos" }} />
        {/* <Stack.Screen name="todo/new" options={{ title: "New Todo" }} /> */}
        {/* <Stack.Screen name="todo/[id]" options={{ title: "Todo Detail" }} /> */}
      </Stack>
    </Provider>
  );
}
