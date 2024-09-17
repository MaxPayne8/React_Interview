import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: { taskList: [], error: false },
  reducers: {
    addTask: (state, action) => {
      if (action.payload.length > 0) {
        state.taskList.push(action.payload);
      } else {
        state.error = true;
      }
    },
    removeTask: (state, action) => {
      const dupTaskArr = [...state.taskList];
      dupTaskArr.splice(action.payload, 1);
      state.taskList = dupTaskArr;
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
