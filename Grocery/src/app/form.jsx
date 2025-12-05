import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { createGrocery, updateGrocery } from "@/grocerySlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { selectGroceryState } from "@/store";

export default function Form() {
  const dispath = useDispatch();
  const router = useRouter();
  const { items } = useSelector(selectGroceryState);
  const { id } = useLocalSearchParams();
  const item = id ? items.find((p) => p.id === id) : null;
  const [form, setForm] = useState({
    name: item?.name,
    category: item?.category,
    quantity: String(item?.quantity) || 0,
  });

  const handleSave = async () => {
    const data = {
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity) || 0,
    };

    if (id && item) {
      await dispath(updateGrocery({ id, ...data }));
    } else {
      await dispath(
        createGrocery({ ...data, bought: false, createAt: new Date() })
      );
    }

    router.back();
  };

  return (
    <View className="flex-1 p-4 gap-3">
      <TextInput
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
        className="border p-2 rounded-2xl"
      />
      <TextInput
        value={form.category}
        onChangeText={(v) => setForm({ ...form, category: v })}
        className="border p-2 rounded-2xl"
      />
      <TextInput
        value={form.quantity}
        onChangeText={(v) => setForm({ ...form, quantity: v })}
        className="border p-2 rounded-2xl"
        keyboardType="numeric"
      />

      <Pressable onPress={handleSave}>
        <Text>{id ? "Update" : "Create"}</Text>
      </Pressable>
    </View>
  );
}
