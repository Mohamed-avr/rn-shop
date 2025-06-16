import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

import { PRODUCTS } from "../../../assets/products";
import { productListItem } from "../../components/product-List-Item";

export default function Home() {
  return (
    <View>
      {/* <Text>/ Home </Text> */}
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => {
          return (
            <View>
              <Text> {item.title} </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<Text> Product</Text>}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        {" "}
      </FlatList>
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
});
