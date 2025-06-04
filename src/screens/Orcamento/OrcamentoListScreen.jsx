import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import OrcamentoFormScreen from "./OrcamentoFormScreen";
import OrcamentoService from "../../services/OrcamentoService";

export default function OrcamentoListScreen() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarOrcamentos();
  }, []);

  async function carregarOrcamentos() {
    const lista = await OrcamentoService.listar();
    setOrcamentos(lista);
  }

  function abrirFormulario(orcamento = null) {
    setOrcamentoSelecionado(orcamento);
    setMostrarFormulario(true);
  }

  function fecharFormulario(atualizar = false) {
    setMostrarFormulario(false);
    setOrcamentoSelecionado(null);
    if (atualizar) {
      carregarOrcamentos();
    }
  }

  function confirmarExclusao(orcamento) {
    Alert.alert(
      "Confirmação",
      `Deseja excluir o orçamento "${orcamento.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluir(orcamento.id),
        },
      ]
    );
  }

  async function excluir(id) {
    await OrcamentoService.excluir(id);
    carregarOrcamentos();
  }

  function renderItem({ item }) {
    return (
      <Card style={styles.card} key={item.id}>
        <Card.Title
          title={item.nome}
          subtitle={`De ${item.dataInicial} até ${item.dataFinal}`}
          right={() => (
            <>
              <IconButton
                icon="pencil"
                onPress={() => abrirFormulario(item)}
                size={20}
              />
              <IconButton
                icon="delete"
                onPress={() => confirmarExclusao(item)}
                size={20}
              />
            </>
          )}
        />
        <Card.Content>
          <Text style={styles.valor}>
            Valor Planejado: R$ {item.valorPlanejado}
          </Text>
          {item.descricao ? (
            <Text style={styles.descricao}>{item.descricao}</Text>
          ) : null}
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      {mostrarFormulario ? (
        <OrcamentoFormScreen
          orcamentoAntigo={orcamentoSelecionado}
          onFechar={fecharFormulario}
        />
      ) : (
        <>
          <Button
            mode="contained"
            onPress={() => abrirFormulario()}
            style={styles.botaoNovo}
          >
            Novo Orçamento
          </Button>

          <FlatList
            data={orcamentos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.lista}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFF",
  },
  botaoNovo: {
    marginBottom: 16,
    backgroundColor: "#F582AE",
    borderRadius: 0,
  },
  lista: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#F3D2C1",
  },
  valor: {
    fontWeight: "bold",
    marginTop: 4,
  },
  descricao: {
    fontStyle: "italic",
    marginTop: 6,
  },
});

// VERIFICAR ERROS QUE ESTÁ DANDO