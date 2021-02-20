import React, { useReducer, useEffect } from "react";

import AddTask from './task-add';
import TaskList from './task-list';

export default function Root(props) {
  const { tasks, addTask, checkTask, removeTask } = useTasks();

  const onSubmit = values => {
    console.log(values);
    addTask(values);
  };

  return (
    <>
      <AddTask onSubmit={onSubmit} />

      <TaskList
        items={tasks}
        onItemCheck={idx => checkTask(idx)}
        onItemRemove={idx => removeTask(idx)}
        handleRightDrawerClose={props.handleRightDrawerClose}
      />
      <p>{props.name} is mounted!</p>
    </>
  );
}

export const useTasks = () => {
  const initialState = window.localStorage.getItem("tasks") == null
    ? [{
      subject: 'do this task first',
      route: "/task/123",
    }, {
      subject: 'here is another task',
      route: "/task/456",
    }]
    : emitCount(JSON.parse(window.localStorage.getItem("tasks")));

  const [tasks, dispatch] = useReducer(reducer, initialState);

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

const emitCount = (tasks) => {
  window.dispatchEvent(new CustomEvent('TopRightNav', {
    detail: {
      id: 'tasks',
      count: tasks.filter(t => !t.checked).length,
    }
  }));
  return tasks;
}

const reducer = (tasks, action) => {
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