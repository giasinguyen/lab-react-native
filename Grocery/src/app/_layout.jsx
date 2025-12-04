import "../global.css";
import { Slot, Tabs } from "expo-router";

import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Grocery List" }} />
      </Tabs>
    </Provider>
  );
}
