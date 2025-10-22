import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CafeWelcome() {
  return (
    <SafeAreaView style={s.wrap}>
      <View style={{ flex: 1 }} />
      <Text style={s.title}>Welcome to Cafe world</Text>

      <Image
        source={require("../assets/anh1.png")}
        style={s.banner}
        resizeMode="cover"
      />
      <Image
        source={require("../assets/anh2.png")}
        style={[s.banner, { opacity: 0.9 }]}
        resizeMode="cover"
      />
      <View style={s.placeholder} />
      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={s.cta}
        onPress={() => router.push("/shops")}
        activeOpacity={0.9}
      >
        <Text style={s.ctaText}>GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#E5E7EB", paddingHorizontal: 20 },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 24,
  },
  banner: {
    width: "80%",
    height: 76,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  placeholder: {
    width: "70%",
    height: 56,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  cta: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 28,
    backgroundColor: "#10BBD5",
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  ctaText: { color: "#fff", fontWeight: "700" },
});
