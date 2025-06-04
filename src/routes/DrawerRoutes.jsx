import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import TransacaoListScreen from '../screens/Transacao/TransacaoListScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Transacoes"
        component={TransacaoListScreen}
        options={{
          title: "Transações",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" color={color} size={size} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}
