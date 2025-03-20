import React from 'react';
import styled from 'styled-components/native';

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton = ({ title, onPress, disabled = false }: Props) => {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled} style={{ backgroundColor: disabled ? '#d38a83' : '#FF6052' }}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  border-radius: 50px;
  padding: 20px 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
`;

export default CustomButton;