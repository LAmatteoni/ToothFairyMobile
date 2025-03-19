import React from 'react';
import styled from 'styled-components/native';

interface Props {
  title: string;
  onPress?: () => void;
}

const CustomButton = ({ title, onPress }: Props) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #FF6052;
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