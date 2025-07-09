import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PhoneWrapper from "./src/components/phone-wrapper";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
