import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { C } from '../../constants/color'; 

export default function Welcome() {
  const [name, setName] = useState('');

  const go = () => {
    router.push({
      pathname: '/tasks',
      params: { name: name || 'Twinkle' },
    });
  };

  return (
    <SafeAreaView style={s.wrap}>
      <View style={{ flex: 1 }} />
      <Text style={s.title}>MANAGE YOUR{"\n"}TASK</Text>

      <View style={s.inputRow}>
        <Ionicons
          name="person-outline"
          size={18}
          color="#9CA3AF"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#9CA3AF"
          style={s.input}
          returnKeyType="done"
          onSubmitEditing={go}
        />
      </View>

      <TouchableOpacity style={s.cta} activeOpacity={0.9} onPress={go}>
        <Text style={s.ctaText}>GET STARTED</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={C.white}
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>

      <View style={{ flex: 2 }} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.white, paddingHorizontal: 24 },
  title: {
    textAlign: "center",
    color: C.primary,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 24,
    height: 44,
  },
  input: { flex: 1, color: C.text, fontSize: 15 },
  cta: {
    marginTop: 28,
    alignSelf: "center",
    backgroundColor: C.teal,
    height: 44,
    paddingHorizontal: 22,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { color: C.white, fontWeight: "700", letterSpacing: 0.3 },
});
