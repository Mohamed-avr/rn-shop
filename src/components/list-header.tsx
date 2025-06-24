import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Link, Href } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { CATEGORIES } from "../../assets/categories";
import Category from "../app/categories/[slug]";

export default function ListHeader() {
  const signOutFunc = () => {
    alert("signed out successfully");
  };
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        {/*  left starts */}
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatarImage}
              source={{
                uri: "https://unsplash.com/photos/two-penguins-are-cuddling-among-their-flock-bypJE3Fxpaw",
              }}
            />
            <Text style={styles.avatarText}>MohamedCode </Text>
          </View>
        </View>
        {/*  left ed */}
        {/* right start  */}
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href="./cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color="gray"
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}> {1}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={signOutFunc} style={styles.signOutButton}>
            <FontAwesome name="sign-out" size={25} color="gray" />
          </TouchableOpacity>
        </View>
        {/*  right end */}
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}> Categories</Text>
        {/* flat list categories */}

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fcc",
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
