import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F3F4F6" },
      }}
    />
  );
}
