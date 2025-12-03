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
import { createTodo, updateTodo } from "@/src/todosSlice";
import { selectTodosState } from "@/src/store";
import { useEffect, useState } from "react";

export default function PostDetailScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector(selectTodosState);

  const [title, setTitle] = useState("");

  const handleSave = async () => {
    if (!title || !title.trim()) return; // Kiểm tra title hợp lệ
    await dispatch(createTodo({ title: title.trim() }));
    router.back();
  };



  return (
    <View style={styles.container}>
      <Text>Title: </Text>
      <TextInput value={title} onChangeText={setTitle}></TextInput>

      <Pressable onPress={handleSave}>
        <Text>Create</Text>
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
