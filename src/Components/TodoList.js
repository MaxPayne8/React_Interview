import React, { useContext, useState } from "react";
import { TaskContext } from "../utils/context/TaskContext";

const TodoList = () => {
  const [currentTask, setCurrentTask] = useState("");

  const { taskList, error, addTask, removeTask } = useContext(TaskContext);

  return (
    <div className="bg-green-500 min-h-screen">
      <h1 className="text-center p-2 text-xl">TodoList</h1>
      <div className="flex justify-center items-center gap-5 mt-7">
        <div className="flex flex-col gap-2">
          <textarea
            className="border-2 border-black rounded-lg w-72 px-1"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          {error && (
            <lable className="text-red-700">Please write the tasks...</lable>
          )}
        </div>

        <button
          className="border-2 bg-slate-950 text-slate-200 px-2"
          onClick={() => {
            addTask(currentTask);
            setCurrentTask("");
          }}
        >
          Add
        </button>
      </div>
      <div>
        <ul className="flex flex-col gap-2  m-5 mx-10">
          {taskList.map((task, index) => (
            <div className="flex gap-2">
              <li className="bg-slate-950  text-slate-200 p-1 w-fit">{task}</li>
              <button
                className="bg-red-600 px-1 rounded-lg text-white"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
