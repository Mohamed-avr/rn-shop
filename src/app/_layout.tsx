import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import PhoneWrapper from "../components/phone-wrapper";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  return (
    <PhoneWrapper>
      <ToastProvider>
        <Stack>
          <Stack.Screen
            name="(shop)"
            options={{
              title: "Shop",
              headerShown: false,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="categories"
            options={{
              headerShown: false,
              title: "categories",
              headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="product"
            options={{
              headerShown: true,
              title: "Product",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              headerShown: true,
              title: "shoping cart ",
              headerTitleAlign: "center",
              presentation: "modal",
            }}
          />
        </Stack>
      </ToastProvider>
    </PhoneWrapper>
  );
}
