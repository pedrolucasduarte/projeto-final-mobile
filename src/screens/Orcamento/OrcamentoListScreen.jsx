import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import {
  Card,
  Text,
  IconButton,
  FAB,
  Divider,
  Chip,
  Modal,
  Portal,
  TextInput,
  Button,
  Menu,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import uuid from "react-native-uuid";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const categorias = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Saúde",
  "Moradia",
  "Viagens",
];

const OrcamentoListScreen = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());
  const [showInicio, setShowInicio] = useState(false);
  const [showFim, setShowFim] = useState(false);
  const [categoriaMenuVisible, setCategoriaMenuVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) carregarOrcamentos();
  }, [isFocused]);

  const carregarOrcamentos = async () => {
    try {
      const dados = await AsyncStorage.getItem("orcamentos");
      if (dados) setOrcamentos(JSON.parse(dados));
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error);
    }
  };

  const abrirFormulario = (item = null) => {
    setEditingItem(item);
    setId(item?.id || uuid.v4());
    setNome(item?.nome || "");
    setValor(item?.valor || "");
    setCategoria(item?.categoria || "");
    setDescricao(item?.descricao || "");
    setDataInicio(item?.dataInicio ? new Date(item.dataInicio) : new Date());
    setDataFim(item?.dataFim ? new Date(item.dataFim) : new Date());
    setModalVisible(true);
  };

  const salvarOrcamento = async () => {
    const novoOrcamento = {
      id,
      nome,
      valor,
      categoria,
      dataInicio,
      dataFim,
      descricao,
      status: editingItem ? editingItem.status : "Ativo",
    };

    try {
      const data = await AsyncStorage.getItem("orcamentos");
      const orcamentos = data ? JSON.parse(data) : [];
      const updated = editingItem
        ? orcamentos.map((item) => (item.id === id ? novoOrcamento : item))
        : [...orcamentos, novoOrcamento];
      await AsyncStorage.setItem("orcamentos", JSON.stringify(updated));
      setModalVisible(false);
      carregarOrcamentos();
    } catch (err) {
      console.error("Erro ao salvar orçamento:", err);
    }
  };

  const excluirOrcamento = (id) => {
    Alert.alert("Confirmar Exclusão", "Deseja excluir este orçamento?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: async () => {
          const atualizados = orcamentos.filter((o) => o.id !== id);
          setOrcamentos(atualizados);
          await AsyncStorage.setItem("orcamentos", JSON.stringify(atualizados));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.nome}
        subtitle={`De ${moment(item.dataInicio).format("DD/MM/YYYY")} até ${moment(item.dataFim).format("DD/MM/YYYY")}`}
        left={(props) => <IconButton {...props} icon="calendar" />}
      />
      <Card.Content>
        <Text>Valor Disponível: R$ {parseFloat(item.valor).toFixed(2)}</Text>
        <Text>Categoria: {item.categoria}</Text>
        {item.descricao ? <Text>Descrição: {item.descricao}</Text> : null}
        <Chip style={styles.statusChip}>{item.status}</Chip>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="pencil" onPress={() => abrirFormulario(item)} />
        <IconButton icon="delete" onPress={() => excluirOrcamento(item.id)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orcamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Novo Orçamento"
        onPress={() => abrirFormulario()}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView>
              <TextInput
                label="Nome do Orçamento"
                value={nome}
                onChangeText={(text) => setNome(text.slice(0, 25))}
                style={styles.input}
              />

              <TextInput
                label="Valor Total Disponível"
                value={valor}
                onChangeText={setValor}
                style={styles.input}
                keyboardType="numeric"
              />

              <Menu
                visible={categoriaMenuVisible}
                onDismiss={() => setCategoriaMenuVisible(false)}
                anchor={
                  <Button
                    onPress={() => setCategoriaMenuVisible(true)}
                    mode="outlined"
                    style={styles.input}
                  >
                    {categoria || "Selecionar Categoria"}
                  </Button>
                }
              >
                {categorias.map((cat) => (
                  <Menu.Item
                    key={cat}
                    onPress={() => {
                      setCategoria(cat);
                      setCategoriaMenuVisible(false);
                    }}
                    title={cat}
                  />
                ))}
              </Menu>

              <Button onPress={() => setShowInicio(true)} mode="outlined">
                Início: {moment(dataInicio).format("DD/MM/YYYY")}
              </Button>
              {showInicio && (
                <DateTimePicker
                  value={dataInicio}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    setShowInicio(false);
                    if (date) setDataInicio(date);
                  }}
                />
              )}

              <Button onPress={() => setShowFim(true)} mode="outlined">
                Fim: {moment(dataFim).format("DD/MM/YYYY")}
              </Button>
              {showFim && (
                <DateTimePicker
                  value={dataFim}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    setShowFim(false);
                    if (date) setDataFim(date);
                  }}
                />
              )}

              <TextInput
                label="Descrição"
                value={descricao}
                onChangeText={(text) => setDescricao(text.slice(0, 300))}
                style={styles.input}
                multiline
              />

              <Button mode="contained" onPress={salvarOrcamento}>
                Salvar Orçamento
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f1f1f1",
  },
  card: {
    marginBottom: 12,
  },
  statusChip: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
});

export default OrcamentoListScreen;
