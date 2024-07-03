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
  Badge,
  Button,
} from '@radix-ui/themes';

import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import {
  createTaskAsync,
  hideTaskPanel,
} from '../../../store/modules/taskSlice';
import { validateTaskDesc } from '../../../util/validations';
import { getUID } from '../../../util/localStorageFucs';

const labels = [
  { name: 'study', Color: 'indigo' },
  { name: 'work', color: 'cyan' },
  { name: 'health', color: 'orange' },
  { name: 'dating', color: 'crimson' },
  { name: 'entertainment', color: 'yellow' },
];

const TaskPanel = () => {
  const [desc, setDesc] = useState('');
  const [counter, setCounter] = useState(0);
  const [startScheduleTime, setStartScheduleTime] = useState(dayjs());
  const [endScheduleTime, setEndScheduleTime] = useState(dayjs());
  const [startScheduleDate, setStartScheduleDate] = useState(dayjs());
  const [endScheduleDate, setEndScheduleDate] = useState(dayjs());
  const [selectedSeverityValue, setSelectedSeverityValue] = useState('Low');
  const [selectedLabelValue, setSelectedLabelValue] = useState(0);
  const [descErrorMsg, setDescErrorMsg] = useState('');

  const dispatch = useAppDispatch();

  const handleCreateTask = () => {
    console.log(desc);
    console.log(startScheduleTime);
    console.log(endScheduleTime);
    console.log(startScheduleDate);
    console.log(endScheduleDate);
    console.log(selectedSeverityValue);
    console.log(labels[selectedLabelValue].name);
    handleDescValidation();
    if (descErrorMsg === '') {
      const uid = getUID();
      if (!uid) {
        throw new Error('Please check the uid');
      }
      dispatch(
        createTaskAsync({
          uid: uid,
          desc: desc,
          label: labels[selectedLabelValue].name,
          severity: selectedSeverityValue,
          scheduledStartTime: startScheduleTime,
          scheduledEndTime: endScheduleTime,
          scheduledStartDate: startScheduleDate,
          scheduledEndDate: endScheduleDate,
          isCompleted: false,
        }),
      );
    }
  };
  const handleDescValidation = () => {
    const errorMsg = validateTaskDesc(desc);
    setDescErrorMsg(errorMsg);
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
      console.log(context);
    };
  };

  const getDateRangeValue = () => {
    return (value: any, context: any) => {
      setStartScheduleDate(dayjs(value[0]));
      setEndScheduleDate(dayjs(value[1]));

      console.log(context);
    };
  };

  const handleSeverityChange = (value: string) => {
    setSelectedSeverityValue(value);
  };

  const handleLabelClick = (index: number) => {
    setSelectedLabelValue(index);
  };

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
                    {counter}/200
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
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Date Schedule *</Heading>
                <SingleInputDateRangeField
                  sx={{
                    input: { color: '#7f838b', borderColor: 'white' },
                  }}
                  variant={'standard'}
                  value={[startScheduleDate, endScheduleDate]}
                  onChange={getDateRangeValue()}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Severity *</Heading>
                <RadioCards.Root
                  defaultValue='Low'
                  value={selectedSeverityValue}
                  onValueChange={handleSeverityChange}
                  columns={{ initial: '1', sm: '4' }}
                >
                  <RadioCards.Item value='Low'>
                    <Flex
                      direction='column'
                      align='center'
                      width='100%'
                      gapY={'1'}
                    >
                      <Text>Low</Text>
                      <Flex>
                        <BlendingModeIcon />
                      </Flex>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value='Moderate'>
                    <Flex
                      direction='column'
                      align='center'
                      width='100%'
                      gapY={'1'}
                    >
                      <Text>Moderate</Text>
                      <Flex>
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                      </Flex>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value='Critical'>
                    <Flex
                      direction='column'
                      align='center'
                      width='100%'
                      gapY={'1'}
                    >
                      <Text>Critical</Text>
                      <Flex>
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                      </Flex>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value='Urgent'>
                    <Flex
                      direction='column'
                      align='center'
                      width='100%'
                      gapY={'1'}
                    >
                      <Text>Urgent</Text>
                      <Flex>
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                        <BlendingModeIcon />
                      </Flex>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Labels *</Heading>
                <Flex wrap='wrap' gapX={'2'} gapY={'2'}>
                  <Badge
                    onClick={() => handleLabelClick(0)}
                    variant={selectedLabelValue === 0 ? 'solid' : 'outline'}
                    color='indigo'
                    size={'3'}
                  >
                    study
                  </Badge>
                  <Badge
                    onClick={() => handleLabelClick(1)}
                    variant={selectedLabelValue === 1 ? 'solid' : 'outline'}
                    color='cyan'
                    size={'3'}
                  >
                    work
                  </Badge>
                  <Badge
                    onClick={() => handleLabelClick(2)}
                    variant={selectedLabelValue === 2 ? 'solid' : 'outline'}
                    color='orange'
                    size={'3'}
                  >
                    health
                  </Badge>
                  <Badge
                    onClick={() => handleLabelClick(3)}
                    variant={selectedLabelValue === 3 ? 'solid' : 'outline'}
                    color='crimson'
                    size={'3'}
                  >
                    dating
                  </Badge>
                  <Badge
                    onClick={() => handleLabelClick(4)}
                    variant={selectedLabelValue === 4 ? 'solid' : 'outline'}
                    color='yellow'
                    size={'3'}
                  >
                    entertainment
                  </Badge>
                </Flex>
              </div>
              <div>
                <Button variant='classic' size='2' onClick={handleCreateTask}>
                  &nbsp;&nbsp;&nbsp;Create Task&nbsp;&nbsp;&nbsp;
                </Button>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default TaskPanel;
