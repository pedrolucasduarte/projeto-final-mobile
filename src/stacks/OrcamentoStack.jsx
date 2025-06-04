import { createStackNavigator } from "@react-navigation/stack";

import OrcamentoFormScreen from "../screens/Orcamento/OrcamentoFormScreen";
import OrcamentoListScreen from "../screens/Orcamento/OrcamentoListScreen";

const Stack = createStackNavigator();

export default function OrcamentoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrcamentoListScreen"
        component={OrcamentoListScreen}
        options={{
          title: "Lista de Orçamentos",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="OrcamentoFormScreen"
        component={OrcamentoFormScreen}
        options={{
          title: "Formulário de Orçamento",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
