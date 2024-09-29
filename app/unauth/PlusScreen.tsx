import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const PlusScreen = ({ onSave, onClose }: { onSave: (task: string, category: string, deadline: string, degree: string) => void, onClose: () => void }) => {
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

  const handleSaveTask = () => {
    if (!task || !category || !deadline || !degree) {
      alert('Lütfen görev, kategori, son tarih ve derece bilgilerini eksiksiz giriniz.');
    } else {
      onSave(task, category, deadline, degree); // Görev, kategori, son tarih ve derece ana ekrana gönderiliyor
      setTask('');
      setCategory('');
      setDeadline(''); 
      setDegree('');
    }
  };
   // mikrofon izin kontrolu

   // Mikrofon izni kontrolü
   const checkPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ]);
  
      if (
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Mikrofona izin verildi');
        return true;
      } else {
        console.log('Mikrofona izin verilmedi');
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
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording', e.currentPosition);
      return;
    });
  };

  // Ses kaydını durdurma fonksiyonu
  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    audioRecorderPlayer.removeRecordBackListener();
    console.log('Recorded file', result);
    setTask(result); // Kaydedilen ses dosyasının yolunu task olarak ayarlayın
  };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: 'red' }}>Görev Ekle</Text>

      {/* Görevi yazma TextInput */}

      <View>
      <TextInput
        placeholder="Görevinizi yazın"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
     <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <MaterialIcons name={isRecording ? "stop" : "mic"} size={30} {...{ style: { marginLeft: 340, marginTop: -60 } }} color={isRecording ? "red" : "gray"} />
        </TouchableOpacity>
      </View>
     

      {/* Sona erme tarihi seçme */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TextInput
          placeholder="Sona Erme Tarihi"
          value={deadline} // Son tarih burada gösterilecek
          style={styles.input}
          editable={false} // Bu alan manuel yazılamaz, sadece takvimden seçilir
        />
        <TouchableOpacity onPress={showDatePicker}>
          <MaterialIcons style={{ marginLeft: -35, marginBottom: 20 }} name="date-range" size={34} color="gray" />
        </TouchableOpacity>
      </View>


      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}>Görevinizin derecesini seçin:</Text>
     <Picker
      selectedValue={degree}
      onValueChange={(itemValue) => setDegree(itemValue)}
      style={styles.picker}
     >
       <Picker.Item label="Düşük" color="green" value="düşük" />
        <Picker.Item label="Orta" color="orange" value="orta" />
        <Picker.Item label="Yüksek" color='red' value="yüksek" />
     </Picker>
      

      <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}>Kategori seçin:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Spor" value="spor" />
        <Picker.Item label="Eğitim" value="eğitim" />
        <Picker.Item label="Çalışma" value="calışma" />
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
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FF0000',
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default PlusScreen;
