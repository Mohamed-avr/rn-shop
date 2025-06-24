import { View, Text, StyleSheet, Image } from "react-native";
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
      <Stack.Screen
        options={{
          title: Category.name,
          headerShown: true,
        }}
      />

      <Image source={{ uri: Category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{Category.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
