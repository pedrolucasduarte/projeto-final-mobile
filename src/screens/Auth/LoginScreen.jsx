import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Informe sua senha'),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setLoginError('');
    try {
      const userData = await AsyncStorage.getItem('usuario');
      if (!userData) {
        setLoginError('Usuário não encontrado. Faça o cadastro.');
        return;
      }

      const usuarioSalvo = JSON.parse(userData);

      if (
        values.email === usuarioSalvo.email &&
        values.senha === usuarioSalvo.senha
      ) {
        onLoginSuccess(); // navega para Home
      } else {
        setLoginError('E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginError('Erro interno. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="E-mail"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              label="Senha"
              value={values.senha}
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              secureTextEntry
              style={styles.input}
              error={touched.senha && errors.senha}
            />
            {touched.senha && errors.senha && (
              <Text style={styles.error}>{errors.senha}</Text>
            )}

            {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Entrar
              </Button>
            )}

            <Button onPress={() => navigation.navigate('Register')}>
              Não tem conta? Cadastre-se
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  error: {
    color: '#b00020',
    marginBottom: 8,
  },
});

export default LoginScreen;
