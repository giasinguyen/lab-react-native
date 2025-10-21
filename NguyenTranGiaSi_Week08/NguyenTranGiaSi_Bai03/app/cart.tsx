import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderCard from "../components/OrderCard";

export default function Cart() {
  return (
    <SafeAreaView style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text style={s.title}>Your orders</Text>
        <Ionicons name="search" size={18} color={"#059669"} />
      </View>

      <OrderCard
        title="CAFE DELIVERY"
        price={5}
        sub="Order #18"
        color="#06B6D4"
      />
      <OrderCard title="CAFE" price={25} sub="Order #18" color="#7C3AED" />

      <View style={s.itemRow}>
        <Image source={require("../assets/anh3.png")} style={s.itemImg} />
        <View style={{ flex: 1 }}>
          <Text style={s.itemTitle}>Salt</Text>
          <Text style={s.itemSub}>$5</Text>
        </View>
        <TouchableOpacity style={s.circle}>
          <Ionicons name="remove" size={16} color={"#10B981"} />
        </TouchableOpacity>
        <TouchableOpacity style={s.circle}>
          <Ionicons name="add" size={16} color={"#10B981"} />
        </TouchableOpacity>
      </View>

      <View style={s.itemRow}>
        <Image source={require("../assets/anh4.png")} style={s.itemImg} />
        <View style={{ flex: 1 }}>
          <Text style={s.itemTitle}>Weasel</Text>
          <Text style={s.itemSub}>$20</Text>
        </View>
        <TouchableOpacity style={s.circle}>
          <Ionicons name="remove" size={16} color={"#10B981"} />
        </TouchableOpacity>
        <TouchableOpacity style={s.circle}>
          <Ionicons name="add" size={16} color={"#10B981"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={s.pay}>
        <Text style={s.payText}>PAY NOW</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#F3F4F6", paddingHorizontal: 12 },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 8 },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderTopWidth: 0,
    height: 70,
    paddingHorizontal: 12,
  },
  itemImg: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  itemTitle: { fontWeight: "700", color: "#111827" },
  itemSub: { color: "#6B7280", marginTop: 2 },
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
  pay: {
    marginTop: 24,
    backgroundColor: "#F59E0B",
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  payText: { color: "#fff", fontWeight: "800" },
});
