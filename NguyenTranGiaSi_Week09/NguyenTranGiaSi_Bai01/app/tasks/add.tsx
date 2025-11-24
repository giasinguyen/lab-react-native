import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../../constants/color";

export default function AddJob() {
  const { edit } = useLocalSearchParams<{ edit?: string }>();

  return (
    <SafeAreaView style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={20} color={C.text} />
        </TouchableOpacity>
        <Image source={require("../../assets/avatar.png")} style={s.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={s.hi}>Hi Twinkle</Text>
          <Text style={s.sub}>Have a grate day a head</Text>
        </View>
      </View>

      <Text style={s.title}>ADD YOUR JOB</Text>

      <View style={s.inputRow}>
        <Ionicons
          name="apps-outline"
          size={16}
          color="#22C55E"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          defaultValue={typeof edit === "string" ? edit : ""}
          placeholder="input your job"
          placeholderTextColor="#9CA3AF"
          style={s.input}
        />
      </View>

      <TouchableOpacity
        style={s.finish}
        activeOpacity={0.95}
        onPress={() => router.back()}
      >
        <Text style={s.finishText}>FINISH</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={C.white}
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>

      <Image
        source={require("../../assets/note.png")}
        style={s.illus}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.white, paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginLeft: 6 },
  hi: { fontSize: 16, fontWeight: "700", color: C.text },
  sub: { color: C.muted, marginTop: 2 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: C.text,
    marginTop: 22,
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 40,
  },
  input: { flex: 1, color: C.text, fontSize: 14 },
  finish: {
    backgroundColor: C.teal,
    height: 44,
    borderRadius: 10,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  finishText: { color: C.white, fontWeight: "700", letterSpacing: 0.3 },
  illus: {
    position: "absolute",
    bottom: 28,
    right: 24,
    width: 220,
    height: 160,
  },
});
