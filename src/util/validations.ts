import dayjs, { Dayjs } from 'dayjs';

export const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    return 'Email is invalid';
  }
  return '';
};

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  } else if (value.length < 6) {
    return 'Password must be at least 6 characters';
  } else if (!/\d/.test(value)) {
    return 'Password must contain at least one number';
  } else if (!/[a-zA-Z]/.test(value)) {
    return 'Password must contain at least one letter';
  }
  return '';
};

export const validateConfirmPassword = (
  firstPassword: string,
  secondPassword: string,
) => {
  if (!secondPassword) {
    return 'Confirm password is required';
  } else if (secondPassword !== firstPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateTaskDesc = (value: string) => {
  if (!value) {
    return 'Task description is required';
  }
  return '';
};

export const validateDateTimeRange = (
  startScheduleDate: Dayjs,
  startScheduleTime: Dayjs,
): boolean => {
  const startDateTime = startScheduleDate
    .hour(startScheduleTime.hour())
    .minute(startScheduleTime.minute())
    .second(startScheduleTime.second())
    .startOf('minute');

  // Get the current date and time, rounded to the start of the minute
  const now = dayjs().startOf('minute');

  // Check if the selected datetime is before the current datetime
  const isExpired = startDateTime.isBefore(now);

  return isExpired;
};
