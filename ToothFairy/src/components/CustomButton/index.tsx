import React from 'react';
import styled from 'styled-components/native';

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  clientProfile?: boolean;
  hasQuizIcon?: boolean;
}

const CustomButton = ({ title, onPress, disabled = false, clientProfile = false, hasQuizIcon = false }: Props) => {
  return (
    <ButtonContainer 
      onPress={onPress} 
      disabled={disabled} 
      clientProfile={clientProfile} 
      hasQuizIcon={hasQuizIcon} 
      style={{ backgroundColor: disabled ? '#d38a83' : '#FF6052' }}
    >
      <ButtonText>{title}</ButtonText>
      {hasQuizIcon == true && (
        <QuizIcon source={require('./../../assets/quiz-icon.png')} />
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{ clientProfile: boolean }>`
  border-radius: 50px;
  width: ${({ clientProfile }) => (clientProfile ? '100%' : 'auto')};
  padding: 20px 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
`;

const QuizIcon = styled.Image`
  position: absolute;
  top: -40px;
  right: 10px;
`;

export default CustomButton;