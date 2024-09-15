import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { registerUser } from '@/redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignupPageNavigationProp } from '../../navigation/types';
import { IUserRegister } from '@/types';
import { isPasswordValid } from '../../utils/validation';
import { inputBoxStyles } from '@/styles/common/inputBox';
import { ButonStyles } from '@/styles/common/button';
import { ImageStyles } from '@/styles/common/image';

const SignupPage = () => {
  const [userProps, setUserProps] = useState<IUserRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string>('');
  const navigation = useNavigation<SignupPageNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (name: keyof IUserRegister, value: string) => {
    setUserProps((prevState) => ({
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

  const handleSignup = async () => {
    if (!isPasswordValid(userProps.password)) {
      alert('Parola en az bir büyük harf, bir sayı ve bir özel karakter içermelidir.');
      return;
    }

    if (userProps.password !== userProps.confirmPassword) {
      alert('Parolalar eşleşmiyor.');
      return;
    }

    // Redux action çağırarak kayıt yap
    const resultAction = await dispatch(registerUser(userProps));

    if (registerUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload.token; // Redux'tan token al
      await AsyncStorage.setItem('token', token); // Token'ı AsyncStorage'a kaydet
      navigation.navigate('MainPage');
    } else {
      Alert.alert('Kayıt Başarısız', 'Bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/register.jpg')}  style={ImageStyles.image}/>
      <TextInput
        style={inputBoxStyles.inputBox}
        placeholder="UserName"
        value={userProps.username}
        onChangeText={(value) => handleChange('username', value)}
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
    backgroundColor: 'white',
    marginTop:100,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
});

export default SignupPage;
