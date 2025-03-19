import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from './../../assets/back-arrow.png';
import LogoIcon from './../../assets/odontoprev-logo.png';

const DynamicTopLeftImage = ({ isLogo = false }) => {
  const navigation = useNavigation();

  return (
    <BackButtonContainer 
      onPress={isLogo ? undefined : () => navigation.goBack()}
      disabled={isLogo}
    >
      <BackImage source={isLogo ? LogoIcon : BackIcon} isLogo={isLogo} />
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
`;

const BackImage = styled.Image`
  width: ${({ isLogo }: any) => (isLogo ? '140px' : '24px')};
  height: ${({ isLogo }: any) => (isLogo ? '50px' : '24px')};
  margin-left: ${({ isLogo }: any) => (isLogo ? 0 : 20)}px;
  margin-top: ${({ isLogo }: any) => (isLogo ? 0 : 10)}px;
  resize-mode: contain;
`;

export default DynamicTopLeftImage;