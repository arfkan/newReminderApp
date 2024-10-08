
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  SignupPage: undefined;
  LoginPage: undefined;
  MainPage: undefined;
  PlusScreen: undefined;
  DetailPage: undefined;
};

export type SignupPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignupPage'>;
