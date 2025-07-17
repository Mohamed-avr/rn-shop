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
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../../../assets/products";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";
import { Svg, Path, XmlAST } from "react-native-svg";

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

  // hamdle favorite action

  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavorate = () => {
    setIsFavorited(!isFavorited);
  };

  const route = useRouter();
  console.log("route", route);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: product.title,
          headerTitleAlign: "center",
        }}
      />

      {/* <TouchableOpacity
        onPress={() => {
          route.push("/");
        }}
      ></TouchableOpacity> */}
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "relative",
          paddingLeft: 16,
          height: "auto",
          paddingTop: 16,
          paddingRight: 16,
          paddingBottom: 12,
          gap: 8,
        }}
      >
        <View
          style={{
            width: "78%",
            height: "90%",
            zIndex: 10,
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
      <View
        style={{
          padding: 16,
          flex: 1,
          backgroundColor: "#f1f2f6",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.slug}>{product.slug}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleFavorate}
              style={{
                width: 55,
                height: 40,
                borderRadius: 18,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isFavorited ? (
                <Svg width="24" height="24" fill={"#222"} viewBox="0 0 256 256">
                  <Path
                    d={
                      "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"
                    }
                  ></Path>
                </Svg>
              ) : (
                <Svg
                  width="24"
                  height="24"
                  fill={"#ff0000"}
                  viewBox="0 0 256 256"
                >
                  <Path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></Path>
                </Svg>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 24,
            width: "auto",
            left: 0,
            right: 0,
            height: 60,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 60,
              backgroundColor: "#cdf493",
              borderRadius: 32,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 14,
            }}
          >
            {/* left */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ${totalPrice}{" "}
            </Text>
            {/* right */}
            <View style={{ flexDirection: "row", gap: 14 }}>
              {/*  add to cart */}
              <TouchableOpacity
                style={{
                  width: 55,
                  height: 40,
                  borderRadius: 18,
                  opacity: quantity === 0 ? 0.5 : 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#222",
                  borderWidth: 1,
                }}
                onPress={addToCart}
                disabled={quantity === 0}
              >
                <Svg width="24" height="24" fill="#222" viewBox="0 0 256 256">
                  <Path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></Path>
                </Svg>
              </TouchableOpacity>
              {/* end add to cart  */}
              {/* buy button  */}
              <TouchableOpacity
                style={{
                  width: "auto",
                  height: 40,
                  flexDirection: "row",
                  gap: 12,
                  paddingHorizontal: 12,
                  borderRadius: 18,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  alert("buy now clicked");
                }}
              >
                <Text> Buy now</Text>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <Path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></Path>
                </Svg>
              </TouchableOpacity>
              {/*  end buy button  */}
              {/*  end right */}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity === 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
            disabled={quantity === product.maxQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
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
    fontSize: 20,
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
    width: "40%",
    borderColor: "#444",
    borderWidth: 1,
  },
  quantityButton: {
    flex: 1,
    height: 40,
    // borderRadius: 12,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",

    justifyContent: "center",
    textAlign: "center",
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