import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ tasks }: { tasks: { task: string, category: string, deadline: string, degree: string }[] }) => {

  // Görevleri derecesine göre sıralayan fonksiyon
  const sortedTasks = tasks.sort((a, b) => {
    const degreeOrder: { [key: string]: number } = { 'yüksek': 3, 'orta': 2, 'düşük': 1 };
    return degreeOrder[b.degree] - degreeOrder[a.degree]; // Yüksek dereceleri öne çıkarma
  });

  // dereceyi öne çıkarma işleminde sort fonksiyonunu kullandık.

  return (
    <ImageBackground 
      source={require('@/assets/images/orangeü.jpg')}  
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Görevler</Text>
        {sortedTasks.length === 0 ? (
          <Text style={styles.noTaskText}>Henüz görev eklenmedi.</Text>
        ) : (
          <FlatList        


          
            data={sortedTasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.task}</Text>
                <Text style={styles.categoryText}>Kategori: {item.category}</Text>
                <Text style={styles.categoryText}>Sona Erme Tarihi: {item.deadline}</Text>
                <Text style={[styles.degreeText, item.degree === 'yüksek' ? styles.highDegree : null]}>
                  Derece: {item.degree}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',  
    height: '100%', 
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noTaskText: {
    fontSize: 18,
    color: 'gray',
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 19,
  },
  categoryText: {
    fontSize: 14,
    color: 'gray',
  },
  degreeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  highDegree: {
    color: 'red', 
  }
});

export default HomeScreen;
