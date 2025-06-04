import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Menu,
  Divider,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const categorias = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Moradia',
  'Viagens',
];

const OrcamentoFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editingItem = route.params?.orcamento;

  const [id, setId] = useState(editingItem ? editingItem.id : uuid.v4());
  const [nome, setNome] = useState(editingItem?.nome || '');
  const [valor, setValor] = useState(editingItem?.valor || '');
  const [categoria, setCategoria] = useState(editingItem?.categoria || '');
  const [descricao, setDescricao] = useState(editingItem?.descricao || '');
  const [dataInicio, setDataInicio] = useState(
    editingItem?.dataInicio || new Date()
  );
  const [dataFim, setDataFim] = useState(editingItem?.dataFim || new Date());
  const [showInicio, setShowInicio] = useState(false);
  const [showFim, setShowFim] = useState(false);
  const [categoriaMenuVisible, setCategoriaMenuVisible] = useState(false);

  const salvarOrcamento = async () => {
    const novoOrcamento = {
      id,
      nome,
      valor,
      categoria,
      dataInicio,
      dataFim,
      descricao,
      status: editingItem ? editingItem.status : 'Ativo',
    };

    try {
      const data = await AsyncStorage.getItem('orcamentos');
      const orcamentos = data ? JSON.parse(data) : [];
      const updated = editingItem
        ? orcamentos.map((item) => (item.id === id ? novoOrcamento : item))
        : [...orcamentos, novoOrcamento];
      await AsyncStorage.setItem('orcamentos', JSON.stringify(updated));
      navigation.goBack();
    } catch (err) {
      console.error('Erro ao salvar orçamento:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {editingItem && (
          <TextInput label="ID" value={id} disabled style={styles.input} />
        )}
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
              {categoria || 'Selecionar Categoria'}
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
          Início: {moment(dataInicio).format('DD/MM/YYYY')}
        </Button>
        {showInicio && (
          <DateTimePicker
            value={new Date(dataInicio)}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowInicio(false);
              if (date) setDataInicio(date);
            }}
          />
        )}

        <Button onPress={() => setShowFim(true)} mode="outlined">
          Fim: {moment(dataFim).format('DD/MM/YYYY')}
        </Button>
        {showFim && (
          <DateTimePicker
            value={new Date(dataFim)}
            mode="date"
            display="default"
            onChange={(event, date) => {
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
});

export default OrcamentoFormScreen;