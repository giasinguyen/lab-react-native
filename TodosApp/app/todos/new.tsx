import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { createTodo } from "../../src/features/todosSlice";
import type { AppDispatch } from "../../src/store";

export default function NewTodoScreen() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim()) return;
    await dispatch(createTodo({ title: title.trim() }));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Todo Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="What needs to be done?"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Create Todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: "bold", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", color: "#007AFF" },
});
