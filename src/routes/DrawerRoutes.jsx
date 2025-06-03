import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import CategoriaListScreen from "../screens/Categoria/CategoriaListScreen";
import ContaListScreen from "../screens/Conta/ContaListScreen";
import TransacaoListScreen from "../screens/Transacao/TransacaoListScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="CategoriaListScreen"
        component={CategoriaListScreen}
        options={{
          title: "Categorias",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="ContaListScreen"
        component={ContaListScreen}
        options={{
          title: "Conta",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="TransacaoListScreen"
        component={TransacaoListScreen}
        options={{
          title: "Transação",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>

    // COLOCAR UM BOTAO DE SAIR NA PARTE DE BAIXO DO DRAWER
  );
}
