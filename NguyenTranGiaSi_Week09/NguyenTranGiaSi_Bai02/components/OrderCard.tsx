import { View, Text, StyleSheet } from "react-native";

export default function OrderCard({
  title,
  sub,
  price,
  color,
}: {
  title: string;
  sub: string;
  price: number;
  color: string;
}) {
  return (
    <View style={[s.card, { backgroundColor: color }]}>
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.sub}>{sub}</Text>
      </View>
      <Text style={s.price}>${price}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    height: 84,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  title: { color: "#fff", fontWeight: "800" },
  sub: { color: "#E5E7EB", marginTop: 4 },
  price: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
