import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import styled from 'styled-components/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig"


const Registro = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        Alert.alert("Sucesso", "Usuário registrado!");
        navigation.navigate("Escolha");
      })
      .catch((error) => {
        if (nome.trim() === '') {
          Alert.alert('Erro', 'Por favor, preencha o campo Nome.');
          return;
        } else if (!validateEmail(email)) {
          Alert.alert('Erro', 'Por favor, insira um email válido.');
          return;
        } else if (senha.trim() === '') {
          Alert.alert('Erro', 'Por favor, preencha o campo Senha.');
          return;
        } else if (confirmacaoSenha.trim() === '') {
          Alert.alert('Erro', 'Por favor, preencha o campo Confirmação de Senha.');
          return;
        } else if (senha !== confirmacaoSenha) {
          Alert.alert('Erro', 'As senhas não coincidem.');
          return;
        } else {
          Alert.alert("Erro", error.message);
        }
      });
   
    setSenha('');
    setConfirmacaoSenha('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container>
        <DynamicTopLeftImage isLogo={false} />
        <RegisterText>Cadastre-se</RegisterText>
        <Image source={require('./../../assets/choice-user-profile.png')} />
        <AccountInfoText>Informações da conta</AccountInfoText>

        <InputContainer>
          <CustomInput
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <CustomInput
            type="email"
            placeholder="Email"
            value={email}
            onChangeText={(text: any) => {
              setEmail(text);
              setIsEmailValid(validateEmail(text));
            }}
            invalid={!isEmailValid}
          />
          <CustomInput
            type="password"
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
          />
          <CustomInput
            type="password"
            placeholder="Confirmação de senha"
            value={confirmacaoSenha}
            onChangeText={setConfirmacaoSenha}
          />

          <ButtonConainer>  
            <CustomButton
              title="Registrar"
              onPress={handleSubmit}
            />
          </ButtonConainer>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  background-color: #0066ff;
`;

const RegisterText = styled.Text`
  font-size: 48px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 56px;
  color: white;
`;

const Image = styled.Image`
  width: 100%;
  height: 150px;
  resize-mode: contain;
  margin-bottom: 56px;
`;

const AccountInfoText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: white;
`;

const InputContainer = styled.View`
  width: 100%;
  gap: 20px;
`;

const ButtonConainer = styled.View`
  align-items: center;
  margin-top: 10px;
`;

export default Registro;