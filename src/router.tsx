import { createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFoundPage';
import DashBoard from './pages/DashBoard';
import TodayTasks from './pages/DashBoard/TodayTasks';
import ScheduledTasks from './pages/DashBoard/ScheduledTasks';
import PreferencesTasks from './pages/DashBoard/PreferencesTasks';
import Settings from './pages/DashBoard/Settings';
import Login from './pages/Login';
// import { FirebaseAuthService } from './api/firebaseService/auth';

// type AuthRouteProps = {
//   children: ReactNode;
// };

// const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
//   const [user, setUser] = useState(null);

//   FirebaseAuthService.subscribeToAuthChanges(setUser);

//   if (user) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to={'/login'}></Navigate>;
//   }
// };

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <AuthRoute>
      <DashBoard />
      // </AuthRoute>
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
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
