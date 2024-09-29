import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ tasks }: { tasks: { task: string, category: string, deadline: string, degree: string }[] }) => {

  // Görevleri derecesine göre sıralayan fonksiyon
  const sortedTasks = tasks.sort((a, b) => {
    const degreeOrder: { [key: string]: number } = { 'yüksek': 3, 'orta': 2, 'düşük': 1 };
    return degreeOrder[b.degree] - degreeOrder[a.degree]; // Yüksek dereceleri öne çıkarma
  });

  // dereceyi öne çıkarma işleminde sort fonksiyonunu kullandık.


  // görevleri kategoriye göre sıralayan fonksiyon
const groupedTasks = sortedTasks.reduce((acc: {[key: string]: any[]}, task)=>{ // acc, birikim yapan (accumulator) değişkendir.

  if(!acc[task.category]){
    acc[task.category] = []; // burda örneğin spor kategorisi yoksa acc ye spor kategorisi eklenir.
  }
  acc[task.category].push(task); // sonrasında ilgili görev bu kategoriye eklenir.
  return acc;
},{});  

// gruplanmış görevleri düz bir liste haline getiren fonksiyon

const categorizedTaskList = Object.keys(groupedTasks).map(category => ({
  category,
  data: groupedTasks[category]
}));

 const colorContainer = (degree: string) => {
    if (degree === "yüksek") {
      return "red";
    } else if (degree === "orta") {
      return "orange";
    } else { (degree === "düşuk")
      return "green";
    }
  };


 
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
          data={categorizedTaskList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.categorySection}>
              {/* Kategori Başlığı */}
              <Text style={styles.categoryTitle}>{item.category}</Text>
              {/* Kategorinin Altındaki Görevler */}
              {item.data.map((taskItem, taskIndex) => (
                <View key={taskIndex}
                style={[
                  styles.taskItem,
                  { backgroundColor: colorContainer(taskItem.degree) }, // Burada arka plan rengini ayarlıyoruz
                ]}>
                  <Text style={styles.taskText}>{taskItem.task}</Text>
                  <Text style={styles.categoryText}>Sona Erme Tarihi: {taskItem.deadline}</Text>
                  <Text style={[styles.degreeText, taskItem.degree === 'yüksek' ? styles.highDegree : null]}>
                    Derece: {taskItem.degree}
                  </Text>
                </View>
              ))}
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
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
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
    color: 'black',
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
