import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { COLORS } from "../../theme/theme";
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
      }

      await login(email, senha);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        outlineColor={COLORS.primary}
        activeOutlineColor={COLORS.primary}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor={COLORS.primary}
        activeOutlineColor={COLORS.primary}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      <Button
        onPress={() => navigation.navigate("RegisterScreen")}
        style={styles.link}
        labelStyle={{ color: COLORS.primary }}
      >
        Não tem conta? Criar agora
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 6,
    marginTop: 8,
  },
  link: {
    marginTop: 12,
  },
});
