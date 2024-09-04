import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/common/Icon';  

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>
  </View>
);

const PlusScreen = () => (
  <View>
    <Text>Plus Screen</Text>
  </View>
);

const FindScreen = () => (
  <View>
    <Text>Find Screen</Text>
  </View>
);

const NotificationsScreen = () => (
  <View>
    <Text>Notifications Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const MainPage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = ''; 

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Plus') {
          
            return (
              <View style={styles.plusIconContainer}>
                <MaterialIcons name="add" style={styles.plusIcon} />
              </View>
            );
          } else if (route.name === 'Find') {
            iconName = 'search';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }

          return <MaterialIcons name={iconName} size={25} color={color} style={styles.tabIcon} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Plus" component={PlusScreen} />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default MainPage;
