import React, {useState} from 'react';
import { Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    
    <View style={styles.container}>
      
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>ToDo List</Text>
        <Text style={styles.instructions}>To add a task write it in the ox below and click the + icon.</Text>
        <Text style={styles.instructions}>To delete the task, tap on it.</Text>
        <Text style={styles.report} onPress={() => Linking.openURL('mailto:ivangolubic8@gmail.com')}>Report a problem</Text>
        
        <View style={styles.items}>
        <ScrollView style={styles.ScrollView}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                </TouchableOpacity>
              )
    
          })
        }{/*
          <Task text={'Task 2'} />
        <Task text={'Task 2'} /> */}
        </ScrollView>
        </View>
          
        
      </View>

      
      {/*write a task*/}
      
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}>
              <TextInput style={styles.input} placeholder={'Write a task'} placeholderTextColor="#9e9e9e" value={task} onChangeText={text => setTask(text)}/>
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
              
            </KeyboardAvoidingView>
     </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingBottom: 255,
    backgroundColor: '#383838',
    color:'#383838',
    
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  sectionTitle: {
    paddingBottom: 5,
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  instructions: {
    color: '#9e9e9e',
    fontSize: 13,
  },
  report: {
    color: '#9e9e9e',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  items: {
    marginTop: 20,

  },
  writeTaskWrapper: {
    paddingBottom: 0,
    marginTop: 0,
    position: 'absolute',
    bottom: 30,
    width : '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#2e2e2e',
    borderRadius: 60,
    borderColor: '#191919',
    borderWidth: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#2e2e2e',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',

  },
  addText: {
    color: '#9e9e9e',
  },
});
