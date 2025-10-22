import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DrinkRow from "../components/DrinkRow";

const DRINKS = [
  { id: "d1", name: "Milk", price: 20, img: require("../assets/anh1.png") },
  {
    id: "d2",
    name: "Origin",
    price: 68,
    img: require("../assets/anh5.png"),
  },
  { id: "d3", name: "Salt", price: 5, img: require("../assets/anh3.png") },
  {
    id: "d4",
    name: "Espresso",
    price: 9,
    img: require("../assets/anh2.png"),
  },
  {
    id: "d5",
    name: "Capuchino",
    price: 23,
    img: require("../assets/anh4.png"),
  },
  {
    id: "d6",
    name: "Weasel",
    price: 20,
    img: require("../assets/anh1.png"),
  },
  { id: "d7", name: "Culi", price: 0, img: require("../assets/anh2.png") },
  {
    id: "d8",
    name: "Catimor",
    price: 9,
    img: require("../assets/anh5.png"),
  },
];

export default function Drinks() {
  const { shop } = useLocalSearchParams<{ shop?: string }>();
  return (
    <SafeAreaView style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text style={s.title}>Drinks</Text>
        <Ionicons name="search" size={18} color={"#059669"} />
      </View>

      <FlatList
        data={DRINKS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        renderItem={({ item }) => <DrinkRow item={item} />}
      />

      <TouchableOpacity
        style={s.cartBtn}
        onPress={() => router.push("/cart")}
      >
        <Text style={s.cartText}>GO TO CART</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  cartBtn: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
  },
  cartText: { color: "#fff", fontWeight: "800" },
});
