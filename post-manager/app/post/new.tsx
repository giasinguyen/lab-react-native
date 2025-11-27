import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { createPost } from "../../src/features/postsSlice";
import type { AppDispatch } from "../../src/store";

export default function NewPostScreen() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return;
    await dispatch(createPost({ title: title.trim(), body: body.trim() }));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        style={styles.input}
      />

      <Text style={styles.label}>Body</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Enter body"
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  button: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold" },
});
