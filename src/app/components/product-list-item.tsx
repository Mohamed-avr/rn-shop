import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Product } from "../../../assets/types/product";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <View>
      <Text>product-list-item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "48%",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemImageContainer: {
    borderRadius: 10,
    width: "100%",
    height: 150,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
