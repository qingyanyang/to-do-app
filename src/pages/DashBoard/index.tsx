import { Link, Outlet } from 'react-router-dom';
import React from 'react';

function DashBoard() {
  return (
    <div className='bg-formColor-text-filled'>
      <Link to={'/'}>today tasks</Link>
      <Link to={'scheduled-tasks'}>scheduled tasks</Link>
      <Link to={'preferences-tasks'}>preferences tasks</Link>
      <Link to={'settings'}>settings</Link>
      <Outlet />
    </div>
  );
}

export default DashBoard;
