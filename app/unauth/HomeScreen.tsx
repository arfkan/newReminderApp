import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/common/Icon'; 
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>     
      <Image
        source={require('../../assets/images/checklist-seo.png')}
        style={{ width: 400, height: 300, marginBottom: 150 }}
      />
        <Text style={{fontSize:20, fontWeight: 'bold',marginBottom:150, left: 70}}>İlk görevinizi ekleyin</Text>
      <TouchableOpacity 
        style={styles.plusIconContainer} 
        onPress={() => navigation.navigate('PlusScreen')}
      >
      
        <View style={{ position: 'absolute', width: 120, height: 120, right: -90, top: -120 }}>
          <Svg height="140" width="150" viewBox="0 0 120 120">
            <Path
              d="M100 10 C 10 40, 70 70, 20 100 L 30 100 L 20 100 L 20 90"
              fill="none"
              stroke="#FFA500"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <MaterialIcons name="add" style={styles.plusIcon}
        onPress={()=> navigation.navigate('PlusScreen')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;