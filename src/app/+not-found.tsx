import { View, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops! This screen doesn't exist.",
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 56, fontWeight: "bold", marginBottom: 32 }}>
          404
        </Text>
        <Link href="/"> Go home screen</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
