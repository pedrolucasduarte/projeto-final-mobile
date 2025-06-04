import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import OrcamentoService from "../../services/OrcamentoService";

export default function OrcamentoFormScreen({ orcamentoAntigo = {}, onFechar }) {
 const [nome, setNome] = useState(orcamentoAntigo?.nome || "");
const [descricao, setDescricao] = useState(orcamentoAntigo?.descricao || "");
const [dataInicial, setDataInicial] = useState(orcamentoAntigo?.dataInicial || "");
const [dataFinal, setDataFinal] = useState(orcamentoAntigo?.dataFinal || "");
const [valorPlanejado, setValorPlanejado] = useState(orcamentoAntigo?.valorPlanejado?.toString() || "");

  useEffect(() => {
    setNome(orcamentoAntigo.nome || "");
    setDataInicial(orcamentoAntigo.dataInicial || "");
    setDataFinal(orcamentoAntigo.dataFinal || "");
    setValorPlanejado(orcamentoAntigo.valorPlanejado || "");
    setDescricao(orcamentoAntigo.descricao || "");
  }, [orcamentoAntigo]);

  async function salvar() {
    if (!nome || !dataInicial || !dataFinal || !valorPlanejado) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    let orcamento = {
      nome,
      dataInicial,
      dataFinal,
      valorPlanejado,
      descricao,
    };

    if (orcamentoAntigo?.id) {
      orcamento.id = orcamentoAntigo?.id;
      await OrcamentoService.atualizar(orcamento);
      alert("Orçamento atualizado com sucesso!");
    } else {
      orcamento.id = new Date().getTime();
      await OrcamentoService.salvar(orcamento);
      alert("Orçamento cadastrado com sucesso!");
    }

    onFechar(true);
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {orcamentoAntigo.id ? `Editando ID: ${orcamentoAntigo.id}` : "Novo Orçamento"}
      </Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nome do Orçamento"
        placeholder="Ex: Orçamento para viagem"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Data Inicial"
        placeholder="DD/MM/AAAA"
        value={dataInicial}
        onChangeText={setDataInicial}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"datetime"}
            options={{ format: "DD/MM/YYYY" }}
          />
        )}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Data Final"
        placeholder="DD/MM/AAAA"
        value={dataFinal}
        onChangeText={setDataFinal}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"datetime"}
            options={{ format: "DD/MM/YYYY" }}
          />
        )}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Valor Planejado"
        placeholder="R$ 0,00"
        value={valorPlanejado}
        onChangeText={setValorPlanejado}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$ ",
              suffixUnit: "",
            }}
          />
        )}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Descrição (Opcional)"
        placeholder="Detalhes adicionais"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
      />

      <Button style={styles.saveButton} mode="contained" onPress={salvar}>
        Salvar
      </Button>

      <Button style={styles.cancelButton} mode="outlined" onPress={() => onFechar(false)}>
        Cancelar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FAFAFF",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#001858",
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#F3D2C1",
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
});
