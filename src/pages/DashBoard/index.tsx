import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { Avatar, Box, Button, Flex, Section, Text } from '@radix-ui/themes';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import {
  removeEmail,
  removeProfileURL,
  removeToken,
} from '../../util/localStorageFucs';
import {
  CalendarIcon,
  CountdownTimerIcon,
  TokensIcon,
} from '@radix-ui/react-icons';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import TaskPanel from './TaskPanel';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { showTaskPanel } from '../../store/modules/taskSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#495cac',
    },
  },
});

function DashBoard() {
  const navigate = useNavigate();
  const { taskPanelVisible } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
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
                  <RouterLink to={'calender'}>
                    <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                      <CountdownTimerIcon />
                      Calender
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
                <Button size={'3'} onClick={() => dispatch(showTaskPanel())}>
                  Quick Add <AddIcon />
                </Button>
              </Section>
            </div>
          </Box>
          <Flex className='gap-5 ml-[250px] p-5'>
            <div className='flex-1 mt-9'>
              <Outlet />
            </div>
            <div className='w-[500px] h-full desktop:block hidden'></div>
          </Flex>
          {taskPanelVisible && <TaskPanel />}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default DashBoard;
