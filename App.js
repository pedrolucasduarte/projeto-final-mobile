import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import LoginScreen from "./src/screens/Auth/LoginScreen";
// import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import DrawerRoutes from "./src/routes/DrawerRoutes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
