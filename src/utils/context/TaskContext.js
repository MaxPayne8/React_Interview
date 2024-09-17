import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const addTask = (currentTask) => {
    if (!currentTask || !currentTask.length) {
      setError(true);
    } else {
      setTaskList([...taskList, currentTask]);
      setError(false);
    }
  };
  const removeTask = (index) => {
    const dupArr = [...taskList];
    dupArr.splice(index, 1);
    setTaskList(dupArr);
  };

  return (
    <TaskContext.Provider value={{ taskList, addTask, removeTask, error }}>
      {children}
    </TaskContext.Provider>
  );
};
