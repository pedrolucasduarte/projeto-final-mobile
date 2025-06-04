import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import CartaoService from "../../services/CartaoService";
import { COLORS } from "../../assets/theme";

export default function CartaoFormScreen({ cartao, onClose }) {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [bandeira, setBandeira] = useState("");

  useEffect(() => {
    if (cartao) {
      setNome(cartao.nome);
      setNumero(cartao.numero);
      setValidade(cartao.validade);
      setCvv(cartao.cvv);
      setBandeira(cartao.bandeira);
    }
  }, [cartao]);

  async function salvarOuAtualizar() {
    const novoCartao = { nome, numero, validade, cvv, bandeira };

    if (cartao?.id) {
      novoCartao.id = cartao.id;
      await CartaoService.atualizar(novoCartao);
    } else {
      await CartaoService.salvar(novoCartao);
    }

    onClose();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.titulo}>Cadastro de Cartão</Title>

      <TextInput
        label="Nome do Cartão"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        label="Número do Cartão"
        value={numero}
        onChangeText={setNumero}
        style={styles.input}
        render={(props) => (
          <TextInputMask
            {...props}
            type={"credit-card"}
            options={{
              obfuscated: false,
              issuer: "visa-or-mastercard",
            }}
          />
        )}
        keyboardType="numeric"
      />

      <TextInput
        label="Validade (MM/AA)"
        value={validade}
        onChangeText={setValidade}
        style={styles.input}
        render={(props) => (
          <TextInputMask
            {...props}
            type={"custom"}
            options={{ mask: "99/99" }}
          />
        )}
        keyboardType="numeric"
      />

      <TextInput
        label="CVV"
        value={cvv}
        onChangeText={setCvv}
        style={styles.input}
        render={(props) => (
          <TextInputMask {...props} type={"custom"} options={{ mask: "999" }} />
        )}
        keyboardType="numeric"
      />

      <TextInput
        label="Bandeira (Visa, Master, etc)"
        value={bandeira}
        onChangeText={setBandeira}
        style={styles.input}
      />

      <Button mode="contained" onPress={salvarOuAtualizar} style={styles.botao}>
        Salvar
      </Button>

      <Button
        style={styles.cancelButton}
        mode="outlined"
        onPress={() => onFechar(false)}
      >
        Cancelar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  botao: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
  },
  botaoCancelar: {
    marginTop: 10,
  },
});

// AJUSTAR QUE ESTÁ DANDO ERRO
