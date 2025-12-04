import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTodosState } from "@/features/store";
import { fetchTodos, deleteTodo } from "@/features/todosSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectTodosState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa todo này?");
    if (isConfirmed) {
      await dispatch(deleteTodo(id));
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View className="justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="justify-center">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => router.push(`todo/${item.id}`)}>
        <View className="bg-amber-100 p-4 rounded-lg border-amber-500 border-2 mb-4 flex-row items-center justify-between m-3">
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-2">
              Tiêu đề: {item.title}
            </Text>
            <Text className="text-md text-gray-600">
              Trạng thái: {item.completed ? "Hoàn thành" : "Chưa hoàn thành"}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Pressable className="mr-4" onPress={() => handleDelete(item.id)}>
              <Text className="text-red-600 bg-red-200 rounded-xl p-3">
                Xoá
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push(`todo/${item.id}`)}>
              <Text className="text-blue-600 rounded-xl p-3 bg-blue-300">
                Cập nhật
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
