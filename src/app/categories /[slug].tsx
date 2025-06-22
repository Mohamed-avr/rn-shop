import { View, Text, StyleSheet } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "../../../assets/categories";
import { PRODUCTS } from "../../../assets/products";

export default function Category() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const Category = CATEGORIES.find((category) => category.slug === slug);

  if (!Category) {
    return <Redirect href="/404" />;
  }

  const products = PRODUCTS.filter((product) => product.category.slug === slug);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: Category.name, headerShown: true }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});
