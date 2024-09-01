import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '@/app/auth/LoginPage';
import MainPage from '@/app/unauth/MainPage';
import SignupPage from '@/app/auth/SignupPage'; 

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignupPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>
  );
};

export default MainNavigator; 
