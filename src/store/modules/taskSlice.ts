import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import type { RootState } from '..';
import dayjs from 'dayjs';
import { FirebaseFirestoreService } from '../../api/firebaseService/db';
import { getUID } from '../../util/localStorageFucs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {
  LoadingKey,
  SearchMethod,
  Task,
  TaskState,
} from '../../util/constants';

const initialState: TaskState = {
  taskPanelVisible: false,
  todayTasks: [],
  todaySearchResultTasks: [],
  todayTasksComplete: { total: 0, completedNum: 0 },
  editTaskContent: null,
  loading: {
    getTaskLoading: false,
    createTaskLoading: false,
    editTaskLoading: false,
    deleteTaskLoading: false,
    editTaskContentLoading: false,
  },
  error: null,
  success: null,
};

// need unit test
const getTimeDifferenceInMinutes = (start: Date, end: Date): number => {
  return (end.getTime() - start.getTime()) / (1000 * 60); // Convert milliseconds to minutes
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    showTaskPanel: (state, action: PayloadAction<Task | null>) => {
      state.taskPanelVisible = true;
      const taskNeededEdit = action.payload;
      if (taskNeededEdit) {
        state.editTaskContent = {
          taskId: taskNeededEdit.taskId,
          desc: taskNeededEdit.desc,
          label: taskNeededEdit.label,
          severity: taskNeededEdit.severity,
          scheduledStartTime: taskNeededEdit.scheduledStartTime,
          scheduledEndTime: taskNeededEdit.scheduledEndTime,
        };
      } else {
        state.editTaskContent = null;
      }
    },
    resetTaskPanelContent: (state) => {
      state.editTaskContent = null;
    },
    hideTaskPanel: (state) => {
      state.taskPanelVisible = false;
      // clear state
      state.editTaskContent = null;
    },
    // get today's tasks list
    updateTodayTasks: (state, action: PayloadAction<Task[]>) => {
      state.todayTasks = action.payload;
    },
    updatedTodaySearchResultTasks: (state, action: PayloadAction<Task[]>) => {
      state.todaySearchResultTasks = action.payload;
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
              comparison =
                a.scheduledStartTime.getTime() - b.scheduledStartTime.getTime();
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
    // loading
    setLoading: (
      state,
      action: PayloadAction<{ attribute: LoadingKey; value: boolean }>,
    ) => {
      const { attribute, value } = action.payload;
      state.loading[attribute] = value;
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
      state.loading = {
        getTaskLoading: false,
        createTaskLoading: false,
        editTaskLoading: false,
        deleteTaskLoading: false,
        editTaskContentLoading: false,
      };
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  showTaskPanel,
  hideTaskPanel,
  updateTodayTasks,
  updatedTodaySearchResultTasks,
  getTodaySearchResultTasks,
  getTodayTasksComplete,
  setLoading,
  setError,
  setSuccess,
  setRevertState,
  resetTaskPanelContent,
} = taskSlice.actions;

export const createTaskAsync =
  (
    document: Task,
    onSuccess?: () => void,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    // Dispatch loading state
    dispatch(setLoading({ attribute: 'createTaskLoading', value: true }));
    dispatch(setError(null));
    dispatch(setSuccess(null));

    const { scheduledStartDate, scheduledEndDate } = document; // Date type
    //  get uid
    const uid = getUID();
    // Convert scheduled start and end dates to JavaScript Date objects
    const startDate = scheduledStartDate ? scheduledStartDate : new Date();
    const endDate = scheduledEndDate ? scheduledEndDate : new Date();

    // check if today is in the range, if it is, need to update today's data or monthly data
    dayjs.extend(isSameOrAfter);
    const isTodayInDuration =
      dayjs().isSameOrAfter(dayjs(scheduledStartDate), 'date') &&
      dayjs(scheduledEndDate)?.isSameOrAfter(dayjs(), 'date');

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
        scheduledStartTime: document.scheduledStartTime,
        scheduledEndTime: document.scheduledEndTime,
      };

      // Add the task to the array of tasks to be created
      tasksToCreate.push({
        firestorePath,
        taskWithTimestamps,
      });
    }

    try {
      // Iterate through the tasks to be created and add them to Firestore
      for (const { firestorePath, taskWithTimestamps } of tasksToCreate) {
        await FirebaseFirestoreService.createDocument(
          firestorePath,
          taskWithTimestamps,
        );
      }
      // Dispatch success state
      dispatch(setLoading({ attribute: 'createTaskLoading', value: false }));
      dispatch(setSuccess('Task created successfully!'));
      if (onSuccess) onSuccess();
      // Additional actions like updating tasks

      if (isTodayInDuration) {
        dispatch(getTodayTasksAsync());
        dispatch(getTodayTasksComplete());
      }
      // Example: await dispatch(getMonthTasksAsync());
    } catch (error) {
      // Dispatch error state
      dispatch(setLoading({ attribute: 'createTaskLoading', value: false }));
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
    dispatch(setLoading({ attribute: 'getTaskLoading', value: true }));
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

      dispatch(setLoading({ attribute: 'getTaskLoading', value: false }));
      // when editing a task, can only edit des,label,servirty,starttime and endtime
      if (dailyTasksForToday) {
        const tasks = dailyTasksForToday.map((dailyTask) => ({
          taskId: dailyTask.id,
          desc: dailyTask.desc,
          label: dailyTask.label,
          severity: dailyTask.severity,
          scheduledStartTime: dailyTask.scheduledStartTime.toDate(),
          scheduledEndTime: dailyTask.scheduledEndTime.toDate(),
          isCompleted: dailyTask.isCompleted,
          isExpired: dailyTask.isExpired,
        }));

        dispatch(updateTodayTasks(tasks));
        dispatch(getTodayTasksComplete());
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      dispatch(setLoading({ attribute: 'getTaskLoading', value: false }));
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(null));
    }
  };

