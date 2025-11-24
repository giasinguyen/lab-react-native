import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") StatusBar.setBarStyle("dark-content");
  }, []);
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F3F4F6" },
        }}
      />
    </SafeAreaProvider>
  );
}
