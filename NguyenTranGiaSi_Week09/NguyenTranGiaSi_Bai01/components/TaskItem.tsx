import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/color";
import { useGlobalSearchParams, router } from 'expo-router';

type Props = {
  title: string;
  done: boolean;
  onToggleDone?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};



export default function TaskItem({ title, done, onToggleDone, onEdit, onDelete }: Props) {
  return (
    <View style={[s.item, done && s.itemDone]}>
      <TouchableOpacity onPress={onToggleDone} style={s.leftBox}>
        <Ionicons
          name={done ? "checkbox" : "square-outline"}
          size={20}
          color={done ? C.success : C.muted}
        />
      </TouchableOpacity>

      <Text
        style={[s.title, done && { textDecorationLine: "line-through", color: C.muted }]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={18} color="#EA5455" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit} style={s.iconBtn}>
        <Ionicons name="pencil-outline" size={18} color="#EA5455" />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.pill,
    paddingHorizontal: 14,
    height: 52,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  itemDone: {
    opacity: 0.6,
  },
  leftBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.white,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: { flex: 1, color: C.text, fontSize: 15, fontWeight: "600" },
  deleteBox: {
    width: 26,
    height: 14,
    backgroundColor: C.danger,
    borderRadius: 2,
    marginRight: 10,
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
