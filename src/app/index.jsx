import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import coolimage from "@/assets/images/coolcat.jpg"

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={coolimage}
      resizeMode = 'cover'
      style = {styles.image}
      >
      <Text style={styles.text}>Todo List</Text>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"

  },
});