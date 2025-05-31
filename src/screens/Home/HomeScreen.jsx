import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.welcomeText}>Bem-vindo à Home!</Text>
      <Button mode="contained" onPress={handleLogout}>
        Sair
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 24,
  },
});

export default HomeScreen;
