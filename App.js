import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, CheckBox, ImageBackground, StyleSheet } from 'react-native';

const App = () => {
  const [inputTask, setInputTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (inputTask.trim() !== '') {
      const newTodo = { id: Date.now(), task: inputTask, completed: false };
      setTodos([...todos, newTodo]);
      setInputTask('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleTodo(item.id)}
      />
      <Text style={styles.taskText}>{item.task}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('./assets/list1.gif')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>To-Do List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your task..."
            value={inputTask}
            onChangeText={text => setInputTask(text)}
            onSubmitEditing={addTodo} // Add task on "Enter" press
          />
        </View>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default App;
