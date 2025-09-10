import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  TextInput,
} from 'react-native';

export default function Result() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          editable
          multiline
          style={{
            borderColor: 'black',
            backgroundColor: 'white',
            alignContent: 'center',
            fontWeight: 'bold',
            height: 50,
            borderRadius: 5,
            borderWidth: 2,
          }}
          onChangeText={(text) => onChangeText(text)}
          placeholder="Kết quả:"
        />
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
});
