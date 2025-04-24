import React, { useState } from 'react';
import styled from 'styled-components/native';
import CustomInput from '../../components/CustomInput';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomButton from '../../components/CustomButton';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
   
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.navigate("Escolha");
      })
      .catch((error) => {
        if (!validateEmail(email)) {
          Alert.alert('Erro', 'Email inválido.');
          return;
        } else if (password.trim() === '') {
          Alert.alert('Erro', 'Por favor, preencha o campo Senha.');
          return;
        } else {
          Alert.alert("Erro", "As credenciais estão incorretas");
        }
      });
   
    setPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container>
        <DynamicTopLeftImage isLogo={true}/>
        <WelcomeText>Bem-vindo(a) de volta!</WelcomeText>
        <Image source={require('./../../assets/man_woman_hands.png')}/>
        <InstructionText>Entre com sua conta para continuar!</InstructionText>
       
        <InputContainer>
          <CustomInput
            type="email"
            placeholder="Login"
            onChangeText={setEmail}
            value={email}
            invalid={!isEmailValid}
            iconSource={require('./../../assets/login.png')}
          />
          <CustomInput
            type="password"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            iconSource={require('./../../assets/password.png')}
          />
        </InputContainer>
   
        <RegisterText>É novo por aqui? Clique <Bold onPress={() => navigation.navigate('Registro')}>AQUI</Bold> para criar uma nova conta</RegisterText>      
       
        <CustomButton
          title="Continuar"
          onPress={handleSubmit}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px;
  background-color: #0066ff;
`;

const WelcomeText = styled.Text`
  font-size: 48px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
  color: white;
`;

const Image = styled.Image`
  width: 100%;
  height: 150px;
  resize-mode: contain;
  margin-bottom: 30px;
`;

const InstructionText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
  color: white;
`;

const InputContainer = styled.View`
  width: 100%;
  gap: 30px;
`;

const RegisterText = styled.Text`
  max-width: 250px;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  margin-bottom: 30px;
  color: white;
`;

const Bold = styled.Text`
  font-weight: 700;
  color: white;
`;

export default Login;