import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import CustomInput from '../../components/CustomInput';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomButton from '../../components/CustomButton';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, database } from "../../../firebaseConfig";
import { ref, get } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        redirectUser(user.uid);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const redirectUser = async (userId: string) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        navigation.navigate(userData.userType === 'dentista' ? "PerfilDentista" : "PerfilCliente");
      }
    } catch (error) {
      console.error("Erro ao redirecionar usuário:", error);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido.');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o campo Senha.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await AsyncStorage.setItem('userEmail', email);
      
      redirectUser(user.uid);
      
    } catch (error) {
      Alert.alert("Erro", "As credenciais estão incorretas");
    }
    
    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingText>Carregando...</LoadingText>
      </Container>
    );
  }

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

        <RegisterText>É novo por aqui? Clique <Bold onPress={() => navigation.navigate('Escolha')}>AQUI</Bold> para criar uma nova conta</RegisterText>      
        
        <CustomButton 
          title="Continuar" 
          onPress={handleSubmit}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

const LoadingText = styled.Text`
  color: white;
  font-size: 18px;
`;

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