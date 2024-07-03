import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { Avatar, Button, Flex, Section, Text } from '@radix-ui/themes';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import {
  getUserEmail,
  getProfileURL,
  removeUserEmail,
  removeProfileURL,
  removeToken,
  removeUID,
} from '../../util/localStorageFucs';
import MenuIcon from '@mui/icons-material/Menu';
import {
  CalendarIcon,
  CountdownTimerIcon,
  TokensIcon,
} from '@radix-ui/react-icons';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import TaskPanel from './TaskPanel';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { showTaskPanel } from '../../store/modules/taskSlice';

const navMenu = [
  {
    icon: <CountdownTimerIcon />,
    label: "Today's",
    path: '/',
  },
  {
    icon: <CalendarIcon />,
    label: 'Calender',
    path: 'calender',
  },
  {
    icon: <TokensIcon />,
    label: 'Settings',
    path: 'settings',
  },
];

function DashBoard() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [navMenuIndex, setNavMenuIndex] = useState(0); // 0: todays; 1: calender; 2: settings

  const { taskPanelVisible } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleNavMenuSwitch = (index: number) => {
    setNavMenuIndex(index);
  };

  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  const handleLogout = async () => {
    try {
      await FirebaseAuthService.logoutUser();
      // clear storage
      removeUID();
      removeUserEmail();
      removeToken();
      removeProfileURL();
      //redirect
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='h-full w-screen relative'>
        {/* top nav bar */}
        {showNavBar && (
          <div className='backdrop-blur-lg w-full h-full fixed z-10'></div>
        )}
        <div
          className={`block border-b-[1px] border-neutral tablet:hidden w-screen h-[10vh] fixed ${!taskPanelVisible && 'z-20'} backdrop-blur-lg`}
        >
          <div
            className={`${!showNavBar && '-translate-y-[100vh]'} ease-in-out absolute top-[10vh] w-full py-10 px-6 bg-[#111113] backdrop-blur-lg rounded-b-lg`}
          >
            <div className='flex flex-col gap-8'>
              <button onClick={handleShowNavBar}>
                <RouterLink to={'/'}>
                  <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                    <CalendarIcon />
                    Today's
                  </div>
                </RouterLink>
              </button>
              <button onClick={handleShowNavBar}>
                <RouterLink to={'calender'}>
                  <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                    <CountdownTimerIcon />
                    Calender
                  </div>
                </RouterLink>
              </button>
              <button onClick={handleShowNavBar}>
                <RouterLink to={'settings'}>
                  <div className='flex justify-start gap-6 items-center text-disabled hover:text-primary-invert'>
                    <TokensIcon />
                    Settings
                  </div>
                </RouterLink>
              </button>
              <Button variant='surface' size='3' onClick={handleLogout}>
                &nbsp;&nbsp;&nbsp;Log out &nbsp;&nbsp;&nbsp;
              </Button>
            </div>
          </div>
          <div className='flex justify-between items-center w-full h-full px-4'>
            <button onClick={handleShowNavBar}>
              <MenuIcon />
            </button>
            <Section className='flex items-center gap-4'>
              <Avatar
                size='3'
                radius='full'
                src={getProfileURL() ?? undefined}
                fallback='A'
              />
              <Text className='text-l short-label-ellipsis'>
                {getUserEmail()}
              </Text>
            </Section>
          </div>
        </div>
        {/* left nav bar */}
        <div className='border-r-[1px] px-4 border-neutral hidden tablet:block w-[250px] h-full fixed'>
          <div className='flex flex-col gap-20 justify-between h-full'>
            <div className='flex flex-col items-center gap-4 mt-14'>
              <Avatar
                size='6'
                radius='full'
                src={getProfileURL() ?? undefined}
                fallback='A'
              />
              <Text className='font-semibold text-2xl short-text-ellipsis'>
                {getUserEmail()}
              </Text>
              <Button variant='surface' size='2' onClick={handleLogout}>
                &nbsp;&nbsp;&nbsp;Log out &nbsp;&nbsp;&nbsp;
              </Button>
            </div>
            <div className='border-l-[0.5px] flex flex-col border-neutral'>
              {navMenu.map((menuItem, index) => (
                <div
                  key={index}
                  className={`${navMenuIndex === index && ' border-x-brand'} border-l-2 border-transparent px-4 py-4`}
                >
                  <RouterLink
                    to={menuItem.path}
                    onClick={() => handleNavMenuSwitch(index)}
                  >
                    <div
                      className={`text-disabled ${navMenuIndex === index && 'text-primary-invert'} flex justify-start gap-6 items-center  hover:text-primary-invert`}
                    >
                      {menuItem.icon}
                      {menuItem.label}
                    </div>
                  </RouterLink>
                </div>
              ))}
            </div>
            <div className='flex flex-col mb-28'>
              <Button size={'3'} onClick={() => dispatch(showTaskPanel())}>
                Quick Add <AddIcon />
              </Button>
            </div>
          </div>
        </div>
        <Flex className='gap-5 h-full tablet:ml-[250px] p-4 relative top-[80px] tablet:top-0'>
          <div className='flex-1 mt-4 h-full tablet:mt-9'>
            <Outlet />
          </div>
          {taskPanelVisible && (
            <div className='w-[500px] h-full desktop:block hidden'></div>
          )}
        </Flex>
        {taskPanelVisible && <TaskPanel />}
      </div>
    </LocalizationProvider>
  );
}

export default DashBoard;
