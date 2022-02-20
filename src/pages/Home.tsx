import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(item => item.title === newTaskTitle);

    if(foundTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK" }
        ]
      );
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    /*
      Updated tasks faz uma copia de tasks, e como cada item de tasks tem propriedades simples,
      ele faz a cópia dessas propriedades sem problemas, se fossem objetos dentro de objetos ou similares,
      teria que fazer mais maps para que fossem pegos apenas as propriedades simples.
      O foundItem já altera a updatedTaks, por justamente já estar pegando sua alocação na memória, que é o que
      aconteceria com tasks se não usassemos o map.
    */
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { 
          text: "Não" 
        },
        { 
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})