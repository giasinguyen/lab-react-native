import { ImageSourcePropType } from 'react-native';

export type BikeType = 'Mountain' | 'Roadbike';

export interface Bike {
  id: string;
  name: string;
  price: number;
  discount: number;
  type: BikeType;
  image: ImageSourcePropType;
}

export const bikes: Bike[] = [
  {
    id: '1',
    name: 'Pina Mountain',
    price: 2000,
    discount: 15,
    type: 'Mountain',
    image: require('@/assets/anh1.png'),
  },
  {
    id: '2',
    name: 'Pinarello Mountain',
    price: 1900,
    discount: 10,
    type: 'Roadbike',
    image: require('@/assets/anh2.png'),
  },
  {
    id: '3',
    name: 'Pinarello',
    price: 1350,
    discount: 10,
    type: 'Mountain',
    image: require('@/assets/anh3.png'),
  },
  {
    id: '4',
    name: 'Pina Bike',
    price: 1500,
    discount: 10,
    type: 'Roadbike',
    image: require('@/assets/anh4.png'),
  },
  {
    id: '5',
    name: 'Pinarello',
    price: 1900,
    discount: 10,
    type: 'Roadbike',
    image: require('@/assets/anh5.png'),
  },
  {
    id: '6',
    name: 'Pinarello',
    price: 2700,
    discount: 10,
    type: 'Mountain',
    image: require('@/assets/anh6.png'),
  },
];
