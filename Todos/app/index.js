import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "@/src/todosSlice";
import { selectTodosState } from "@/src/store";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectTodosState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTodo(id));
    router.replace("/");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
        <Pressable style={styles.button} onPress={() => dispatch(fetchTodos())}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => router.push(`todo/${item.id}`)}
    >
      <Text>{item.title}</Text>
      <Pressable style={{ color: "red" }} onPress={() => handleDelete(item.id)}>
        Delete
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`todo/new`)}>
        <Text>Create New Todo</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  item: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
});
