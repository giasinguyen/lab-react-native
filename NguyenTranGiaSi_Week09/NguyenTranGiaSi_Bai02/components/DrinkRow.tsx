import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DrinkRow({
  item,
}: {
  item: { id: string; name: string; price: number; img: any };
}) {
  return (
    <View style={s.row}>
      <Image source={item.img} style={s.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{item.name}</Text>
        <Text style={s.price}>${item.price}</Text>
      </View>
      <TouchableOpacity style={s.circle}>
        <Ionicons name="remove" size={16} color={"#10B981"} />
      </TouchableOpacity>
      <TouchableOpacity style={s.circle}>
        <Ionicons name="add" size={16} color={"#10B981"} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 68,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  thumb: {
    width: 56,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  name: { fontWeight: "700", color: "#111827" },
  price: { color: "#6B7280", marginTop: 2 },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
