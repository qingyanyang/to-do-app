import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { BlendingModeIcon, Cross2Icon } from '@radix-ui/react-icons';
import {
  Box,
  Card,
  Heading,
  IconButton,
  ScrollArea,
  TextArea,
  Text,
  RadioCards,
  Flex,
  Button,
  Spinner,
  AlertDialog,
} from '@radix-ui/themes';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createTaskAsync,
  hideTaskPanel,
  editTaskAsync,
} from '../../../store/modules/taskSlice';
import {
  validateDateTimeRange,
  validateTaskDesc,
} from '../../../util/validations';
import MyBadge from '../../../components/MyBadge';

export type SeverityLevel = 'Low' | 'Moderate' | 'Critical' | 'Urgent';

export const labels = [
  { name: 'study', color: 'indigo', index: 0 },
  { name: 'work', color: 'cyan', index: 1 },
  { name: 'health', color: 'orange', index: 2 },
  { name: 'dating', color: 'crimson', index: 3 },
  { name: 'entertainment', color: 'yellow', index: 4 },
];

const mapLabelToIndex = (searchName: string): number => {
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
const severitysArr = Object.entries(severitys).map(([name, amount]) => ({
  name,
  amount,
}));

export const renderIcons = (amount: number) => {
  return Array.from({ length: amount }, (_, index) => (
    <BlendingModeIcon key={index} />
  ));
};

const TaskPanel = () => {
  // Get today's date
  const today = dayjs();
  // Calculate the max date as 7 days from today
  const maxDate = today.add(7, 'day');

  const dispatch = useAppDispatch();
  const { loading, editTaskContent } = useAppSelector((state) => state.task);

  const [desc, setDesc] = useState('');
  const [counter, setCounter] = useState(0);
  const [startScheduleTime, setStartScheduleTime] = useState(today);
  const [endScheduleTime, setEndScheduleTime] = useState(today);
  const [startScheduleDate, setStartScheduleDate] = useState(today);
  const [endScheduleDate, setEndScheduleDate] = useState(today);
  const [selectedSeverityValue, setSelectedSeverityValue] = useState('Low');
  const [selectedLabelValue, setSelectedLabelValue] = useState<number>(0);
  const [descErrorMsg, setDescErrorMsg] = useState('');
  const [timeErrorMsg, setTimeErrorMsg] = useState('');
  const [dateErrorMsg, setDateErrorMsg] = useState('');
  const [timeExpired, setTimeExpired] = useState(false);

  const onSuccess = () => {
    setDesc('');
    setCounter(0);
    setStartScheduleTime(today);
    setEndScheduleTime(today);
    setStartScheduleDate(today);
    setEndScheduleDate(today);
    setSelectedSeverityValue('Low');
    setSelectedLabelValue(0);
  };

  const handleCreateTask = () => {
    // console.log(desc);
    // console.log(startScheduleTime);
    // console.log(endScheduleTime);
    // console.log(startScheduleDate);
    // console.log(endScheduleDate);
    // console.log(selectedSeverityValue);
    // console.log(labels[selectedLabelValue].name);

    const newDescErrorMsg = validateTaskDesc(desc);
    setDescErrorMsg(newDescErrorMsg);

    if (newDescErrorMsg === '' && timeErrorMsg === '' && dateErrorMsg === '') {
      const checkExpire = validateDateTimeRange(
        startScheduleDate,
        startScheduleTime,
      );
      setTimeExpired(checkExpire);

      if (!checkExpire) {
        dispatch(
          createTaskAsync(
            {
              taskId: '',
              desc: desc,
              label: labels[selectedLabelValue].name,
              severity: selectedSeverityValue,
              scheduledStartTime: startScheduleTime.toDate(),
              scheduledEndTime: endScheduleTime.toDate(),
              scheduledStartDate: startScheduleDate.toDate(),
              scheduledEndDate: endScheduleDate.toDate(),
            },
            onSuccess,
          ),
        );
      }
    }
  };

  const handleEditTask = () => {
    // console.log(desc);
    // console.log(startScheduleTime);
    // console.log(endScheduleTime);
    // console.log(selectedSeverityValue);
    // console.log(labels[selectedLabelValue].name);

    const newDescErrorMsg = validateTaskDesc(desc);
    setDescErrorMsg(newDescErrorMsg);

    if (newDescErrorMsg === '' && timeErrorMsg === '') {
      dispatch(
        editTaskAsync(
          editTaskContent!.taskId,
          {
            desc: desc,
            label: labels[selectedLabelValue].name,
            severity: selectedSeverityValue,
            scheduledStartTime: startScheduleTime.toDate(),
            scheduledEndTime: endScheduleTime.toDate(),
          },
          new Date(),
          () => dispatch(hideTaskPanel()),
        ),
      );
    }
  };

  const handleDescValidation = () => {
    const errorMsg = validateTaskDesc(desc);
    setDescErrorMsg(errorMsg);
  };

  const hanldeInputTimeRangeError = () => {
    setTimeErrorMsg('Time selected in invalid range');
  };

  const hanldeInputDateRangeError = (error: string[]) => {
    if (error[0] === 'invalidRange' || error[1] === 'invalidRange') {
      setDateErrorMsg('Date selected in invalid range');
    }
    if (
      error[0] === 'minDate' ||
      error[1] === 'minDate' ||
      error[0] === 'maxDate' ||
      error[1] === 'maxDate'
    ) {
      setDateErrorMsg(
        'Date should start from today and cannot over 7 days from today.',
      );
    }
  };

  const handleTextAreaOnChange = () => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const descContent = e.target.value;
      setDesc(descContent);
      setCounter(descContent.length);
    };
  };

  const getTimeRangeValue = () => {
    return (value: any, context: any) => {
      setStartScheduleTime(value[0]);
      setEndScheduleTime(value[1]);
      if (
        context.validationError &&
        !context.validationError[0] &&
        !context.validationError[1]
      ) {
        setTimeErrorMsg('');
      } else {
        hanldeInputTimeRangeError();
      }
    };
  };

  const getDateRangeValue = () => {
    return (value: any, context: any) => {
      setStartScheduleDate(dayjs(value[0]));
      setEndScheduleDate(dayjs(value[1]));
      if (
        context.validationError &&
        !context.validationError[0] &&
        !context.validationError[1]
      ) {
        setDateErrorMsg('');
      } else {
        hanldeInputDateRangeError(context.validationError);
      }
    };
  };

  const handleSeverityChange = (value: string) => {
    setSelectedSeverityValue(value);
  };

  const handleLabelClick = (index: number) => {
    setSelectedLabelValue(index);
  };

  useEffect(() => {
    if (editTaskContent) {
      setDesc(editTaskContent.desc);
      setCounter(editTaskContent.desc.length);
      setStartScheduleTime(dayjs(editTaskContent.scheduledStartTime));
      setEndScheduleTime(dayjs(editTaskContent.scheduledEndTime));
      setSelectedSeverityValue(editTaskContent.severity);
      setSelectedLabelValue(mapLabelToIndex(editTaskContent.label));
    } else {
      onSuccess();
    }
  }, [editTaskContent]);

  return (
    <div className='w-screen h-full fixed top-0 desktop:relative'>
      <div className='desktop:hidden block w-full h-full backdrop-blur-sm absolute'></div>
      <div className='bg-[#111113] bg-opacity-50 desktop:bg-transparent m-auto z-50 w-screen mMobile:w-[500px] h-auto desktop:fixed desktop:right-4 desktop:top-3 rounded-[12px] mt-10 shadow-black shadow-lg'>
        <Card>
          <div className='flex justify-end'>
            <IconButton>
              <Cross2Icon onClick={() => dispatch(hideTaskPanel())} />
            </IconButton>
          </div>
          <ScrollArea
            type='hover'
            scrollbars='vertical'
            style={{ maxHeight: 630 }}
          >
            <div className='flex flex-col gap-8 pt-2 pb-12 px-4'>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Task Description *</Heading>
                <Box>
                  <TextArea
                    onBlur={handleDescValidation}
                    value={desc}
                    onChange={handleTextAreaOnChange()}
                    size='3'
                    placeholder='Enter task description…'
                    maxLength={200}
                  />
                </Box>
                <div className='flex gap-4 justify-between'>
                  <Text color={counter >= 200 ? 'indigo' : 'gray'} size='2'>
                    {counter}
                    /200
                  </Text>
                  {descErrorMsg && (
                    <Text color='red' size='2'>
                      {descErrorMsg}
                    </Text>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Time Schedule</Heading>
                <SingleInputTimeRangeField
                  sx={{
                    input: { color: '#7f838b', borderColor: 'white' },
                  }}
                  variant={'standard'}
                  value={[startScheduleTime, endScheduleTime]}
                  onChange={getTimeRangeValue()}
                />
                {timeErrorMsg ? (
                  <Text color='red' size='2'>
                    {timeErrorMsg}
                  </Text>
                ) : (
                  <Box height='16px'></Box>
                )}
              </div>
              {!editTaskContent && (
                <div className='flex flex-col gap-2'>
                  <Heading size='3'>Date Schedule *</Heading>
                  <SingleInputDateRangeField
                    sx={{
                      input: { color: '#7f838b', borderColor: 'white' },
                    }}
                    variant={'standard'}
                    value={[startScheduleDate, endScheduleDate]}
                    minDate={today}
                    maxDate={maxDate}
                    onChange={getDateRangeValue()}
                  />
                  {dateErrorMsg ? (
                    <Text color='red' size='2'>
                      {dateErrorMsg}
                    </Text>
                  ) : (
                    <Box height='16px'></Box>
                  )}
                </div>
              )}
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Severity *</Heading>
                <RadioCards.Root
                  defaultValue='Low'
                  value={selectedSeverityValue}
                  onValueChange={handleSeverityChange}
                  columns={{ initial: '1', sm: '4' }}
                >
                  {severitysArr.map((severity) => (
                    <RadioCards.Item key={severity.name} value={severity.name}>
                      <Flex
                        direction='column'
                        align='center'
                        width='100%'
                        gapY={'1'}
                      >
                        <Text>{severity.name}</Text>
                        <Flex>{renderIcons(severity.amount)}</Flex>
                      </Flex>
                    </RadioCards.Item>
                  ))}
                </RadioCards.Root>
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Labels *</Heading>
                <Flex wrap='wrap' gapX={'2'} gapY={'2'}>
                  {labels.map((label) => (
                    <MyBadge
                      label={label.name}
                      key={label.index}
                      onClick={() => handleLabelClick(label.index)}
                      variant={
                        selectedLabelValue === label.index ? 'solid' : 'outline'
                      }
                      size={'3'}
                    >
                      <div> {label.name}</div>
                    </MyBadge>
                  ))}
                </Flex>
              </div>
              <div>
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    {editTaskContent ? (
                      <Button
                        variant='classic'
                        size='2'
                        onClick={handleEditTask}
                      >
                        <Spinner loading={loading.editTaskContentLoading}>
                          &nbsp;&nbsp;&nbsp;Save Task&nbsp;&nbsp;&nbsp;
                        </Spinner>
                      </Button>
                    ) : (
                      <Button
                        variant='classic'
                        size='2'
                        onClick={handleCreateTask}
                      >
                        <Spinner loading={loading.createTaskLoading}>
                          &nbsp;&nbsp;&nbsp;Create Task&nbsp;&nbsp;&nbsp;
                        </Spinner>
                      </Button>
                    )}
                  </AlertDialog.Trigger>
                  {timeExpired && (
                    <AlertDialog.Content maxWidth='450px'>
                      <AlertDialog.Title>Time expired</AlertDialog.Title>
                      <AlertDialog.Description size='2'>
                        the scheduled start time is out of date, please reset.
                      </AlertDialog.Description>
                      <Flex gap='3' mt='4' justify='end'>
                        <AlertDialog.Cancel>
                          <Button variant='soft' color='red'>
                            OK
                          </Button>
                        </AlertDialog.Cancel>
                      </Flex>
                    </AlertDialog.Content>
                  )}
                </AlertDialog.Root>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default TaskPanel;
