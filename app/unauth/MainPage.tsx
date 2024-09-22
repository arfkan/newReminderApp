import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import FindScreen from './FindScreen';
import NotificationsScreen from './NotificationsScreen';
import PlusScreen from './PlusScreen';
import { PropsWithChildren } from 'react';
import PastTasks from './PastTasks';

const Tab = createBottomTabNavigator();

// Özel bir ekleme butonu oluşturma
const CustomAddButton = ({ children, onPress }: PropsWithChildren<{ onPress: () => void }>) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
  >
    <View style={styles.addButtonView}>
      {children}
    </View>
  </TouchableOpacity>
);

const MainPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal görünürlüğü durumu
  const [tasks, setTasks] = useState<{ task: string; category: string; deadline: string; degree: string }[]>([]); // Görevler state'i

  // Modal açma ve kapatma fonksiyonu
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Görev ekleme fonksiyonu
  const handleAddTask = (task: string, category: string, deadline: string, degree: string) => {
    setTasks([...tasks, { task, category, degree, deadline }]);
    toggleModal(); // Modalı kapatma
  };

  return (
    <>
      {/* Tab navigatör ekranları */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Archive') {
              iconName = 'archive'; // Archive icon for PastTasks
            } else if (route.name === 'Find') {
              iconName = 'search';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { paddingBottom: 10, height: 60 },
        })}
      >
        {/* Ana ekran */}
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => <HomeScreen tasks={tasks} />}
        </Tab.Screen>

        <Tab.Screen name="Find">
          {() => <FindScreen />}
        </Tab.Screen>

        {/* Ortadaki ekleme butonu */}
        <Tab.Screen
          name="Add"
          options={{
            tabBarButton: (props) => (
              <CustomAddButton {...props} onPress={toggleModal}>
                <MaterialIcons name="add" size={30} color="#fff" />
              </CustomAddButton>
            ),
          }}
        >
          {/* children prop */}
          {() => <PlusScreen onSave={handleAddTask} onClose={toggleModal} />}
        </Tab.Screen>

        {/* Icon for PastTasks (Archive) */}
        <Tab.Screen
          name="Archive"
          options={{ headerShown: false }}
          component={PastTasks}
        />

        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>

      {/* Görev ekleme modalı */}
      <Modal visible={isModalVisible} animationType="slide">
        <PlusScreen onSave={handleAddTask} onClose={toggleModal} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
  },
  addButtonView: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
  },
});

export default MainPage;
