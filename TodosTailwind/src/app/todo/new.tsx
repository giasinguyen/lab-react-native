import { use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTodosState } from "@/features/store";
import { createTodo } from "@/features/todosSlice";

export default function NewTodoScreen() {
  const [title, setTitle] = useState("");
  //   const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const handleCreate = async () => {
    if (!title || !title.trim()) return;
    await dispatch(createTodo({ title: title.trim() }));
    router.replace("/");
  };
  return (
    <View>
      <Text className="text-xl font-bold text-green-500 p-4 justify-center items-center">
        Add New Todo
      </Text>

      <View>
        <Text className="font-bold border-gray-300 rounded-xl p-2 text-lg">
          Title:{" "}
        </Text>
        <TextInput
          className="w-full border-b-2 border-gray-300 rounded-xl p-2 text-lg"
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập tiêu đề"
        />
      </View>

      <Pressable
        className="w-full bg-blue-500 rounded-xl p-3"
        onPress={handleCreate}
      >
        <Text className="text-white text-center font-semibold">Thêm Todo</Text>
      </Pressable>
    </View>
  );
}
