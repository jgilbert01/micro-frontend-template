import React, { useState } from "react";

import AddTask from './task-add';
import TaskList from './task-list';

export default function Root(props) {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { tasks, addTask, checkTask, removeTask } = useTasks();

  const clearInputAndAddTask = () => {
    clearInput();
    addTask(inputValue);
  };

  return (
    <>
      <AddTask
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTask}
        onInputKeyPress={event => keyInput(event, clearInputAndAddTask)}
      />
      <TaskList
        items={tasks}
        onItemCheck={idx => checkTask(idx)}
        onItemRemove={idx => removeTask(idx)}
      />
      <p>{props.name} is mounted!</p>
    </>
  );
}


export const useInputValue = (initialValue = '') => {
  const [inputValue, setInputValue] = useState(initialValue);
  return {
    inputValue,
    changeInput: event => setInputValue(event.target.value),
    clearInput: () => setInputValue(''),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }
      return false;
    },
  };
};

export const useTasks = (initialValue = []) => {
  const [tasks, setTasks] = useState(initialValue);

  const emitCount = () => {
    window.dispatchEvent(new CustomEvent('TopRightNav', {
      detail: {
        id: 'tasks',
        count: tasks.filter(t => !t.checked).length,
      }
    }));
  }

  return {
    tasks,
    addTask: text => {
      if (text !== '') {
        setTasks(
          tasks.concat({
            text,
            checked: false,
          })
        );
        emitCount();
      }
    },
    checkTask: idx => {
      setTasks(
        tasks.map((task, index) => {
          if (idx === index) {
            task.checked = !task.checked;
          }
          return task;
        })
      );
      emitCount();
    },
    removeTask: idx => {
      setTasks(tasks.filter((task, index) => idx !== index));
      emitCount();
    },
  };
};