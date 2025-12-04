import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "@/src/todosSlice";
import { selectTodosState } from "@/src/store";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectTodosState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <Pressable
      className="p-5 bg-blue"
      onPress={() => router.push(`todo/${item.id}`)}
    >
      <Text>{item.title}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 p-10 gap-1 bg-blue">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
