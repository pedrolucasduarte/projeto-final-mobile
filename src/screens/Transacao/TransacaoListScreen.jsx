import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Text,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import TransacaoService from "../../services/TransacaoService";
import TransacaoForm from "./TransacaoFormScreen";
import { COLORS } from "../../assets/theme";

export default function TransacaoListScreen() {
  const [transacoes, setTransacoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transacaoParaEditar, setTransacaoParaEditar] = useState(null);

  useEffect(() => {
    buscarTransacoes();
  }, []);

  async function buscarTransacoes() {
    const lista = await TransacaoService.listar();
    setTransacoes(lista);
  }

  async function removerTransacao(id) {
    await TransacaoService.remover(id);
    alert("Transação excluída com sucesso!");
    buscarTransacoes();
  }

  function abrirModal() {
    setTransacaoParaEditar(null);
    setModalVisible(true);
  }

  function editarTransacao(transacao) {
    setTransacaoParaEditar(transacao);
    setModalVisible(true);
  }

  function fecharModal(atualizou) {
    setModalVisible(false);
    if (atualizou) buscarTransacoes();
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Button
          style={styles.saveButton}
          icon="plus"
          mode="contained"
          onPress={abrirModal}
        >
          Cadastrar transação
        </Button>
        <FlatList
          data={transacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.row}>
                  <View style={styles.columnLeft}>
                    <Text style={styles.label}>ID: {item.id}</Text>
                    <Text style={styles.label}>Nome: {item.descricao}</Text>
                    <Text style={styles.label}>Data: {item.data}</Text>
                    <Text style={styles.label}>Valor: {item.valor}</Text>
                    <Text style={styles.label}>Tipo: {item.tipo}</Text>
                    <Text style={styles.label}>
                      Categoria: {item.categoria}
                    </Text>
                  </View>
                  <View style={styles.columnRight}>
                    <Button
                      style={styles.button}
                      icon="pencil"
                      mode="contained"
                      onPress={() => editarTransacao(item)}
                    >
                      Editar
                    </Button>
                    <Text />
                    <Text />
                    <Button
                      style={styles.button}
                      icon="delete"
                      mode="contained"
                      onPress={() => removerTransacao(item.id)}
                    >
                      Deletar
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => fecharModal(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <TransacaoForm
              transacaoAntiga={transacaoParaEditar || {}}
              onFechar={fecharModal}
            />
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    backgroundColor: "#F3D2C1",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  label: {
    color: COLORS.textPrimary,
    fontWeight: "bold",
    fontSize: 14,
  },
  value: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "right",
    flexShrink: 1,
  },
  descriptionExtra: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
    textAlign: "right",
  },
  saveButton: {
    marginBottom: 12,
    backgroundColor: "#F582AE",
    borderRadius: 0,
  },
  cancelButton: {
    borderColor: "#F582AE",
    borderWidth: 1,
    borderRadius: 0,
  },
  button: {
    marginLeft: 12,
    borderRadius: 0,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
