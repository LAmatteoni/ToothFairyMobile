import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const CustomInput = ({ type, placeholder, onChangeText, value, iconSource, multiline }: any) => {
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
        {iconSource && (
          <IconContainer pointerEvents="none">
            <Image source={iconSource} />
          </IconContainer>
        )}
        <StyledTextInput
          placeholder={placeholder}
          placeholderTextColor="#585858"
          onChangeText={handleEmailChange}
          value={value}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          invalid={type === 'email' && !isEmailValid}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
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
  min-height: 40px;
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
  padding-bottom: ${props => props.multiline ? '0' : '5px'};
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  margin-right: ${props => props.iconSource ? '-10px' : '0px'};
  margin-left: ${props => props.iconSource ? '-30px' : '0px'};
  padding-left: ${props => props.iconSource ? '35px' : '0px'};
  height: auto;
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