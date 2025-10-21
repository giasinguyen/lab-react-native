import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShopCard from "../components/ShopCard";

const DATA = [
  {
    id: "1",
    name: "Kitanda Espresso & Acai-U District",
    addr: "1121 NE 45 St",
    status: "Accepting Orders",
    eta: "5-10 minutes",
    open: true,
    img: require("../assets/anh3.png"),
  },
  {
    id: "2",
    name: "Jewel Box Cafe",
    addr: "1145 GE 54 St",
    status: "Temporary Unavailable",
    eta: "10-15 minutes",
    open: false,
    img: require("../assets/anh2.png"),
  },
  {
    id: "3",
    name: "Javastí Cafe",
    addr: "1167 GE 54 St",
    status: "Temporary Unavailable",
    eta: "15-20 minutes",
    open: false,
    img: require("../assets/anh4.png"),
  },
];

export default function Shops() {
  return (
    <SafeAreaView style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text style={s.title}>Shops Near Me</Text>
        <Ionicons name="search" size={18} color={"#059669"} />
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <ShopCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/drinks",
                params: { shop: item.name },
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#F9FAFB" },
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
});
