import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image, TextInput, TouchableWithoutFeedback } from 'react-native';

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
      <TextInputView>
        <IconContainer pointerEvents="none">
          <Image
            source={type === 'email' ? require('./../../assets/login.png') : require('./../../assets/password.png')}
          />
        </IconContainer>
        <StyledTextInput
          placeholder={placeholder}
          placeholderTextColor="#242424"
          onChangeText={handleEmailChange}
          value={value}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          invalid={type === 'email' && !isEmailValid}
        />
      </TextInputView>
      {type === 'password' && (
        <IconPassword onPress={() => setShowPassword(!showPassword)}>
          <EyeIcon
            source={showPassword ? require('./../../assets/visible-eye.png') : require('./../../assets/invisible-eye.png')}
          />
        </IconPassword>
      )}
      {type === 'email' && !isEmailValid && (
        <ErrorText>Email inválido</ErrorText>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View`
  width: 100%;
  height: 40px;
  border-color: ${props => props.invalid ? 'red' : 'gray'};
  border-width: 1px;
  border-radius: 10px;
  background-color: white;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextInputView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  flex: 1;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  margin-right: -10px;
  margin-left: -30px;
  padding-left: 35px;
  height: 40px;
`;

const IconContainer = styled.View`
`;

const IconPassword = styled.TouchableOpacity`
  padding: 10px;
  margin: -10px -10px -10px 0;
`;

const EyeIcon = styled.Image`
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
`;

export default CustomInput;