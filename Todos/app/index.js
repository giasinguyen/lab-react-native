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
import { fetchTodos, deleteTodo } from "@/src/todosSlice";
import { selectTodosState } from "@/src/store";
import { useEffect, useMemo, useState } from "react";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectTodosState);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTodo(id));
    router.replace("/");
  };

  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  const filterSearchName = useMemo(() => {
    if (!searchName) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [items, searchName]);

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

      <TextInput value={searchName} onChangeText={handleSearchNameChange}/>

      <Pressable onPress={() => router.push(`todo/new`)}>
        <Text>Create New Todo</Text>
      </Pressable>

      <FlatList
        data={filterSearchName}
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
