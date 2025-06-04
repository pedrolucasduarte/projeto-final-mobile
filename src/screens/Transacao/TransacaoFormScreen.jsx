import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import TransacaoService from "../../services/TransacaoService";

export default function TransacaoForm({ transacaoAntiga = {}, onFechar }) {
  const [descricao, setDescricao] = useState(transacaoAntiga.descricao || "");
  const [valor, setValor] = useState(transacaoAntiga.valor || "");
  const [data, setData] = useState(transacaoAntiga.data || "");
  const [tipo, setTipo] = useState(transacaoAntiga.tipo || "despesa");
  const [categoria, setCategoria] = useState(transacaoAntiga.categoria || "");

  useEffect(() => {
    setDescricao(transacaoAntiga.descricao || "");
    setValor(transacaoAntiga.valor || "");
    setData(transacaoAntiga.data || "");
    setTipo(transacaoAntiga.tipo || "Despesa");
    setCategoria(transacaoAntiga.categoria || "");
  }, [transacaoAntiga]);

  async function salvar() {
    if (!descricao || !valor || !data || !tipo || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    let transacao = {
      descricao,
      valor,
      data,
      tipo,
      categoria,
    };

    if (transacaoAntiga.id) {
      transacao.id = transacaoAntiga.id;
      await TransacaoService.atualizar(transacao);
      alert("Transação alterada com sucesso!");
    } else {
      transacao.id = new Date().getTime();
      await TransacaoService.salvar(transacao);
      alert("Transação cadastrada com sucesso!");
    }

    onFechar(true);
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {transacaoAntiga.id
          ? `Editando ID: ${transacaoAntiga.id}`
          : "Nova Transação"}
      </Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Descrição"
        placeholder="Descrição da transação"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Valor"
        placeholder="Informe o valor"
        value={valor}
        onChangeText={setValor}
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
        label="Data"
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={setData}
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
        label="Tipo"
        placeholder="Despesa ou receita"
        value={tipo}
        onChangeText={setTipo}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Categoria"
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button style={styles.saveButton} mode="contained" onPress={salvar}>
        Salvar
      </Button>

      <Button
        style={styles.cancelButton}
        mode="outlined"
        onPress={() => onFechar(false)}
      >
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
