import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Card,
  Button,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { COLORS } from "../../theme/theme";

const HomeScreen = () => {
  const [cotacoes, setCotacoes] = useState({});
  const [loading, setLoading] = useState(true);

  const moedas = ["USD-BRL", "EUR-BRL", "BTC-BRL"];
  const { logout, usuario } = useContext(AuthContext);

  useEffect(() => {
    fetchCotacoes();
  }, []);

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

  const formatarValor = (valor) => {
    const numero = parseFloat(
      valor?.toString().replace("R$", "").replace(/\s/g, "").replace(",", ".")
    );
    return isNaN(numero) ? "0.00" : numero.toFixed(2);
  };

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
    <View style={styles.container}>
      <Text style={styles.helloText}>👋 Olá, {usuario?.nome || "usuário"}</Text>
      <Text style={styles.subtitle}>
        Aqui está um resumo da sua vida financeira
      </Text>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>💰 Saldo disponível</Text>
          <Text style={styles.cardValue}>R$ 8.459,00</Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>💱 Cotações de Moedas</Text>
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

      <Button
        mode="contained"
        style={styles.logoutButton}
        labelStyle={styles.logoutLabel}
        onPress={logout}
      >
        Sair da conta
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: COLORS.background,
  },
  helloText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    elevation: 4,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
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
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  moedaLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  moedaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  divider: {
    marginVertical: 8,
    backgroundColor: COLORS.border,
  },
  innerDivider: {
    marginVertical: 4,
    backgroundColor: COLORS.border,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  transactionDescricao: {
    color: COLORS.text,
    fontWeight: "500",
  },
  transactionValue: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 24,
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
