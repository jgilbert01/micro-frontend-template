import React, { useReducer, useEffect } from "react";

import AddTask from './TaskAdd';
import TaskList from './TaskList';

export default function Root({ name, close, updateCount }) {
  const { tasks, addTask, checkTask, removeTask } = useTasks(updateCount);

  const onSubmit = values => {
    console.log(values);
    addTask(values);
  };

  return (
    <>
      <AddTask onSubmit={onSubmit} />
      <TaskList
        items={tasks}
        onSubmit={onSubmit} 
        onItemCheck={idx => checkTask(idx)}
        onItemRemove={idx => removeTask(idx)}
        close={close}
        updateCount={updateCount}
      />
      {/* <p>{name} is mounted!</p> */}
    </>
  );
}

export const useTasks = (updateCount) => {
  const emitCount = (tasks) => {
    updateCount('tasks', tasks.filter(t => !t.checked).length);
    return tasks;
  }
  
  const initialState = emitCount(window.localStorage.getItem("tasks") == null
    ? [{
      subject: 'do this task first',
      route: "/task/123",
    }, {
      subject: 'here is another task',
      route: "/task/456",
    }]
    : JSON.parse(window.localStorage.getItem("tasks")));

  const [tasks, dispatch] = useReducer(reducer(emitCount), initialState);

  useEffect(
    () => {
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  return {
    tasks,
    addTask: payload => dispatch({
      type: "addTask",
      payload
    }),
    checkTask: payload => dispatch({
      type: "checkTask",
      payload
    }),
    removeTask: payload => dispatch({
      type: "removeTask",
      payload
    }),
  };
};

const reducer = (emitCount) => (tasks, action) => {
  switch (action.type) {
    case "addTask":
      return emitCount(tasks.concat({
        ...action.payload,
        checked: false,
      }));
    case "checkTask":
      return emitCount(tasks.map((task, index) => {
        if (action.payload === index) {
          task.checked = !task.checked;
        }
        return task;
      }));
    case "removeTask":
      return emitCount(tasks.filter((task, index) => action.payload !== index));
    default:
      return tasks;
  }
}