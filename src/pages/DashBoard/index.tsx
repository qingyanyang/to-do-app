import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  RadioCards,
  Section,
  Text,
  TextArea,
  Badge,
  IconButton,
  RadioGroup,
  Switch,
  ScrollArea,
} from '@radix-ui/themes';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import {
  removeEmail,
  removeProfileURL,
  removeToken,
} from '../../util/localStorageFucs';
import {
  BlendingModeIcon,
  CalendarIcon,
  CountdownTimerIcon,
  Cross2Icon,
  StarIcon,
  TokensIcon,
} from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

const date1 = dayjs('2024-06-29T00:00');
const date2 = dayjs('2024-06-29T00:00');

const theme = createTheme({
  palette: {
    primary: {
      main: '#495cac',
    },
  },
});

function DashBoard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('logout');
    try {
      await FirebaseAuthService.logoutUser();
      // clear storage
      removeEmail();
      removeToken();
      removeProfileURL();
      //redirect
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className='h-screen relative'>
          <Box className='w-[250px] h-[800px] border-r-[1px] px-4 fixed border-neutral'>
            <div>
              <Section className='flex flex-col items-center gap-4'>
                <Avatar
                  size='6'
                  radius='full'
                  src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
                  fallback='A'
                />
                <Text className='font-semibold text-2xl'>qingyan</Text>
                <Button variant='surface' size='2' onClick={handleLogout}>
                  &nbsp;&nbsp;&nbsp;Log out &nbsp;&nbsp;&nbsp;
                </Button>
              </Section>

              <div className='border-l-[0.5px] flex flex-col border-neutral'>
                <div className='border-l-2 border-x-brand px-4 py-4  rounded-r-lg'>
                  <RouterLink to={'/'}>
                    <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                      <CalendarIcon />
                      Today's
                    </div>
                  </RouterLink>
                </div>
                <div className='border-l-2 border-brand px-4 py-4'>
                  <RouterLink to={'weekly-tasks'}>
                    <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                      <CountdownTimerIcon />
                      Weekly Plan
                    </div>
                  </RouterLink>
                </div>
                <div className='border-l-2 border-x-brand px-4 py-4'>
                  <RouterLink to={'preferences-tasks'}>
                    <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                      <StarIcon />
                      Preferences
                    </div>
                  </RouterLink>
                </div>
                <div className='border-l-2 border-x-brand px-4 py-4'>
                  <RouterLink to={'settings'}>
                    <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                      <TokensIcon />
                      Settings
                    </div>
                  </RouterLink>
                </div>
              </div>

              <Section className='flex flex-col'>
                <Button size={'3'}>
                  Quick Add <AddIcon />
                </Button>
              </Section>
            </div>
          </Box>
          <Flex className='gap-5 ml-[250px] p-5'>
            <div className='flex-1 mt-9'>
              <Outlet />
            </div>
            <div className='w-[500px] h-full desktop:block hidden mt-9'></div>
          </Flex>
          <div className='hidden w-[500px] h-auto desktop:block desktop:fixed desktop:right-4 desktop:top-4 rounded-lg mt-9 shadow-black shadow-lg'>
            <Card>
              <ScrollArea
                type='hover'
                scrollbars='vertical'
                style={{ maxHeight: 630 }}
              >
                <div className='flex flex-col gap-8 pt-2 pb-6 px-4'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-end'>
                      <IconButton>
                        <Cross2Icon />
                      </IconButton>
                    </div>
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
                        input: { color: 'gray', borderColor: 'white' },
                      }}
                      variant={'standard'}
                      defaultValue={[date1, date2]}
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Heading size='3'>Severity</Heading>
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
                    <Heading size='3'>Labels</Heading>
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
                  <div className='flex flex-col gap-2'>
                    <Heading size='3'>Frequency</Heading>
                    <RadioGroup.Root defaultValue='2'>
                      <RadioGroup.Item value='1'>
                        <Text color='gray'> Only for today</Text>
                      </RadioGroup.Item>
                      <RadioGroup.Item value='2'>
                        <Text color='gray'> For next workdays of the week</Text>
                      </RadioGroup.Item>
                      <RadioGroup.Item value='3'>
                        <Text color='gray'> For every Monday</Text>
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Heading size='3'>Preference</Heading>
                    <div className='flex gap-4 items-center'>
                      <Switch defaultChecked />
                      <Text color='gray'> Save to preference</Text>
                    </div>
                  </div>
                  <div className=''>
                    <Button variant='classic' size='2' onClick={handleLogout}>
                      &nbsp;&nbsp;&nbsp;Create Task&nbsp;&nbsp;&nbsp;
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </div>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default DashBoard;
