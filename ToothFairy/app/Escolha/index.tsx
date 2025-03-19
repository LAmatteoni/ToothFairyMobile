import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Escolha = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Escolha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default Escolha;