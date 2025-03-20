import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Login from './src/screens/Login';
import Registro from './src/screens/Registro';
import Escolha from './src/screens/Escolha';
import PerfilDentista from './src/screens/PerfilDentista';
import PerfilCliente from './src/screens/PerfilCliente';
import PlanoCliente from './src/screens/PlanoCliente';
import Quiz from './src/screens/Quiz';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0066ff' }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
            <Stack.Screen name="Escolha" component={Escolha} options={{ headerShown: false }} />
            <Stack.Screen name="PerfilDentista" component={PerfilDentista} options={{ headerShown: false }} />
            <Stack.Screen name="PerfilCliente" component={PerfilCliente} options={{ headerShown: false }} />
            <Stack.Screen name="PlanoCliente" component={PlanoCliente} options={{ headerShown: false }} />
            <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;