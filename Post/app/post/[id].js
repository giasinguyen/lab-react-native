import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostsState } from '../../src/store';
import { updatePost, deletePost } from '../../src/postSlice';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams(); // id dạng string
  const numericId = Number(id);

  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector(selectPostsState);

  const existing = items.find(p => p.id === numericId);

  const [title, setTitle] = useState(existing?.title || '');
  const [body, setBody] = useState(existing?.body || '');

  // đồng bộ lại khi existing thay đổi
  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setBody(existing.body);
    }
  }, [existing]);

  if (!existing || Number.isNaN(numericId)) {
    return (
      <View style={styles.container}>
        <Text>Post not found. Go back to list.</Text>
      </View>
    );
  }

  const handleUpdate = async () => {
    if (!title.trim() || !body.trim()) return;
    await dispatch(
      updatePost({ id: numericId, title: title.trim(), body: body.trim() })
    );
    router.back();
  };

  const handleDelete = async () => {
    await dispatch(deletePost(numericId));
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Body</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={handleUpdate}>
          <Text>Save</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { borderColor: 'red' }]}
          onPress={handleDelete}
        >
          <Text style={{ color: 'red' }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
});