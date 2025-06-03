import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View>
      <Text>COLOCAR GRAFICO COM TODOS OS GASTOS/TRANSACAO</Text>
      <Text>INTEGRAR APIS AQUI NESTA TELA</Text>
      <Text>API PARA MOSTRAR COTACAO E CONVERSAO DO REAL</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;
