import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  TextInput,
  Button,
} from 'react-native';

export default function Calculator() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonClick}>C</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  buttonClick: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    fontWeight: 'bold',
    borderWidth: 2,
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
