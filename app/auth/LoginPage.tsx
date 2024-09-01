import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IUserLogin } from '@/types';
import { inputBoxStyles } from '@/styles/common/inputBox';
import { ButonStyles } from '@/styles/common/button';


type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainPage: undefined; 
};

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginPage = () => {
  const [userProps, setUserProps] = useState<IUserLogin>({
    email: '',
    password: '',
  });

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleChange = (name: keyof IUserLogin, value: string) => {
    setUserProps(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const { email, password } = userProps;

    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return; // Eksik bilgi varsa yönlendirme yapılmaz
    }

    // Giriş işlemleri burada yapılabilir

    // Bilgiler tam ise MainPage sayfasına yönlendirme yap
    navigation.navigate('MainPage');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={inputBoxStyles.inputBox}
        placeholder="E-posta"
        value={userProps.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={inputBoxStyles.inputBox}
        placeholder="Şifre"
        value={userProps.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      <TouchableOpacity style={ButonStyles.button} onPress={handleLogin}>
        <Text style={ButonStyles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      
      {/* Sign up link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: 'black',
  },
  signupLink: {
    fontSize: 16,
    color: 'blue',
  },
});

export default LoginPage;
