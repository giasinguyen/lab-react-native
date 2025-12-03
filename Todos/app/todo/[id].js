import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "@/src/todosSlice";
import { selectTodosState } from "@/src/store";
import { useEffect, useState } from "react";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector(selectTodosState);

  const existing = items.find((p) => p.id === id);

  const [title, setTitle] = useState(existing?.title || "");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
    }
  }, [existing]);

  const handleUpdate = async () => {
    if (!title || !title.trim()) return;
    await dispatch(updateTodo({ id: id, title: title.trim() }));
    router.back();
  };

  if (!existing) {
    return (
      <View style={styles.center}>
        <Text>Todo not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Title: </Text>
      <TextInput value={title} onChangeText={setTitle}></TextInput>

      <Pressable onPress={handleUpdate}>
        <Text>Update</Text>
      </Pressable>
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
