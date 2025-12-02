import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../src/postSlice";
import { selectPostsState } from "../src/store";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectPostsState);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
        <Pressable style={styles.button} onPress={() => dispatch(fetchPosts())}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => router.push(`/post/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.body}>
        {item.body}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/post/new")}
      >
        <Text style={styles.addButtonText}>+ New Post</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 8,
  },
  addButtonText: { fontWeight: "bold" },
  item: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  title: { fontWeight: "bold", marginBottom: 4 },
  body: { fontSize: 14, opacity: 0.8 },
  button: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});