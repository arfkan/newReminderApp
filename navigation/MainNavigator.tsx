
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '@/app/auth/LoginPage';
import SignupPage from '@/app/auth/SignupPage';
import MainPage from '@/app/unauth/MainPage';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainPage: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  return (
   
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="MainPage" component={MainPage} /> 
      </Stack.Navigator>
  
  );
};

export default AppNavigator;
