import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Dayjs } from 'dayjs';
import { FirebaseFirestoreService } from '../../api/firebaseService/db';

interface Task {
  taskId?: string;
  uid: string;
  desc: string;
  label: string;
  severity: string;
  scheduledStartTime: Dayjs;
  scheduledEndTime: Dayjs;
  scheduledStartDate: Dayjs;
  scheduledEndDate: Dayjs;
  isCompleted: boolean;
  createdDateTime?: string;
}

interface MonthTask {
  date: number;
  tasks: Task[];
}

interface SearchMethod {
  searchedName: string;
  filterMethod: {
    severity: string | null;
    label: string | null;
    isCompleted: boolean;
  };
  sortMethod: { way: string; atz: boolean }; // default value: 'scheduledTime true'
}

interface TaskState {
  taskPanelVisible: boolean;
  todayTasks: Task[];
  todaySearchResultTasks: Task[];
  todayTasksComplete: { total: number; completedNum: number };
  monthTasks: MonthTask[]; // query this by month and year
  editTaskContent: {
    desc: string;
    label: string;
    severity: string;
    scheduledStartTime: Dayjs;
    scheduledEndTime: Dayjs;
    scheduledStartDate: Dayjs;
    scheduledEndDate: Dayjs;
    isCompleted: boolean;
  } | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TaskState = {
  taskPanelVisible: false,
  todayTasks: [],
  todaySearchResultTasks: [],
  todayTasksComplete: { total: 0, completedNum: 0 },
  monthTasks: [],
  editTaskContent: null,
  loading: false,
  error: null,
  success: false,
};

// need unit test
const getTimeDifferenceInMinutes = (start: Dayjs, end: Dayjs): number => {
  return end.diff(start, 'minute');
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
    // get today's tasks list
    updateTodayTasks: (state, action: PayloadAction<Task[]>) => {
      state.todayTasks = action.payload;
    },
    // get today's searched tasks by [ searched name, severity, label, sortMethod]
    getTodaySearchResultTasks: (state, action: PayloadAction<SearchMethod>) => {
      const { searchedName, filterMethod, sortMethod } = action.payload;
      const { severity, label, isCompleted } = filterMethod;
      const { way, atz } = sortMethod;

      let resultTasks = [...state.todayTasks];

      if (resultTasks) {
        // implement searching
        if (searchedName) {
          resultTasks = resultTasks.filter((task) =>
            task.desc.toLowerCase().includes(searchedName.toLowerCase()),
          );
        }
        if (severity) {
          resultTasks = resultTasks.filter(
            (task) => task.severity.toLowerCase() === severity.toLowerCase(),
          );
        }
        if (label) {
          resultTasks = resultTasks.filter(
            (task) => task.label.toLowerCase() === label.toLowerCase(),
          );
        }

        if (typeof isCompleted === 'boolean') {
          resultTasks = resultTasks.filter(
            (task) => task.isCompleted === isCompleted,
          );
        }

        resultTasks.sort((a, b) => {
          let comparison = 0;
          switch (way) {
            case 'scheduledStartTime':
              comparison = a.scheduledStartTime.diff(b.scheduledStartTime);
              break;
            case 'totalTimeUse':
              comparison =
                getTimeDifferenceInMinutes(
                  a.scheduledStartTime,
                  a.scheduledEndTime,
                ) -
                getTimeDifferenceInMinutes(
                  b.scheduledStartTime,
                  b.scheduledEndTime,
                );
              break;
            default:
              comparison = 0;
              break;
          }
          return atz ? comparison : -comparison;
        });

        state.todaySearchResultTasks = resultTasks;
      }
    },
    // get todayTasks complete rate
    getTodayTasksComplete: (state) => {
      const totalTask = state.todayTasks;
      if (totalTask.length > 0) {
        state.todayTasksComplete = {
          total: totalTask.length,
          completedNum: totalTask.reduce((completedNum, cur) => {
            return completedNum + (cur.isCompleted ? 1 : 0);
          }, 0),
        };
      }
    },
    // get date tasks list by month
    getMonthTasks: (state, action: PayloadAction<MonthTask[]>) => {
      state.monthTasks = action.payload;
    },
    // get task content
    getEditTaskContentByTodayList: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const taskNeededEdit = state.todayTasks.find(
        (task) => task.taskId === taskId,
      );
      if (taskNeededEdit) {
        state.editTaskContent = {
          desc: taskNeededEdit.desc,
          label: taskNeededEdit.label,
          severity: taskNeededEdit.severity,
          scheduledStartTime: taskNeededEdit.scheduledStartTime,
          scheduledEndTime: taskNeededEdit.scheduledEndTime,
          scheduledStartDate: taskNeededEdit.scheduledStartDate,
          scheduledEndDate: taskNeededEdit.scheduledEndDate,
          isCompleted: taskNeededEdit.isCompleted,
        };
      } else {
        throw new Error('Please check the task ID passed');
      }
    },
    getEditTaskContentByMonthTasksList: (
      state,
      action: PayloadAction<{ taskId: string; date: number }>,
    ) => {
      const { taskId, date } = action.payload;
      const tasksNeededEdit = state.monthTasks.find(
        (dateTask) => dateTask.date === date,
      );

      let taskNeededEdit = null;
      if (tasksNeededEdit) {
        taskNeededEdit = tasksNeededEdit.tasks.find(
          (task) => task.taskId === taskId,
        );
      }

      if (taskNeededEdit) {
        state.editTaskContent = {
          desc: taskNeededEdit.desc,
          label: taskNeededEdit.label,
          severity: taskNeededEdit.severity,
          scheduledStartTime: taskNeededEdit.scheduledStartTime,
          scheduledEndTime: taskNeededEdit.scheduledEndTime,
          scheduledStartDate: taskNeededEdit.scheduledStartDate,
          scheduledEndDate: taskNeededEdit.scheduledEndDate,
          isCompleted: taskNeededEdit.isCompleted,
        };
      } else {
        throw new Error('Please check the task ID and date passed');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const {
  showTaskPanel,
  hideTaskPanel,
  updateTodayTasks,
  getTodaySearchResultTasks,
  getTodayTasksComplete,
  setLoading,
  setError,
  setSuccess,
} = taskSlice.actions;

export const getTaskStore = (state: RootState) => state.task;

export const createTaskAsync =
  (document: Task): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    const createdDateTime = new Date();
    const taskWithTimestamps = {
      ...document,
      taskId: document.scheduledStartTime.toDate().getTime().toString(),
      createdDateTime,
      scheduledStartTime: document.scheduledStartTime.toDate(),
      scheduledEndTime: document.scheduledEndTime.toDate(),
      scheduledStartDate: document.scheduledStartDate.toDate(),
      scheduledEndDate: document.scheduledEndDate.toDate(),
    };
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSuccess(false));
    try {
      await FirebaseFirestoreService.createDocument(
        'tasks',
        taskWithTimestamps,
        document.scheduledStartTime.toDate().getTime().toString(),
      );
      dispatch(setLoading(false));
      dispatch(setSuccess(true));

      // update
      // getTodayTasksAsync()
      // getMonthTasksAsync()
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(false));
    }
  };

// export const getTodayTasksAsync =
//   (): ThunkAction<void, RootState, unknown, UnknownAction> =>
//   async (dispatch) => {
//     const asyncResp = await Promise.resolve('hello world');
//     //if(asyncResp)
//     // dispatch(updateTodayTasks(asyncResp));
//   };

// export const updateTaskByTaskIdAsync =
//   (taskId: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
//   async (dispatch) => {
//     const asyncResp = await Promise.resolve('hello world');
//     // if(asyncResp)
//     // dispatch(updateTodayTasks(asyncResp));
//     // dispatch()
//   };

export default taskSlice.reducer;
