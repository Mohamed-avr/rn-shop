import { View, Text, TouchableOpacity } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryLayout({}) {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
}
