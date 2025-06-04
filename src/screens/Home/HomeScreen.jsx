import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Card,
  Button,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import axios from "axios";

const HomeScreen = ({ onLogout }) => {
  const [cotacoes, setCotacoes] = useState({});
  const [loading, setLoading] = useState(true);

  const moedas = ["USD-BRL", "EUR-BRL", "BTC-BRL"];

  const fetchCotacoes = async () => {
    try {
      const response = await axios.get(
        `https://economia.awesomeapi.com.br/last/${moedas.join(",")}`
      );
      setCotacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotacoes();
  }, []);

  const getIcon = (code) => {
    switch (code) {
      case "USD":
        return "💵";
      case "EUR":
        return "💶";
      case "BTC":
        return "🪙";
      default:
        return "💰";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💱 Cotações de Moedas</Text>

      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <Card style={styles.card}>
          <Card.Content style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>💹 Resumo das Cotações</Text>
            <Text style={styles.cardSubtitle}>
              Valores atualizados em tempo real
            </Text>
          </Card.Content>

          <Divider style={styles.divider} />

          <Card.Content>
            {moedas.map((codigo, index) => {
              const info = cotacoes[codigo.replace("-", "")];
              if (!info) return null;

              return (
                <View key={codigo}>
                  {index > 0 && <Divider style={styles.innerDivider} />}
                  <View style={styles.infoRow}>
                    <Text style={styles.moedaLabel}>
                      {getIcon(info.code)} {info.code} para BRL:
                    </Text>
                    <Text style={styles.moedaValor}>
                      R$ {parseFloat(info.bid).toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "stretch",
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    elevation: 4,
    marginBottom: 24,
    paddingBottom: 12,
  },
  cardTitleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  moedaLabel: {
    fontSize: 16,
    color: "#2c3e50",
  },
  moedaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#ecf0f1",
  },
  innerDivider: {
    marginVertical: 4,
    backgroundColor: "#ecf0f1",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 6,
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
