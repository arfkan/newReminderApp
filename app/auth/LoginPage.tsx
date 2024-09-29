import * as React  from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { loginUser } from '@/redux/authSlice';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUserLogin } from '@/types';
import { inputBoxStyles } from '@/styles/common/inputBox';
import { ButonStyles } from '@/styles/common/button';
import { ImageStyles } from '@/styles/common/image';


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
  const dispatch = useDispatch<AppDispatch>();

  const { token, error } = useSelector((state: RootState) => state.auth); // Redux state

  useEffect(() => {
    if (token) {
      console.log('Token mevcut, MainPage\'e yönlendiriliyor...'); 
      navigation.navigate('MainPage');
    }
  }, [token]);
  

  const handleChange = (name: keyof IUserLogin, value: string) => {
    setUserProps((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = userProps;

    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    // Redux action çağırarak giriş yap
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload.token; // Redux'tan token al
      await AsyncStorage.setItem('token', token); // Token'ı AsyncStorage'a kaydet
      navigation.navigate('MainPage');
    } else {
      Alert.alert('Giriş Başarısız', error || 'Bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('@/assets/images/login-image.png')}  style={ImageStyles.image}/>
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
    marginTop: 120,
    backgroundColor: 'white'
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
