import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import NotFound from './pages/NotFoundPage';
import DashBoard from './pages/DashBoard';
import TodayTasks from './pages/DashBoard/TodayTasks';
import ScheduledTasks from './pages/DashBoard/ScheduledTasks';
import PreferencesTasks from './pages/DashBoard/PreferencesTasks';
import Settings from './pages/DashBoard/Settings';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <TodayTasks />,
      },
      {
        path: 'scheduled-tasks',
        element: <ScheduledTasks />,
      },
      {
        path: 'preferences-tasks',
        element: <PreferencesTasks />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
