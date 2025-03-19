import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Image } from 'react-native';
import Input from '../../components/CustomInput';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Bem-vindo(a) de volta!</Text>
        <Image
          source={require('./../../assets/man_woman_hands.png')}
          style={styles.image}
        />
        <Text style={styles.instructionText}>Entre com sua conta para continuar!</Text>
        
      <Input
        type="email"
        placeholder="Digite seu email"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        onChangeText={setPassword}
        value={password}
      />
      
      <Button title="Continuar" onPress={() => navigation.navigate('Escolha')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 30,
    backgroundColor: '#0066FF',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Login;