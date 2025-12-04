import { useEffect, useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { deleteGrocery, fetchGroceries, updateGrocery } from "@/grocerySlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectGroceryState } from "@/store";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, loading, error } = useSelector(selectGroceryState);

  useEffect(() => {
    dispatch(fetchGroceries());
  }, [dispatch]);

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-3 m-3 border-2">
            <Text>Tên: {item.name}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Loại: {item.category}</Text>
            <Text>Trạng thái: {item.bought ? "Đã mua" : "Chưa mua"}</Text>
            <View className="flex-row">
              <Pressable
                onPress={() => {
                  dispatch(updateGrocery({ ...item, bought: !item.bought }));
                }}
                className="p-3 text-center border-2 rounded-2xl"
              >
                <Text>{item.bought ? "V" : "X"}</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  const confirm = window.confirm("Delete ?");
                  if (confirm) {
                    dispatch(deleteGrocery(item));
                    router.back();
                  }
                }}
                className="p-3 text-center border-2 rounded-2xl"
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
