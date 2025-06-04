import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@cartoes";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(cartao) {
  cartao.id = new Date().getTime();
  const cartoes = await listar();
  cartoes.push(cartao);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartoes));
}

async function buscar(id) {
  const cartoes = await listar();
  return cartoes.find((c) => c.id === id);
}

async function remover(id) {
  const cartoes = await listar();
  const novaLista = cartoes.filter((c) => c.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novoCartao) {
  const cartoes = await listar();
  const novaLista = cartoes.map((c) =>
    c.id === novoCartao.id ? novoCartao : c
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover,
};
