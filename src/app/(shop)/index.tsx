import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";

import { PRODUCTS } from "../../../assets/products";
import ProductListItem from "../../components/product-list-item";
import ListHeader from "../../components/list-header";

import Auth from "../auth";
import { useAuth } from "../../providers/auth-provider";
import { use } from "react";

export default function Home() {
  const { user, session } = useAuth();

  console.log("Session user ID:", session?.user?.id);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBlock: 20,
  },
  flatListColumn: {
    // paddingVertical: 20,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
  },
});
