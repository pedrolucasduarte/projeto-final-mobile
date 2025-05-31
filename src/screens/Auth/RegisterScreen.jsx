import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const registerSchema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Informe uma senha'),
    confirmarSenha: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'Senhas não coincidem')
      .required('Confirme sua senha'),
  });

  const handleRegister = async (values) => {
    setLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    try {
      const existingUser = await AsyncStorage.getItem('usuario');
      if (existingUser) {
        const parsed = JSON.parse(existingUser);
        if (parsed.email === values.email) {
          setRegisterError('Esse e-mail já está cadastrado.');
          setLoading(false);
          return;
        }
      }

      const usuario = {
        email: values.email,
        senha: values.senha,
      };

      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      setRegisterSuccess('Cadastro realizado com sucesso!');
      
      setTimeout(() => {
        navigation.navigate('Login'); // vai para tela de login
      }, 1500);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setRegisterError('Erro ao registrar. Tente novamente.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Formik
        initialValues={{ email: '', senha: '', confirmarSenha: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
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

            <TextInput
              label="Confirmar Senha"
              value={values.confirmarSenha}
              onChangeText={handleChange('confirmarSenha')}
              onBlur={handleBlur('confirmarSenha')}
              secureTextEntry
              style={styles.input}
              error={touched.confirmarSenha && errors.confirmarSenha}
            />
            {touched.confirmarSenha && errors.confirmarSenha && (
              <Text style={styles.error}>{errors.confirmarSenha}</Text>
            )}

            {registerError ? <Text style={styles.error}>{registerError}</Text> : null}
            {registerSuccess ? <Text style={styles.success}>{registerSuccess}</Text> : null}

            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Registrar
              </Button>
            )}

            <Button onPress={() => navigation.navigate('Login')}>
              Já tem conta? Fazer login
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
  success: {
    color: 'green',
    marginBottom: 8,
  },
});

export default RegisterScreen;
