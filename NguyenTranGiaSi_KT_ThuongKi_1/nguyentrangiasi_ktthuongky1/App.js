import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import Input from './components/Input';
import Calculator from './components/Calculator';
import Result from './components/Result';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{
        fontWeight: 'bold',
        margin: 30,
        fontSize: 30,
        left: 60,
      }}> My Calculator </Text>
      <View style={{margin: 8}}>
        <Input />
        <Result />
      </View>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
