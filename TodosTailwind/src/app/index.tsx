import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTodosState } from "@/features/store";
import { fetchTodos, deleteTodo, toggleTodo } from "@/features/todosSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectTodosState);
  const [searchName, setSearchName] = useState("");

  const filterSearchName = useMemo(() => {
    if (!searchName || !searchName.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [items, searchName]);

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

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodo({ id, completed: !completed }));
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
      <View
        className={`p-4 rounded-lg border-2 mb-4 m-3 ${
          item.completed
            ? "bg-green-100 border-green-500"
            : "bg-amber-100 border-amber-500"
        }`}
      >
        <View className="flex-row items-start">
          <Pressable
            onPress={() => handleToggle(item.id, item.completed)}
            className={`w-6 h-6 rounded border-2 mr-3 mt-1 items-center justify-center ${
              item.completed
                ? "bg-green-500 border-green-600"
                : "bg-white border-gray-400"
            }`}
          >
            {item.completed && (
              <Text className="text-white font-bold text-sm">✓</Text>
            )}
          </Pressable>

          <View className="flex-1">
            <Pressable onPress={() => router.push(`todo/${item.id}`)}>
              <Text
                className={`text-xl font-semibold mb-2 ${
                  item.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {item.title}
              </Text>
              <Text
                className={`text-sm ${
                  item.completed ? "text-green-700" : "text-gray-600"
                }`}
              >
                {item.completed ? "✓ Đã hoàn thành" : "○ Chưa hoàn thành"}
              </Text>
            </Pressable>
          </View>

          <View className="flex-row items-center ml-2">
            <Pressable
              className="mr-2 bg-red-200 rounded-lg px-3 py-2"
              onPress={() => handleDelete(item.id)}
            >
              <Text className="text-red-700 font-semibold">Xoá</Text>
            </Pressable>
            <Pressable
              className="bg-blue-200 rounded-lg px-3 py-2"
              onPress={() => router.push(`todo/${item.id}`)}
            >
              <Text className="text-blue-700 font-semibold">Sửa</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <Pressable
        className="bg-blue-200 rounded-lg px-3 py-2"
        onPress={() => router.push(`todo/new`)}
      >
        <Text className="text-blue-700 font-semibold">Thêm mới</Text>
      </Pressable>
      <TextInput
        className="border-black rounded-sm border-2 m-2"
        value={searchName}
        onChangeText={setSearchName}
        placeholder="Tìm kiếm"
      />

      <FlatList
        data={filterSearchName}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
