import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import styled from 'styled-components/native';

const Registro = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleSubmit = () => {
    if (senha !== confirmacaoSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    Alert.alert('Sucesso', 'Registro realizado com sucesso!');
    
    navigation.navigate('Escolha');
    
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmacaoSenha('');
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Title>Registro</Title>

      <InputContainer>
        <CustomInput
          type="email"
          placeholder="Login"
          onChangeText={setEmail}
          value={email}
        />
        <CustomInput
          type="password"
          placeholder="Senha"
          onChangeText={setSenha}
          value={senha}
        />
      </InputContainer>

      <Input
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        required
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        required
      />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        required
      />
      <Input
        placeholder="Confirmação de senha"
        value={confirmacaoSenha}
        onChangeText={setConfirmacaoSenha}
        secureTextEntry
        required
      />
      <Button title="Registrar" onPress={handleSubmit} />
      <CancelButton title="Cancelar" onPress={handleCancel} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #0066ff;
`;

const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InputContainer = styled.View`
  width: 100%;
  gap: 30px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 4px;
  margin-bottom: 15px;
  padding-horizontal: 10px;
`;

const Button = styled.Button`
  margin-top: 10px;
`;

const CancelButton = styled.Button`
  margin-top: 10px;
`;

export default Registro;