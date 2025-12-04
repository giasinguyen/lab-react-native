import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTodosState } from "@/features/store";
import { updateTodo } from "@/features/todosSlice";

export default function TodoDetailScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { items } = useSelector(selectTodosState);
  const existing = items.find((p) => p.id === id);

  const [title, setTitle] = useState(existing?.title || "");
  const [completed, setCompleted] = useState(existing?.completed || false);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
    }
  }, [existing]);

  const handleUpdate = async () => {
    if (!title || !title.trim()) return;
    await dispatch(
      updateTodo({ id: id, title: title.trim(), completed: completed })
    );
    router.back();
  };

  if (!existing) {
    return (
      <View className="justify-center color-red-500">
        <Text>Todo not found!</Text>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-xl font-bold text-green-500 p-4 justify-center items-center">
        Todo Detail Screen
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

      <Text className="font-bold border-gray-300 rounded-xl p-2 text-lg">
        Trạng thái:{" "}
      </Text>

      <TextInput
        className="w-full border-b-2 border-gray-300 rounded-xl p-2 text-lg"
        value={completed ? "Hoàn Thành" : "Chưa Hoàn Thành"}
        onChangeText={setCompleted}
        placeholder="Trạng thái"
      />

      <Pressable
        className="w-full bg-blue-500 rounded-xl p-3"
        onPress={handleUpdate}
      >
        <Text className="text-white text-center font-semibold">Cập nhật</Text>
      </Pressable>
    </View>
  );
}
