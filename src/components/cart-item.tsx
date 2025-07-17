import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useCartStore } from "../store/cart-store";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

export default function CartItem({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onDecrement(item.id)}
        >
          <Svg width="24" height="24" fill="#555" viewBox="0 0 256 256">
            <Path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></Path>
          </Svg>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onIncrement(item.id)}
        >
          <Svg width="22" height="22" fill="#555" viewBox="0 0 256 256">
            <Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></Path>
          </Svg>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.removeButton,
          { position: "absolute", right: 16, top: 16 },
        ]}
        onPress={() => onRemove(item.id)}
      >
        <Svg width="16" height="16" fill="gray" viewBox="0 0 256 256">
          <Path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></Path>
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    padding: 2,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
    position: "absolute",
    right: 8,
    bottom: 8,
    gap: 4,
  },
  quantityButton: {
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#ECECEC",
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
