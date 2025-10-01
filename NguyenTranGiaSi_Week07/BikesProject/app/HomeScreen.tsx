import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ListRenderItem,
} from 'react-native';
import { useRouter } from 'expo-router';

type BikeType = 'Mountain' | 'Roadbike';

interface Bike {
  id: string;
  name: string;
  price: number;
  discount: number;
  type: BikeType;
  image: ImageSourcePropType;
}

const bikes: Bike[] = [
  {
    id: '1',
    name: 'Pina Mountain',
    price: 2000,
    discount: 15,
    type: 'Mountain',
    image: require('../assets/anh1.png'),
  },
  {
    id: '2',
    name: 'Pinarello Mountain',
    price: 1900,
    discount: 10,
    type: 'Roadbike',
    image: require('../assets/anh2.png'),
  },
  {
    id: '3',
    name: 'Pinarello',
    price: 1350,
    discount: 10,
    type: 'Mountain',
    image: require('../assets/anh3.png'),
  },
  {
    id: '4',
    name: 'Pina Bike',
    price: 1500,
    discount: 10,
    type: 'Roadbike',
    image: require('../assets/anh4.png'),
  },
  {
    id: '5',
    name: 'Pinarello',
    price: 1900,
    discount: 10,
    type: 'Roadbike',
    image: require('../assets/anh5.png'),
  },
  {
    id: '6',
    name: 'Pinarello',
    price: 2700,
    discount: 10,
    type: 'Mountain',
    image: require('../assets/anh6.png'),
  },
];

const HomeScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'All' | BikeType>('All');
  const router = useRouter();

  const filteredBikes =
    selectedType === 'All'
      ? bikes
      : bikes.filter((bike) => bike.type === selectedType);

  const renderItem: ListRenderItem<Bike> = ({ item }) => {
    const finalPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push({ pathname: '/DetailScreen', params: { id: item.id } })}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>

        {item.discount ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.discounted}>${item.price}</Text>
            <Text style={styles.finalPrice}>${finalPrice.toFixed(0)}</Text>
          </View>
        ) : (
          <Text style={styles.finalPrice}>${item.price}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The world's Best Bike</Text>

      <View style={styles.filterContainer}>
        {['All', 'Roadbike', 'Mountain'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedType === type && styles.selectedFilter,
            ]}
            onPress={() => setSelectedType(type as 'All' | BikeType)}
          >
            <Text
              style={{
                color: selectedType === type ? 'white' : 'black',
                fontWeight: '500',
              }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        numColumns={2}
        data={filteredBikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'red',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedFilter: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  discounted: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 14,
    marginRight: 6,
  },
  finalPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
