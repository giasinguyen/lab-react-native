import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const IntroScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        A premium online store for sporter and stylish choice
      </Text>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/anh1.png')} style={styles.image} />
      </View>

      <Text style={styles.brand}>POWER BIKE SHOP</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/HomeScreen')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#E94141',
    padding: 40,
    borderRadius: 10,
  },
  image: {
    width: 210,
    height: 200,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IntroScreen;
