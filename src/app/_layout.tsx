import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import PhoneWrapper from "../components/phone-wrapper";
import { ToastProvider } from "react-native-toast-notifications";
import Auth from "./auth";
import AuthProvider from "../providers/auth-provider";

export default function RootLayout() {
  return (
    <PhoneWrapper>
      <ToastProvider>
        <AuthProvider>
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
              name="auth"
              options={{
                title: "auth",
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
        </AuthProvider>
      </ToastProvider>
    </PhoneWrapper>
  );
}
