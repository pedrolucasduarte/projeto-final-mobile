import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrcamentoListScreen from "../screens/Orcamento/OrcamentoListScreen";
import OrcamentoFormScreen from "../screens/Orcamento/OrcamentoFormScreen";

const Stack = createStackNavigator();

export default function OrcamentoStack() {
  return (
    <Stack.Navigator initialRouteName="OrcamentoList">
      <Stack.Screen
        name="OrcamentoList"
        component={OrcamentoListScreen}
        options={{ title: "Lista de Orçamentos" }}
      />
      <Stack.Screen
        name="OrcamentoForm"
        component={OrcamentoFormScreen}
        options={{ title: "Formulário de Orçamento" }}
      />
    </Stack.Navigator>
  );
}
