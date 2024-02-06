import React, { useState } from 'react';
import { BackHandler, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  WelcomeScreen  from './screens/welcome/welcome';
import  SelectScreen  from './screens/select/select';
import  RegisterScreen from './screens/register/register';
import  LoginScreen from './screens/login/login';
import  UserScreen from './screens/user/user';
import  ManagementScreen from './screens/management/management';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Management" component={ManagementScreen} />
        {/* Agrega otras pantallas aquí según sea necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;