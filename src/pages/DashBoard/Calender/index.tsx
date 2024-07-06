import React from 'react';
import ToDoCalender from './ToDoCalender';

import ConstructionMask from '../../../components/ConstructionMask';

function Calender() {
  return (
    <div className='relative z-0 pointer-events-none'>
      <ConstructionMask />
      <ToDoCalender />
    </div>
  );
}

export default Calender;
