import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import type { RootState } from '..';
import dayjs, { Dayjs } from 'dayjs';
import { FirebaseFirestoreService } from '../../api/firebaseService/db';
import { getUID } from '../../util/localStorageFucs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

interface Task {
  desc: string;
  label: string;
  severity: string;
  scheduledStartTime: Dayjs;
  scheduledEndTime: Dayjs;
  scheduledStartDate?: Dayjs;
  scheduledEndDate?: Dayjs;
  isCompleted?: boolean;
  isExpired?: boolean;
}

interface StampTask {
  desc: string;
  label: string;
  severity: string;
  scheduledStartTime: number;
  scheduledEndTime: number;
  scheduledStartDate?: number;
  scheduledEndDate?: number;
  isCompleted?: boolean;
  isExpired?: boolean;
}

export type SearchMethod = {
  searchedName: string;
  filterMethod: {
    severity: string | null;
    label: string | null;
    isCompleted: boolean | null;
  };
  sortMethod: { way: string; atz: boolean }; // default value: 'scheduledTime true'
};

interface TaskState {
  taskPanelVisible: boolean;
  todayTasks: StampTask[];
  todaySearchResultTasks: StampTask[];
  todayTasksComplete: { total: number; completedNum: number }; // query this by month and year
  editTaskContent: {
    desc: string;
    label: string;
    severity: string;
    scheduledStartTime: number;
    scheduledEndTime: number;
    isCompleted: boolean;
  } | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TaskState = {
  taskPanelVisible: false,
  todayTasks: [],
  todaySearchResultTasks: [],
  todayTasksComplete: { total: 0, completedNum: 0 },
  editTaskContent: null,
  loading: false,
  error: null,
  success: null,
};

// need unit test
const getTimeDifferenceInMinutes = (start: number, end: number): number => {
  const millisecondsDifference = end - start;
  // Convert milliseconds to minutes
  return Math.floor(millisecondsDifference / (1000 * 60));
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
    updateTodayTasks: (state, action: PayloadAction<StampTask[]>) => {
      state.todayTasks = action.payload;
    },
    // get today's searched tasks by [ searched name, severity, label, sortMethod]
    getTodaySearchResultTasks: (state, action: PayloadAction<SearchMethod>) => {
      const { searchedName, filterMethod, sortMethod } = action.payload;
      const { severity, label, isCompleted } = filterMethod;
      const { way, atz } = sortMethod;

      // console.log(searchedName);
      // console.log(severity);
      // console.log(label);
      // console.log(isCompleted);
      // console.log(way);
      // console.log(atz);

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

        console.log(resultTasks);

        resultTasks.sort((a, b) => {
          let comparison = 0;
          switch (way) {
            case 'scheduledStartTime':
              comparison = a.scheduledStartTime - b.scheduledStartTime;
              break;
            case 'totalTimeUse':
              const timeUseA = getTimeDifferenceInMinutes(
                a.scheduledStartTime,
                a.scheduledEndTime,
              );
              const timeUseB = getTimeDifferenceInMinutes(
                b.scheduledStartTime,
                b.scheduledEndTime,
              );
              comparison = timeUseA - timeUseB;
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
    // // get date tasks list by month
    // getMonthTasks: (state, action: PayloadAction<MonthTask[]>) => {
    //   state.monthTasks = action.payload;
    // },
    // get task content
    // getEditTaskContentByTodayList: (state, action: PayloadAction<string>) => {
    //   const taskId = action.payload;
    //   const taskNeededEdit = state.todayTasks.find(
    //     (task) => task.taskId === taskId,
    //   );
    //   if (taskNeededEdit) {
    //     state.editTaskContent = {
    //       desc: taskNeededEdit.desc,
    //       label: taskNeededEdit.label,
    //       severity: taskNeededEdit.severity,
    //       scheduledStartTime: taskNeededEdit.scheduledStartTime,
    //       scheduledEndTime: taskNeededEdit.scheduledEndTime,
    //       scheduledStartDate: taskNeededEdit.scheduledStartDate,
    //       scheduledEndDate: taskNeededEdit.scheduledEndDate,
    //       isCompleted: taskNeededEdit.isCompleted,
    //     };
    //   } else {
    //     throw new Error('Please check the task ID passed');
    //   }
    // },
    // getEditTaskContentByMonthTasksList: (
    //   state,
    //   action: PayloadAction<{ taskId: string; date: number }>,
    // ) => {
    //   const { taskId, date } = action.payload;
    //   const tasksNeededEdit = state.monthTasks.find(
    //     (dateTask) => dateTask.date === date,
    //   );

    //   let taskNeededEdit = null;
    //   if (tasksNeededEdit) {
    //     taskNeededEdit = tasksNeededEdit.tasks.find(
    //       (task) => task.taskId === taskId,
    //     );
    //   }

    //   if (taskNeededEdit) {
    //     state.editTaskContent = {
    //       desc: taskNeededEdit.desc,
    //       label: taskNeededEdit.label,
    //       severity: taskNeededEdit.severity,
    //       scheduledStartTime: taskNeededEdit.scheduledStartTime,
    //       scheduledEndTime: taskNeededEdit.scheduledEndTime,
    //       scheduledStartDate: taskNeededEdit.scheduledStartDate,
    //       scheduledEndDate: taskNeededEdit.scheduledEndDate,
    //       isCompleted: taskNeededEdit.isCompleted,
    //     };
    //   } else {
    //     throw new Error('Please check the task ID and date passed');
    //   }
    // },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
    setRevertState: (state) => {
      state.taskPanelVisible = false;
      state.todayTasks = [];
      state.todaySearchResultTasks = [];
      state.todayTasksComplete = { total: 0, completedNum: 0 };
      state.editTaskContent = null;
      state.loading = false;
      state.error = null;
      state.success = null;
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
  setRevertState,
} = taskSlice.actions;

export const createTaskAsync =
  (
    document: Task,
    onSuccess?: () => void,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    const { scheduledStartDate, scheduledEndDate } = document; //Dayjs type
    //  get uid
    const uid = getUID();
    // Convert scheduled start and end dates to JavaScript Date objects
    const startDate = scheduledStartDate
      ? scheduledStartDate.toDate()
      : new Date();
    const endDate = scheduledEndDate ? scheduledEndDate.toDate() : new Date();

    // check if today is in the range, if it is, need to update today's data or monthly data
    dayjs.extend(isSameOrAfter);
    const isTodayInDuration =
      dayjs().isSameOrAfter(scheduledStartDate, 'date') &&
      scheduledEndDate?.isSameOrAfter(dayjs(), 'date');

    // Initialize an array to store tasks to be created
    const tasksToCreate = [];

    // Iterate over each day within the date range
    for (
      let timestamp = startDate.getTime();
      timestamp <= endDate.getTime();
      timestamp += 24 * 60 * 60 * 1000
    ) {
      const currentDate = new Date(timestamp);

      // Decompose the current date into year, month, and day
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      // Construct the Firestore path for the current day's tasks
      const firestorePath = `users/${uid}/tasks/${year}/${month}/${day}/dailyTasks`;
      // Prepare the task data for the current day
      const taskWithTimestamps = {
        desc: document.desc,
        label: document.label,
        severity: document.severity,
        isCompleted: false,
        isExpired: false,
        scheduledStartTime: document.scheduledStartTime.toDate(),
        scheduledEndTime: document.scheduledEndTime.toDate(),
      };

      // Add the task to the array of tasks to be created
      tasksToCreate.push({
        firestorePath,
        taskWithTimestamps,
      });
    }

    // Dispatch loading state
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSuccess(null));

    try {
      // Iterate through the tasks to be created and add them to Firestore
      for (const { firestorePath, taskWithTimestamps } of tasksToCreate) {
        await FirebaseFirestoreService.createDocument(
          firestorePath,
          taskWithTimestamps,
        );
      }
      // Dispatch success state
      dispatch(setLoading(false));
      dispatch(setSuccess('Task created successfully!'));
      if (onSuccess) onSuccess();
      // Additional actions like updating tasks
      console.log('isTodayInDuration' + isTodayInDuration);
      if (isTodayInDuration) {
        dispatch(getTodayTasksAsync());
      }
      // Example: await dispatch(getMonthTasksAsync());
    } catch (error) {
      // Dispatch error state
      dispatch(setLoading(false));
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(null));
    }
  };

export const getTodayTasksAsync =
  (
    onSuccess?: () => void,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const uid = getUID();
      const now = new Date();
      const year = now.getFullYear().toString();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');

      const path = `users/${uid}/tasks/${year}/${month}/${day}/dailyTasks`;
      const dailyTasksForToday =
        await FirebaseFirestoreService.getDocumentsFromLastCollection(path);

      console.log(dailyTasksForToday);
      dispatch(setLoading(false));
      // when editing a task, can only edit des,label,servirty,starttime and endtime
      if (dailyTasksForToday) {
        const tasks = dailyTasksForToday.map((dailyTask) => ({
          desc: dailyTask.desc,
          label: dailyTask.label,
          severity: dailyTask.severity,
          scheduledStartTime:
            dailyTask.scheduledStartTime.seconds * 1000 +
            dailyTask.scheduledStartTime.nanoseconds / 1000000,
          scheduledEndTime:
            dailyTask.scheduledEndTime.seconds * 1000 +
            dailyTask.scheduledEndTime.nanoseconds / 1000000,
          isCompleted: dailyTask.isCompleted,
          isExpired: dailyTask.isExpired,
        }));

        dispatch(updateTodayTasks(tasks));

        dispatch(getTodayTasksComplete());
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(null));
    }
  };

// export const updateTaskByTaskIdAsync =
//   (taskId: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
//   async (dispatch) => {
//     const asyncResp = await Promise.resolve('hello world');
//     // if(asyncResp)
//     // dispatch(updateTodayTasks(asyncResp));
//     // dispatch()
//   };

export default taskSlice.reducer;
