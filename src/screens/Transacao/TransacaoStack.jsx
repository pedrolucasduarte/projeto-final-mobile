import { createStackNavigator } from "@react-navigation/stack";

import TransacaoFormScreen from "./TransacaoFormScreen";
import TransacaoListScreen from "./TransacaoListScreen";

const Stack = createStackNavigator();

export default function TransacaoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransacaoListScreen"
        component={TransacaoListScreen}
        options={{
          title: "Lista de Transações",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="TransacaoFormScreen"
        component={TransacaoFormScreen}
        options={{
          title: "Formulário de Transação",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
