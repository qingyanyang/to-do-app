import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Section,
  Text,
} from '@radix-ui/themes';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import {
  removeEmail,
  removeProfileURL,
  removeToken,
} from '../../util/localStorageFucs';
import {
  CalendarIcon,
  CountdownTimerIcon,
  StarIcon,
  TokensIcon,
} from '@radix-ui/react-icons';

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
    <Box className='h-screen'>
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
              <RouterLink to={'scheduled-tasks'}>
                <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                  <CountdownTimerIcon />
                  Scheduled
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
      <Flex className='gap-5 ml-[250px] p-5 '>
        <div className='flex-1 mt-9'>
          <Outlet />
        </div>
        <div className='w-[500px] desktop:block hidden mt-9'>
          <Card>task content</Card>
        </div>
      </Flex>
    </Box>
  );
}

export default DashBoard;
