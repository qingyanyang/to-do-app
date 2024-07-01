import React from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, ConfigProvider, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import { Card, Flex, IconButton, Popover, ScrollArea } from '@radix-ui/themes';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { useAppDispatch } from '../../../store/hooks';
import { showTaskPanel } from '../../../store/modules/taskSlice';

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ToDoCalender: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const dispatch = useAppDispatch();

    const handleTaskCardClick = () => {
      // show panel
      dispatch(showTaskPanel());
    };

    const listData = getListData(value);
    return (
      <Popover.Root>
        <Popover.Trigger>
          <ul className='events'>
            {listData.slice(0, 2).map((item) => (
              <li key={item.content}>
                <Badge
                  status={item.type as BadgeProps['status']}
                  text={item.content}
                />
              </li>
            ))}
          </ul>
        </Popover.Trigger>
        <Popover.Content size='1' maxWidth='300px'>
          <ScrollArea
            type='hover'
            scrollbars='vertical'
            style={{ maxHeight: 300 }}
          >
            <ul className='events flex flex-col gap-1'>
              {listData.map((item) => (
                <Card>
                  <Flex align={'center'} justify={'between'} gap='1'>
                    <li key={item.content}>
                      <Badge
                        status={item.type as BadgeProps['status']}
                        text={item.content}
                      />
                    </li>
                    <Flex gap='2'>
                      <IconButton
                        variant='soft'
                        size={'1'}
                        onClick={handleTaskCardClick}
                      >
                        <Pencil1Icon />
                      </IconButton>
                      <IconButton variant='outline' size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </ul>
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          // Seed Token
          colorPrimary: '#495cac',
          borderRadius: 8,
          colorBorder: '#494d53',
          colorBorderSecondary: '#494d53',
          colorTextQuaternary: '#494d53',
          colorBgContainer: '#111113',
          colorBgBase: '#18191b',
        },
      }}
    >
      <Calendar
        cellRender={cellRender}
        onSelect={(date, { source }) => {
          console.log(date);

          if (source === 'date') {
            console.log('Panel Select:', source);
          }
        }}
      />
    </ConfigProvider>
  );
};

export default ToDoCalender;
