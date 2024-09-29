
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '@/app/auth/LoginPage';
import SignupPage from '@/app/auth/SignupPage';
import MainPage from '@/app/unauth/MainPage';
import PlusScreen from '@/app/unauth/PlusScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainPage: undefined;
  PlusScreen: undefined;
  DetailPage: undefined;

};

const Stack = createStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  return (
   
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }}  /> 
      
      </Stack.Navigator>
  
  );
};

export default AppNavigator;
