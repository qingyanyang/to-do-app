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
import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { hideTaskPanel } from '../../../store/modules/taskSlice';

const TaskPanel = () => {
  const date1 = dayjs('2024-06-29T00:00');
  const date2 = dayjs('2024-06-29T00:00');

  const dispatch = useAppDispatch();

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
            <div className='flex flex-col gap-8 pt-2 pb-6 px-4'>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Task Description *</Heading>
                <Box>
                  <TextArea
                    size='3'
                    placeholder='Enter task description…'
                    maxLength={800}
                  />
                </Box>
                <Text color='gray' size='2'>
                  0/800
                </Text>
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Time Schedule</Heading>
                <SingleInputTimeRangeField
                  sx={{
                    input: { color: '#7f838b', borderColor: 'white' },
                  }}
                  variant={'standard'}
                  defaultValue={[date1, date2]}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Date Schedule *</Heading>
                <SingleInputDateRangeField
                  sx={{
                    input: { color: '#7f838b', borderColor: 'white' },
                  }}
                  variant={'standard'}
                  defaultValue={[date1, date2]}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Heading size='3'>Severity *</Heading>
                <RadioCards.Root
                  defaultValue='1'
                  columns={{ initial: '1', sm: '4' }}
                >
                  <RadioCards.Item value='1'>
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
                  <RadioCards.Item value='2'>
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
                  <RadioCards.Item value='3'>
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
                  <RadioCards.Item value='4'>
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
                  <Badge color='indigo' size={'3'}>
                    study
                  </Badge>
                  <Badge color='cyan' size={'3'}>
                    work
                  </Badge>
                  <Badge color='orange' size={'3'}>
                    health
                  </Badge>
                  <Badge color='crimson' size={'3'}>
                    dating
                  </Badge>
                  <Badge color='yellow' size={'3'}>
                    entertainment
                  </Badge>
                </Flex>
              </div>
              <div>
                <Button variant='classic' size='2' onClick={() => {}}>
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
