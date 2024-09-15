import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PlusScreen = () => {
  const [task, setTask] = useState(''); // Kullanıcının girdiği görev
  const [category, setCategory] = useState(''); // Seçilen kategori
  const [tasks, setTasks] = useState<{ task: string; category: string }[]>([]);// Tüm görevleri saklayan state

  // Görevi kaydetme işlevi
  const handleSaveTask = () => {
    if (task && category) {
      // Yeni görevi ekleme
      setTasks([...tasks, { task, category }]);
      setTask(''); // Inputu temizleme
      setCategory(''); // Kategoriyi sıfırlama
    } else {
      alert('Lütfen bir görev ve kategori giriniz.');
    }
  };

  // Görev kutucuklarını oluşturma
 
const renderTaskItem = ({ item }: { item: { task: string; category: string } }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>Görev: {item.task}</Text>
      <Text style={styles.categoryText}>Kategori: {item.category}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Görev Ekle</Text>

      {/* Görev metni girişi */}
      <TextInput
        placeholder="Görevinizi yazın"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      {/* Kategori seçimi */}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Kategori seçin:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Spor" value="spor" />
        <Picker.Item label="Eğitim" value="egitim" />
        <Picker.Item label="Çalışma" value="calisma" />
        <Picker.Item label="Ev İşleri" value="ev_isleri" />
      </Picker>

      {/* Görev kaydetme butonu */}
      <TouchableOpacity
        onPress={handleSaveTask}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Görevi Kaydet</Text>
      </TouchableOpacity>

      {/* Kaydedilen görevleri listeleme */}
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
  taskCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PlusScreen;
