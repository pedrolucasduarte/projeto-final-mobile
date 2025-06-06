import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabRoutes from "./src/routes/BottomTabRoutes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabRoutes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
