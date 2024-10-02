import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '@/redux/taskSlice';
import { AppDispatch, RootState } from '@/redux/store';


const audioRecorderPlayer = new AudioRecorderPlayer();

interface PlusScreenProps {
  onSave: (task: string, category: string, deadline: string, degree: string) => void;
  onClose: () => void;
}

const PlusScreen: React.FC<PlusScreenProps> = ({ onSave, onClose }) => {
  const dispatch = useDispatch<AppDispatch>(); // redux
  useSelector((state: RootState) => state.tasks); // redux

  // State'ler
  const [task, setTask] = useState(''); // Görev için
  const [category, setCategory] = useState(''); // Kategori için
  const [deadline, setDeadline] = useState(''); // Sona erme tarihi için
  const [degree, setDegree] = useState(''); // Derece için
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // Takvim görünürlüğü için
  const [isRecording, setIsRecording] = useState(false); // Ses kaydı için  

  // Takvimi açma/kapatma ve tarih seçme fonksiyonları
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setDeadline(date.toLocaleDateString()); // Seçilen tarihi sona erme tarihine ekler
    hideDatePicker();
  };

  const handleSaveTask = async () => {
    // Tüm alanların doldurulup doldurulmadığını kontrol et
    if (!task || !category || !deadline || !degree) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
  
    try {
      console.log('Görev verisi gönderiliyor:', { task, category, deadline, degree });
  
      // Redux dispatch işlemi: görev kaydediliyor
      const result = await dispatch(createTask({
        task,
        category,
        deadline,
        degree
      })).unwrap();
  
      console.log('Sunucudan gelen yanıt:', result);
      Alert.alert('Başarılı', 'Görev başarıyla kaydedildi!');
  
      // Görev ana ekrana kaydediliyor
      onSave(task, category, deadline, degree);
  
      // Alanlar sıfırlanıyor
      setTask('');
      setCategory('');
      setDeadline('');
      setDegree('');

      onClose();
    } catch (error) {
      console.error('Görev kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', `Görev kaydedilirken bir hata oluştu: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  

  // Mikrofon izni kontrolü
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]);
    
        if (granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Mikrofona izin verildi');
          return true;
        } else {
          console.log('Mikrofona izin verilmedi');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS için izin zaten verilmiştir
  };

  // Ses kaydına başlama fonksiyonu
  const startRecording = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) return;

    setIsRecording(true);
    try {
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Recording', e.currentPosition);
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  // Ses kaydını durdurma fonksiyonu
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      audioRecorderPlayer.removeRecordBackListener();
      console.log('Recorded file', result);
      setTask(result); // Kaydedilen ses dosyasının yolunu task olarak ayarlayın
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Görev Ekle</Text>

      {/* Görevi yazma TextInput */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Görevinizi yazın"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <MaterialIcons 
            name={isRecording ? "stop" : "mic"} 
            size={30} 
            color={isRecording ? "red" : "gray"} 
            style={styles.micIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sona erme tarihi seçme */}
      <View style={styles.datePickerContainer}>
        <TextInput
          placeholder="Sona Erme Tarihi"
          value={deadline}
          style={styles.input}
          editable={false}
        />
        <TouchableOpacity onPress={showDatePicker}>
          <MaterialIcons name="date-range" size={34} color="gray" style={styles.dateIcon} />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.labelText}>Görevinizin derecesini seçin:</Text>
      <Picker
        selectedValue={degree}
        onValueChange={(itemValue) => setDegree(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Düşük" color="green" value="düşük" />
        <Picker.Item label="Orta" color="orange" value="orta" />
        <Picker.Item label="Yüksek" color='red' value="yüksek" />
      </Picker>

      <Text style={styles.labelText}>Kategori seçin:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Spor" value="spor" />
        <Picker.Item label="Eğitim" value="eğitim" />
        <Picker.Item label="Çalışma" value="çalışma" />
        <Picker.Item label="Ev İşleri" value="ev işleri" />
        <Picker.Item label="Sağlık" value="sağlık" />
        <Picker.Item label="Alışveriş" value="alışveriş" />
      </Picker>

      {/* Görevi kaydetme */}
      <TouchableOpacity onPress={handleSaveTask} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Görevi Kaydet</Text>
      </TouchableOpacity>

      {/* İptal butonu */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>İptal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  micIcon: {
    marginLeft: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateIcon: {
    marginLeft: 10,
  },
  labelText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
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
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FF0000',
    fontSize: 16,
  },
});

export default PlusScreen;