import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: 4 }} {...props} />;
}

const TabsLayout = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1BC464",
          tabBarInactiveTintColor: "gray",

          tabBarStyle: {
            backgroundColor: "white",
            height: 70,
            borderTopWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 4,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarIconStyle: {
            paddingTop: 4,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "shop",
            tabBarIcon(props) {
              return <TabBarIcon name="shopping-cart" {...props} />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon(props) {
              return <TabBarIcon name="book" {...props} />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
