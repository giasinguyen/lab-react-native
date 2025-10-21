import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Shop = {
  id: string;
  name: string;
  addr: string;
  status: string;
  eta: string;
  open: boolean;
  img: any;
};
export default function ShopCard({
  item,
  onPress,
}: {
  item: Shop;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={s.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={item.img} style={s.cover} />
      <View style={{ padding: 12 }}>
        <View style={s.badges}>
          <View style={[s.badge, item.open ? s.ok : s.bad]}>
            <Ionicons
              name={item.open ? "checkmark" : "lock-closed"}
              size={12}
              color={item.open ? "#22C55E" : "#EF4444"}
            />
            <Text
              style={[
                s.badgeText,
                { color: item.open ? "#22C55E" : "#EF4444" },
              ]}
            >
              {item.status}
            </Text>
          </View>
          <View style={s.badge}>
            <Ionicons name="time-outline" size={12} color={"#059669"} />
            <Text style={[s.badgeText, { color: "#059669" }]}>{item.eta}</Text>
          </View>
          <Ionicons name="location" size={14} color={"#10B981"} />
        </View>
        <Text style={s.name}>{item.name}</Text>
        <Text style={s.addr}>{item.addr}</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 1,
  },
  cover: { height: 120, width: "100%" },
  badges: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 12,
    marginRight: 8,
  },
  ok: {},
  bad: {},
  badgeText: { fontSize: 11, marginLeft: 4 },
  name: { fontWeight: "700", color: "#111827" },
  addr: { color: "#6B7280", marginTop: 2 },
});
