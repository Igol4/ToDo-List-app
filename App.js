import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image, Linking} from 'react-native';
const App = () => {
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() =>{
    getTodosFromUserDevice();
  }, [])
  React.useEffect(() => {
    saveTodoTouserDevice(todos);
  }, [todos]);

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };
  const ListItem = ({todo}) => {
    return <View style={styles.listItem}>
      <View style={{flex: 1}}>
        <Text style={{
          fontWeight: 'bold', 
          fontSize: 15, color: '#1f145c', 
          textDecorationLine: todo?.completed ? 'line-through' : 'none'
          }}>
            {todo?.task}
          </Text>
      </View>
      {
        !todo?.completed && (
          <TouchableOpacity style={[styles.actionIcon]} onPress={()=>markTodoComplete(todo?.id)}>
            <Image style={styles.pic} source={require("./assets/complete.png")}/>
          </TouchableOpacity>
        )}
      <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#fff'}]}onPress={()=>deleteTodo(todo?.id)}>
      <Image style={styles.pic} source={require("./assets/delete.png")}/>
      </TouchableOpacity>
    </View>
  };

  const saveTodoTouserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch(error) {
      console.log(error);
    }
  };
  const addTodo = () => {
    if(textInput == ""){
      Alert.alert("Error", "Pleace input task")
    } else{
      const newTodo ={
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const markTodoComplete = (todoId) => {
  const newTodos = todos.map((item)=>{
    if(item.id== todoId){
      return {...item, completed:true}
    }
    return item;
  });
  setTodos(newTodos);
  };
  const deleteTodo = (todoId) =>{
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };
  {/*
  const report = () => {
    Alert.alert('Report a problem', 'Email: ivangolubic8@gmail.com', [
      {
        text: 'Email',
        onPress: () => Linking.openURL("mailto:ivangolubic8@gmail.com"),
      },
      {
        text: 'Close',
      },
    ]);
  };*/}
  return <SafeAreaView style={styles.safearea}>
    <View style={styles.header}>
      <Text style={styles.title}>ToDo List</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:ivangolubic8@gmail.com')}>
        <Text style={styles.report}>Report a problem</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearAllTodos}>
        <Image style={styles.pic} source={require("./assets/delete.png")} />
      </TouchableOpacity>
    </View>
    <FlatList 
    showsHorizontalScrollIndicator={false}
      contentContainerStyle={{padding:20, paddingBottom: 100}}
      data={todos} 
      renderItem={({item}) => <ListItem todo={item} />}  />
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Add Task" value={textInput} onChangeText={(text)=>setTextInput(text)}/>
      </View>
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
          <Text color={'#fff'} size={100}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
    
  </SafeAreaView>
};
const styles = StyleSheet.create({
  report:{
    color: '#1f145c',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  pic: {
    width: 25,
    height: 25,
  },
  actionIcon:{
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  listItem:{
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 20,
    borderRadius: 7,
    marginVertical: 10,
  },
  safearea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  title:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1f145c',
  },
  footer:{
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer:{
    backgroundColor: '#1f145c',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer:{
    height: 50,
    width: 50,
    backgroundColor: '#1f145c',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default App;
