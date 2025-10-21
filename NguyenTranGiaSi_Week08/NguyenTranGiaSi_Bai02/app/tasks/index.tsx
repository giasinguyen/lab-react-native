import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../../constants/color";
import TaskItem from "../../components/TaskItem";

const SEED = [
  "To check email",
  "UI task web page",
  "Learn javascript basic",
  "Learn HTML Advance",
  "Medical App UI",
  "Learn Java",
];
export default function Tasks() {
  const { name = "Twinkle" } = useLocalSearchParams<{ name?: string }>();

  return (
    <SafeAreaView style={s.wrap}>
      <View style={s.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={20} color={C.text} />
        </TouchableOpacity>
        <View style={s.profileBox}>
          <Image source={require("../../assets/avatar.png")} style={s.avatar} />
          <View>
            <Text style={s.hi}>Hi {String(name)}</Text>
            <Text style={s.sub}>Have a grate day a head</Text>
          </View>
        </View>
      </View>

      <View style={s.searchRow}>
        <Ionicons
          name="search"
          size={16}
          color="#9CA3AF"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          style={s.searchInput}
        />
      </View>

      <FlatList
        data={SEED}
        keyExtractor={(t) => t}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TaskItem
            title={item}
            onEdit={() =>
              router.push({ pathname: "/tasks/add", params: { edit: item } })
            }
            onDelete={() => {}}
          />
        )}
      />

      <TouchableOpacity
        style={s.fab}
        activeOpacity={0.9}
        onPress={() => router.push("/tasks/add")}
      >
        <Ionicons name="add" size={26} color={C.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.white, paddingHorizontal: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  profileBox: { flexDirection: "row", alignItems: "center", marginLeft: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  hi: { fontSize: 16, fontWeight: "700", color: C.text },
  sub: { color: C.muted, marginTop: 2 },
  searchRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 40,
  },
  searchInput: { flex: 1, color: C.text, fontSize: 14 },
  fab: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.teal,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
