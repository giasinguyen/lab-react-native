import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { selectTodosState, AppDispatch } from "../../src/store";
import { updateTodo, deleteTodo, toggleTodo } from "../../src/features/todosSlice";
import type { Todo } from "../../src/features/type";

export default function TodoDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ? Number(params.id) : NaN;

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items } = useSelector(selectTodosState);

  const existing: Todo | undefined = items.find((t) => t.id === id);
  const [title, setTitle] = useState<string>(existing?.title ?? "");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
    }
  }, [existing]);

  if (!existing || Number.isNaN(id)) {
    return (
      <View style={styles.container}>
        <Text>Todo not found. Go back to list.</Text>
      </View>
    );
  }

  const handleUpdate = async () => {
    if (!title.trim()) return;
    await dispatch(updateTodo({ id, title: title.trim() }));
    router.back();
  };

  const handleToggle = async () => {
    await dispatch(toggleTodo({ id, completed: !existing.completed }));
  };

  const handleDelete = async () => {
    await dispatch(deleteTodo(id));
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text style={styles.label}>Status:</Text>
        <Pressable
          style={[
            styles.statusBadge,
            existing.completed ? styles.completed : styles.pending,
          ]}
          onPress={handleToggle}
        >
          <Text style={styles.statusText}>
            {existing.completed ? "✓ Completed" : "○ Pending"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.dateText}>
        Created: {new Date(existing.createdAt).toLocaleString()}
      </Text>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={handleUpdate}>
          <Text style={{ color: "#007AFF" }}>Save Changes</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { borderColor: "red" }]}
          onPress={handleDelete}
        >
          <Text style={{ color: "red" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: "bold", fontSize: 14 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completed: {
    backgroundColor: "#d4edda",
  },
  pending: {
    backgroundColor: "#fff3cd",
  },
  statusText: {
    fontWeight: "600",
  },
  dateText: {
    color: "#888",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#007AFF",
    alignItems: "center",
  },
});
