import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Button,
  StatusBar,
} from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../../../assets/products";
import { useCartStore } from "../../store/cart-store";

export default function ProductDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();

  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return <Redirect href={"/404"} />;
  }

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Product Details",
          headerTitleAlign: "center",
        }}
      />
      <Text>ProductDetails ...</Text>
    </View>
  );
}
