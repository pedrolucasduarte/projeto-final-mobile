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
import TransacaoService from "./TransacaoService";
import TransacaoForm from "./TransacaoFormScreen"; // transformar em componente só de formulário, sem navigator

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
          style={styles.addButton}
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
                <Text style={styles.text}>ID: {item.id}</Text>
                <Text style={styles.text}>Descrição: {item.descricao}</Text>
                <Text style={styles.text}>Valor: {item.valor}</Text>
                <Text style={styles.text}>Data: {item.data}</Text>
                <Text style={styles.text}>Tipo: {item.tipo}</Text>
                <Text style={styles.text}>Categoria: {item.categoria}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.saveButton}
                  icon="pencil"
                  onPress={() => editarTransacao(item)}
                />
                <Button
                  icon="delete"
                  onPress={() => removerTransacao(item.id)}
                />
              </Card.Actions>
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
    backgroundColor: "#f8f7ff",
    padding: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#5e60ce",
  },
  card: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
  },
  text: {
    color: "#2b2c34",
    marginBottom: 4,
    fontSize: 14,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  saveButton: {
    marginBottom: 12,
    backgroundColor: "#F582AE",
    borderRadius: 1,
  },
});
