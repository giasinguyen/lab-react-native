import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { selectTodosState, AppDispatch } from "../src/store";
import { fetchTodos, toggleTodo, deleteTodo } from "../src/features/todosSlice";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(selectTodosState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/todos/new")}
      >
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </Pressable>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>No todos yet. Add one!</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => router.push(`/todos/${item.id}`)}
            >
              <Pressable
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxDone,
                ]}
                onPress={() =>
                  dispatch(toggleTodo({ id: item.id, completed: !item.completed }))
                }
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.title,
                    item.completed && styles.titleDone,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Pressable
                style={styles.deleteBtn}
                onPress={() => dispatch(deleteTodo(item.id))}
              >
                <Text style={{ color: "red" }}>✕</Text>
              </Pressable>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  addButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#007AFF", fontWeight: "bold" },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxDone: {
    backgroundColor: "#007AFF",
  },
  checkmark: { color: "#fff", fontWeight: "bold" },
  title: { fontSize: 16, fontWeight: "500" },
  titleDone: { textDecorationLine: "line-through", color: "#888" },
  date: { fontSize: 12, color: "#888", marginTop: 2 },
  deleteBtn: {
    padding: 8,
  },
});
