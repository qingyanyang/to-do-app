import { Navigate, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFoundPage';
import DashBoard from './pages/DashBoard';
import TodayTasks from './pages/DashBoard/TodayTasks';
import ScheduledTasks from './pages/DashBoard/ScheduledTasks';
import PreferencesTasks from './pages/DashBoard/PreferencesTasks';
import Settings from './pages/DashBoard/Settings';
import Login from './pages/Login';
import { ReactNode } from 'react';
import { getToken } from './util/localStorageFucs';

type AuthRouteProps = {
  children: ReactNode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  // automatically login
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'}></Navigate>;
  }
};

const ContentRoute: React.FC<AuthRouteProps> = ({ children }) => {
  // automatically login
  const token = getToken();
  if (token) {
    return <Navigate to={'/'}></Navigate>;
  } else {
    return <>{children}</>;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <DashBoard />
      </AuthRoute>
    ),
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
    element: (
      <ContentRoute>
        <Login />
      </ContentRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
