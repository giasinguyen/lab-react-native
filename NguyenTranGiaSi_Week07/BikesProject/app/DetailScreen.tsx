import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useLocalSearchParams } from 'expo-router';

import { bikes } from './constants/bikes'; 
export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = bikes.find((bike) => bike.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Product not found.</Text>
      </View>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        {product.discount ? (
          <>
            <Text style={styles.oldPrice}>${product.price}</Text> ${discountedPrice}
          </>
        ) : (
          `$${product.price}`
        )}
      </Text>
      <Text style={styles.description}>
        <Text style={{ fontWeight: 'bold' }}>Description: </Text>
        It is a very important form of writing as we write almost everything in
        paragraphs, be it an answer, essay, story, emails, etc.
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Pressable style={{ marginTop: 35, marginRight: 20 }}>
          <EvilIcons name="heart" size={24} color="black" />
        </Pressable>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  image: { width: 250, height: 200, resizeMode: 'contain' },
  name: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 20, color: '#f00', marginVertical: 5 },
  oldPrice: { textDecorationLine: 'line-through', color: 'gray', fontSize: 16 },
  description: { marginTop: 10, textAlign: 'center' },
  button: {
    backgroundColor: 'red',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
