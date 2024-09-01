// SignupPage.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignupPageNavigationProp } from '../../navigation/types';
import { IUserRegister } from '@/types';
import { isPasswordValid } from '../../utils/validation';
import { inputBoxStyles } from '@/styles/common/inputBox';
import { ButonStyles } from '@/styles/common/button';

const SignupPage = () => {
  const [userProps, setUserProps] = useState<IUserRegister>({
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string>('');
  const navigation = useNavigation<SignupPageNavigationProp>();

  const handleChange = (name: keyof IUserRegister, value: string) => {
    setUserProps(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'password') {
      if (!isPasswordValid(value)) {
        setPasswordError('Parola en az bir büyük harf, bir sayı ve bir özel karakter içermelidir.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSignup = () => {
    if (!isPasswordValid(userProps.password)) {
      alert('Parola en az bir büyük harf, bir sayı ve bir özel karakter içermelidir.');
      return;
    }

    if (userProps.password !== userProps.confirmPassword) {
      alert('Parolalar eşleşmiyor.');
      return;
    }

    console.log('Kayıt bilgileri:', userProps);

  };

  return (
    <View style={styles.container}>
      <TextInput
        style={inputBoxStyles.inputBox}
        placeholder="UserName"
        value={userProps.firstname}
        onChangeText={(value) => handleChange('firstname', value)}
      />

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
        placeholder="Password"
        value={userProps.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TextInput
        style={inputBoxStyles.inputBox}
        placeholder="Confirm Password"
        value={userProps.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />
      {userProps.password !== userProps.confirmPassword && userProps.confirmPassword !== '' ?
        <Text style={styles.errorText}>Parolalar eşleşmiyor.</Text> : null}

      <TouchableOpacity
        style={ButonStyles.button}
        onPress={handleSignup}
      >
        <Text style={ButonStyles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  errorText: {
     color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
});

export default SignupPage;