export const editTaskAsync =
  (
    documentName: string,
    document: object,
    date: Date,
    onSuccess?: () => void,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    dispatch(
      setLoading({
        attribute:
          'isCompleted' in document
            ? 'editTaskLoading'
            : 'editTaskContentLoading',
        value: true,
      }),
    );
    dispatch(setError(null));
    dispatch(setSuccess(null));
    try {
      const uid = getUID();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const documentPath = `users/${uid}/tasks/${year}/${month}/${day}/dailyTasks`;

      await FirebaseFirestoreService.editDocumentField(
        documentPath,
        documentName,
        document,
      );

      // change state of today'list
      const { todayTasks, todaySearchResultTasks } = getState().task;
      if (todayTasks.length > 0) {
        let found = false;
        const updatedTodayTasks = todayTasks.map((task) => {
          if (task.taskId === documentName) {
            found = true;
            return {
              ...task,
              ...document,
            };
          } else {
            return task;
          }
        });
        if (found) dispatch(updateTodayTasks(updatedTodayTasks));
      }
      // change state of search'list
      if (todaySearchResultTasks.length > 0) {
        let found = false;
        const updatedSearchResultTasks = todaySearchResultTasks.map((task) => {
          if (task.taskId === documentName) {
            found = true;
            return {
              ...task,
              ...document,
            };
          } else {
            return task;
          }
        });
        if (found)
          dispatch(updatedTodaySearchResultTasks(updatedSearchResultTasks));
      }

      dispatch(getTodayTasksComplete());

      // change state of month'list

      dispatch(
        setLoading({
          attribute:
            'isCompleted' in document
              ? 'editTaskLoading'
              : 'editTaskContentLoading',
          value: false,
        }),
      );
      dispatch(setSuccess('Task edit successfully!'));

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatch(
        setLoading({
          attribute:
            'isCompleted' in document
              ? 'editTaskLoading'
              : 'editTaskContentLoading',
          value: false,
        }),
      );
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(null));
    }
  };

export const daleteTaskByTaskIdAsync =
  (
    documentName: string,
    date: Date,
    onSuccess?: () => void,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    dispatch(
      setLoading({
        attribute: 'deleteTaskLoading',
        value: true,
      }),
    );
    dispatch(setError(null));
    dispatch(setSuccess(null));
    try {
      const uid = getUID();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const documentPath = `users/${uid}/tasks/${year}/${month}/${day}/dailyTasks`;

      await FirebaseFirestoreService.deleteDocumentByDocumentName(
        documentPath,
        documentName,
      );

      // change state of today'list
      const { todayTasks, todaySearchResultTasks, editTaskContent } =
        getState().task;
      // delete content
      if (editTaskContent && editTaskContent.taskId === documentName) {
        dispatch(resetTaskPanelContent());
      }
      if (todayTasks.length > 0) {
        const updatedTodayTasks = todayTasks.filter(
          (task) => task.taskId != documentName,
        );
        dispatch(updateTodayTasks(updatedTodayTasks));
      }
      // change state of search'list
      if (todaySearchResultTasks.length > 0) {
        const updatedSearchResultTasks = todaySearchResultTasks.filter(
          (task) => task.taskId != documentName,
        );
        dispatch(updatedTodaySearchResultTasks(updatedSearchResultTasks));
      }

      dispatch(getTodayTasksComplete());
      // change state of month'list

      dispatch(
        setLoading({
          attribute: 'deleteTaskLoading',
          value: false,
        }),
      );
      dispatch(setSuccess('Task delete successfully!'));

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatch(
        setLoading({
          attribute: 'deleteTaskLoading',
          value: false,
        }),
      );
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error'),
      );
      dispatch(setSuccess(null));
    }
  };

export default taskSlice.reducer;
