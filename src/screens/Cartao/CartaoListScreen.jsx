import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import CartaoService from "../../services/CartaoService";
import CartaoFormScreen from "./CartaoFormScreen";
import { COLORS } from "../../assets/theme";

export default function CartaoListScreen() {
  const [cartoes, setCartoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartaoParaEditar, setCartaoParaEditar] = useState(null);

  useEffect(() => {
    buscarCartoes();
  }, []);

  async function buscarCartoes() {
    const lista = await CartaoService.listar();
    setCartoes(lista);
  }

  function abrirModal(cartao = null) {
    setCartaoParaEditar(cartao);
    setModalVisible(true);
  }

  function fecharModal() {
    setCartaoParaEditar(null);
    setModalVisible(false);
    buscarCartoes();
  }

  async function removerCartao(id) {
    await CartaoService.remover(id);
    buscarCartoes();
  }

  function renderItem({ item }) {
    return (
      <Card style={styles.cartao}>
        <Card.Content>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.numero}>{item.numero}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Validade: {item.validade}</Text>
            <Text style={styles.label}>CVV: {item.cvv}</Text>
          </View>
          <Text style={styles.bandeira}>{item.bandeira}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => abrirModal(item)}>Editar</Button>
          <Button onPress={() => removerCartao(item.id)}>Excluir</Button>
        </Card.Actions>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartoes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.botaoAdd} onPress={() => abrirModal()}>
        <Text style={styles.textoBotao}>+ Adicionar Cartão</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <CartaoFormScreen
          fecharModal={fecharModal}
          cartaoParaEditar={cartaoParaEditar}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  cartao: {
    backgroundColor: "#3b5998",
    marginBottom: 16,
    borderRadius: 12,
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  numero: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 2,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#fff",
  },
  bandeira: {
    color: "#fff",
    marginTop: 8,
    fontStyle: "italic",
  },
  botaoAdd: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});

// AJUSTAR QUE ESTÁ DANDO ERRO
