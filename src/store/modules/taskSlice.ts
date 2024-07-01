import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface TaskState {
  taskPanelVisible: boolean;
}

const initialState: TaskState = {
  taskPanelVisible: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    showTaskPanel: (state) => {
      state.taskPanelVisible = true;
    },
    hideTaskPanel: (state) => {
      state.taskPanelVisible = false;
    },
  },
});

export const { showTaskPanel, hideTaskPanel } = taskSlice.actions;

export const getTaskPanelVisibility = (state: RootState) =>
  state.task.taskPanelVisible;

export default taskSlice.reducer;
