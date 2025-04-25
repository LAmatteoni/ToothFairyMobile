import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomButton from '../../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type EscolhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Escolha'>;

interface EscolhaProps {
  navigation: EscolhaScreenNavigationProp;
}

const Escolha = ({ navigation }: EscolhaProps) => {
  const [selectedOption, setSelectedOption] = useState<'dentista' | 'cliente' | null>(null);
  const [dentistaImage, setDentistaImage] = useState(require('../../assets/disabled-dentist.png'));
  const [clienteImage, setClienteImage] = useState(require('../../assets/disabled-client.png'));

  const handleDentistaClick = () => {
    setSelectedOption('dentista');
    setDentistaImage(require('../../assets/actived-dentist.png'));
    setClienteImage(require('../../assets/disabled-client.png'));
  };

  const handleClienteClick = () => {
    setSelectedOption('cliente');
    setClienteImage(require('../../assets/actived-client.png'));
    setDentistaImage(require('../../assets/disabled-dentist.png'));
  };

  const handleContinue = () => {
    if (!selectedOption) {
      Alert.alert('Atenção', 'Por favor, selecione uma opção antes de continuar.');
      return;
    }

    navigation.navigate('Registro', { userType: selectedOption });
  };

  return (
    <Container>
      <DynamicTopLeftImage isLogo={false} />
      <WhoAreYouText>Quem você é para nós?</WhoAreYouText>

      <WhoAreYouView>
        <OptionView onPress={handleDentistaClick}>
          <OptionText>Dentista</OptionText>
          <OptionImage source={dentistaImage} />
        </OptionView>

        <OptionView onPress={handleClienteClick}>
          <OptionText>Cliente</OptionText>
          <OptionImage source={clienteImage} />
        </OptionView>
      </WhoAreYouView>

      <CustomButton 
        title="Continuar"
        onPress={handleContinue}
        disabled={!selectedOption}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #0066ff;
`;

const WhoAreYouText = styled.Text`
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
  color: white;
`;

const WhoAreYouView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const OptionView = styled.TouchableOpacity`
  align-items: center;
`;

const OptionText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 30px;
`;

const OptionImage = styled.Image`
  width: 100px;
  resize-mode: contain;
`;

export default Escolha;