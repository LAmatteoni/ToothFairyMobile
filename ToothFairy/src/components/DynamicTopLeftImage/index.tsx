import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DynamicTopLeftImageProps {
  isLogo?: boolean;
  showLogout?: boolean;
}

const DynamicTopLeftImage = ({ isLogo = false, showLogout = false }: DynamicTopLeftImageProps) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    if (showLogout) {
      try {
        await signOut(auth);
        await AsyncStorage.removeItem('userEmail');
        navigation.navigate('Login');
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    } else if (!isLogo) {
      navigation.goBack();
    }
  };

  return (
    <BackButtonContainer 
      onPress={handlePress}
      disabled={isLogo && !showLogout}
    >
      <BackImage 
        source={
          isLogo 
            ? require('./../../assets/odontoprev-logo.png')
            : showLogout
              ? require('./../../assets/logout.png')
              : require('./../../assets/back-arrow.png')
        } 
        isLogo={isLogo}
      />
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const BackImage = styled.Image<{ isLogo: boolean }>`
  width: ${({ isLogo }) => (isLogo ? '140px' : '24px')};
  height: ${({ isLogo }) => (isLogo ? '50px' : '24px')};
  margin-left: ${({ isLogo }: any) => (isLogo ? 0 : 20)}px;
  margin-top: ${({ isLogo }: any) => (isLogo ? 0 : 10)}px;
  resize-mode: contain;
`;

export default DynamicTopLeftImage;