import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const Input = ({ type, placeholder, onChangeText, value }: any) => {
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
    <View style={styles.container}>
      <TextInput
        style={[styles.input, type === 'email' && !isEmailValid && styles.invalidInput]}
        placeholder={placeholder}
        onChangeText={handleEmailChange}
        value={value}
        secureTextEntry={type === 'password' && !showPassword}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
      />
      {type === 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Image
            source={showPassword ? require('./../../assets/visible-eye.png') : require('./../../assets/invisible-eye.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {type === 'email' && !isEmailValid && (
        <Text style={styles.errorText}>Email inválido</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  invalidInput: {
    borderColor: 'red',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  icon: {
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;