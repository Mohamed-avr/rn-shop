import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  Button,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../../../assets/products";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";

// Global function 
export default function ProductDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();

  const product = PRODUCTS.find((item) => item.slug === slug);

  // For debugging purposes
  console.log(slug, product);

  if (!product) {
    return <Redirect href={"/404"} />;
  }

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  // actions
  const increaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity((prev) => prev + 1);
      incrementItem(product.id);
    } else {
      toast.show("cannot add more than max quantity", {
        type: "warning",
        placement: "top",
        duration: 1500,
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrementItem(product.id);
    }
  };
  const addToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.heroImage,
      price: product.price,
      quantity: quantity,
    });

    toast.show("Item added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: product.title,
          headerTitleAlign: "center",
        }}
      />

      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "relative",
          paddingLeft: 16,
          paddingTop: 16,
          paddingRight: 16,
          paddingBottom: 0,
          gap: 8,
          backgroundColor: "#fc4",
        }}
      >
        <View
          style={{
            width: "78%",
            height: "90%",
            zIndex: 10,
            backgroundColor: "#fcc",
          }}
        >
          <Image source={product.heroImage} style={styles.heroImage} />
        </View>

        <FlatList
          data={product.imagesUrl}
          style={{
            width: "100%",
            height: "100%",
            top: 0,
            right: 0,
            zIndex: 10,
            gap: 20,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
        />
      </View>
      <View style={{ padding: 16, flex: 1, backgroundColor: "#ccf" }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.slug}>{product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: ${totalPrice} </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
            disabled={quantity >= product.maxQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              { opacity: quantity === 0 ? 0.5 : 1 },
            ]}
            onPress={addToCart}
            disabled={quantity === 0}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    zIndex: 0,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: 500,
    color: "#000",
  },

  image: {
    width: "100%",
    flex: 1,
    height: 94,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});