import { Link, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import {
  removeEmail,
  removeProfileURL,
  removeToken,
} from '../../util/localStorageFucs';

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
    <div className='bg-formColor-text-filled'>
      <Link to={'/'}>today tasks</Link>
      <Link to={'scheduled-tasks'}>scheduled tasks</Link>
      <Link to={'preferences-tasks'}>preferences tasks</Link>
      <Link to={'settings'}>settings</Link>
      <Button onClick={handleLogout}>Log out</Button>
      <Outlet />
    </div>
  );
}

export default DashBoard;
