import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  TextInput,
} from 'react-native';

export default function Input() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
        style={styles.textarea}
        multiline
        numberOfLines={4}
        placeholder="Nhập số vào đây "
        placeholderTextColor="#888"
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 8,
  },
   textarea: {
    borderWidth: 1,
    borderColor: '#black',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 8,
  },
});
