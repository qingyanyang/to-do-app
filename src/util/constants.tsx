import { Timestamp } from 'firebase/firestore';

export type SeverityLevel = 'Low' | 'Moderate' | 'Critical' | 'Urgent';

export interface Task {
  taskId: string;
  desc: string;
  label: string;
  severity: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  scheduledStartDate?: Date;
  scheduledEndDate?: Date;
  isCompleted?: boolean;
  isExpired?: boolean;
}

export interface FirebaseStampTask {
  taskId: string;
  desc: string;
  label: string;
  severity: string;
  scheduledStartTime: Timestamp;
  scheduledEndTime: Timestamp;
  isCompleted: boolean;
  isExpired: boolean;
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

export type LoadingKey =
  | 'getTaskLoading'
  | 'createTaskLoading'
  | 'editTaskLoading'
  | 'deleteTaskLoading'
  | 'editTaskContentLoading';
export interface TaskState {
  taskPanelVisible: boolean;
  todayTasks: Task[];
  todaySearchResultTasks: Task[];
  todayTasksComplete: { total: number; completedNum: number };
  editTaskContent: Task | null;
  loading: {
    getTaskLoading: boolean;
    createTaskLoading: boolean;
    editTaskLoading: boolean;
    deleteTaskLoading: boolean;
    editTaskContentLoading: boolean;
  };
  error: string | null;
  success: string | null;
}

export const labels = [
  { name: 'study', color: 'indigo', index: 0 },
  { name: 'work', color: 'cyan', index: 1 },
  { name: 'health', color: 'orange', index: 2 },
  { name: 'dating', color: 'crimson', index: 3 },
  { name: 'entertainment', color: 'yellow', index: 4 },
];

export const mapLabelToIndex = (searchName: string): number => {
  let resIndex = 0;
  labels.forEach((label) => {
    if (label.name === searchName) {
      resIndex = label.index;
    }
  });
  return resIndex;
};

export const severitys: Record<SeverityLevel, number> = {
  Low: 1,
  Moderate: 2,
  Critical: 3,
  Urgent: 4,
};

export const severitysArr = Object.entries(severitys).map(([name, amount]) => ({
  name,
  amount,
}));

export const errorMSGMapping = (errCode: string) => {
  let errorMessage = '';
  switch (errCode) {
    case 'auth/invalid-credential':
      errorMessage = 'Your email or password is wrong.';
      break;
    case 'auth/insufficient-permission':
      errorMessage = 'Session expired. Please relogin.';
      break;
    case 'auth/id-token-expired':
      errorMessage = 'Session expired. Please relogin.';
      break;
    case 'auth/email-already-exists':
      errorMessage = 'User already exists.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Too many requests. Try again later.';
      break;
    case 'auth/internal-error':
      errorMessage = 'Server is scrashing...';
      break;
    default:
      errorMessage = 'An unknown Error happened.';
  }
  return errorMessage;
};
