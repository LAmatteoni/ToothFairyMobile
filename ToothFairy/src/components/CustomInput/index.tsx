import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image, TextInput } from 'react-native';

const CustomInput = ({ type, placeholder, onChangeText, value }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text: any) => {
    onChangeText(text);
    if (type === 'email') {
      setIsEmailValid(validateEmail(text));
    }
  };

  return (
    <InputContainer>
      <StyledTextInput>
          <IconContainer onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={type === 'email' ? require('./../../assets/login.png') : require('./../../assets/password.png')}
            />
          </IconContainer>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="black"
          onChangeText={handleEmailChange}
          value={value}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          invalid={type === 'email' && !isEmailValid}
        />
      </StyledTextInput>
      {type === 'password' && (
        <IconContainer onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('./../../assets/visible-eye.png') : require('./../../assets/invisible-eye.png')}
          />
        </IconContainer>
      )}
      {type === 'email' && !isEmailValid && (
        <ErrorText>Email inválido</ErrorText>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View`
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  border-color: ${props => props.invalid ? 'red' : 'gray'};
  background-color: white;
  border-width: 1px;
  padding: 0 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextInput = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const IconContainer = styled.TouchableOpacity`
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default CustomInput;