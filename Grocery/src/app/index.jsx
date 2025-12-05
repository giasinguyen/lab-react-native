import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View, TextInput } from "react-native";
import { deleteGrocery, fetchGroceries, updateGrocery } from "@/grocerySlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectGroceryState } from "@/store";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const { items, loading, error } = useSelector(selectGroceryState);

  const filterSearch = useMemo(() => {
    if (!searchName || !searchName.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [items, searchName]);

  useEffect(() => {
    dispatch(fetchGroceries());
  }, [dispatch]);

  return (
    <View className="flex-1">
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mx-3 my-2 border border-gray-300">
        <TextInput
          value={searchName}
          onChangeText={setSearchName}
          placeholder="Search..."
          placeholderTextColor="#888"
          className="flex-1 ml-2 text-[16px]"
        />
      </View>
      <FlatList
        data={filterSearch}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`m-3 p-4 rounded-2xl shadow-sm border ${
              item.bought
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Header: tên + badge trạng thái */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">{item.name}</Text>

              <View
                className={`px-3 py-1 rounded-full ${
                  item.bought ? "bg-green-100" : "bg-yellow-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    item.bought ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {item.bought ? "Đã mua" : "Chưa mua"}
                </Text>
              </View>
            </View>

            {/* Info */}
            <View className="gap-1 mb-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-gray-700">
                  Loại: <Text className="font-medium">{item.category}</Text>
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-gray-700">
                  Số lượng: <Text className="font-medium">{item.quantity}</Text>
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row gap-2 mt-1">
              {/* Toggle bought */}
              <Pressable
                onPress={() =>
                  dispatch(updateGrocery({ ...item, bought: !item.bought }))
                }
                className={`flex-row items-center px-3 py-2 rounded-full ${
                  item.bought ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`ml-1 text-xs font-semibold ${
                    item.bought ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.bought ? "Đánh dấu chưa mua" : "Đánh dấu đã mua"}
                </Text>
              </Pressable>

              {/* Edit */}
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/form",
                    params: { id: item.id },
                  })
                }
                className="flex-row items-center px-3 py-2 rounded-full bg-blue-500"
              >
                <Text className="ml-1 text-xs font-semibold text-white">
                  Edit
                </Text>
              </Pressable>

              {/* Delete */}
              <Pressable
                onPress={() => {
                  const confirm = window.confirm("Delete?");
                  if (confirm) {
                    dispatch(deleteGrocery(item));
                  }
                }}
                className="flex-row items-center px-3 py-2 rounded-full bg-red-500"
              >
                <Text className="ml-1 text-xs font-semibold text-white">
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
