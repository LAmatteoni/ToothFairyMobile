import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import styled from 'styled-components/native';

const Quiz = ({ navigation }: any) => {
  const [quiz1, setQuiz1] = useState('');
  const [quiz2, setQuiz2] = useState('');
  const [quiz3, setQuiz3] = useState('');
  const [quiz4, setQuiz4] = useState('');
  const [quiz5, setQuiz5] = useState('');
  const [quiz6, setQuiz6] = useState('');
  const [quiz7, setQuiz7] = useState('');

  const handleSubmit = () => {
    if (
        quiz1.trim() === '' ||
        quiz2.trim() === '' ||
        quiz3.trim() === '' ||
        quiz4.trim() === '' ||
        quiz5.trim() === '' ||
        quiz6.trim() === '' ||
        quiz7.trim() === ''
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', 'Quiz realizado com sucesso!');
    
    navigation.navigate('PerfilCliente');

    setQuiz1('');
    setQuiz2('');
    setQuiz3('');
    setQuiz4('');
    setQuiz5('');
    setQuiz6('');
    setQuiz7('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
        <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0066ff' }}
        style={{ backgroundColor: '#0066ff' }}
        >
            <Container>
              <DynamicTopLeftImage isLogo={false} />
              <QuizText>Avaliação de Risco Odontológico</QuizText>
              <QuizInfoText>Por favor, responda às seguintes perguntas para ajudar-nos a entender melhor sua saúde bucal e identificar possíveis riscos.</QuizInfoText>

              <InputContainer>
                <CustomInput
                  type="text"
                  placeholder="Você já teve algum problema dental grave (por exemplo, dor de dente, abscesso, etc.)?"
                  value={quiz1}
                  onChangeText={setQuiz1}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você tem algum problema de saúde geral que possa afetar sua saúde bucal (por exemplo, diabetes, doenças cardíacas, etc.)?"
                  value={quiz2}
                  onChangeText={setQuiz2}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você fuma ou já fumou?"
                  value={quiz3}
                  onChangeText={setQuiz3}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você consome bebidas açucaradas ou ácidas regularmente?"
                  value={quiz4}
                  onChangeText={setQuiz4}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você tem dificuldade para escovar os dentes ou usar fio dental?"
                  value={quiz5}
                  onChangeText={setQuiz5}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você já teve algum tratamento dental recentemente (por exemplo, obturação, extração, etc.)?"
                  value={quiz6}
                  onChangeText={setQuiz6}
                  multiline={true}
                />

                <CustomInput
                  type="text"
                  placeholder="Você já teve algum tratamento dental recentemente (por exemplo, obturação, extração, etc.)?"
                  value={quiz7}
                  onChangeText={setQuiz7}
                  multiline={true}
                />

                <ButtonConainer>  
                  <CustomButton
                    title="Confirmar"
                    onPress={handleSubmit}
                  />
                </ButtonConainer>
              </InputContainer>
            </Container>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  background-color: #0066ff;
`;

const QuizText = styled.Text`
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 48px;
  color: white;
`;

const QuizInfoText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 32px;
  color: white;
`;

const InputContainer = styled.View`
  width: 100%;
  gap: 20px;
`;

const ButtonConainer = styled.View`
  align-items: center;
`;

export default Quiz;