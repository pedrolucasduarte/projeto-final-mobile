import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/Home/HomeScreen";
import TransacaoListScreen from "../screens/Transacao/TransacaoListScreen";
import CartaoListScreen from "../screens/Cartao/CartaoListScreen";
import OrcamentoListScreen from "../screens/Orcamento/OrcamentoListScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabRoutes({ onLogout }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#007AFF",
          fontWeight: "bold",
          fontSize: 20,
          borderWidth: 1,
          borderColor: "#007AFF",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Transações") {
            iconName = "swap-horizontal-outline";
          } else if (route.name === "Cartões") {
            iconName = "card-outline";
          } else if (route.name === "Orçamentos") {
            iconName = "cash-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          elevation: 0,
        },
        tabBarHideOnKeyboard: false,
        tabBarLabelStyle: {
          paddingBottom: 2,
        },
        animationEnabled: false,
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Transações" component={TransacaoListScreen} />
      <Tab.Screen name="Cartões" component={CartaoListScreen} />
      <Tab.Screen name="Orçamentos" component={OrcamentoListScreen} />
    </Tab.Navigator>
  );
}
