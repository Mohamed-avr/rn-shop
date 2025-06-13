import { Tabs } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

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
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIconStyle: {
            paddingTop: 4,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="orders"
          options={{ title: "Orders", headerShown: false }}
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
