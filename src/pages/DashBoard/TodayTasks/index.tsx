import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import {
  Progress,
  Text,
  Box,
  Button,
  Callout,
  Link,
  Select,
  TextField,
  Card,
  Flex,
  Checkbox,
  ScrollArea,
  IconButton,
  Spinner,
} from '@radix-ui/themes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import {
  ActivityLogIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getTodayTasksAsync,
  showTaskPanel,
  getTodaySearchResultTasks,
  editTaskAsync,
  daleteTaskByTaskIdAsync,
} from '../../../store/modules/taskSlice';
import { useEffect, useState } from 'react';
import MyBadge from '../../../components/MyBadge';
import { renderIcons } from '../TaskPanel';
import {
  severitys,
  type SeverityLevel,
  type SearchMethod,
  Task,
} from '../../../util/constants';

function TodayTasks() {
  dayjs.extend(LocalizedFormat);
  const formattedDate = dayjs().format('LL');

  const dispatch = useAppDispatch();
  const { loading, todayTasks, todayTasksComplete, todaySearchResultTasks } =
    useAppSelector((state) => state.task);

  const [selectedLevel, setSelectedLevel] = useState<null | string>(null);
  const [selectedLabel, setSelectedLabel] = useState<null | string>(null);
  const [selectedCompletence, setSelectedCompletence] = useState<null | string>(
    null,
  );
  const [selectedSortWay, setSelectedSortWay] = useState(
    'scheduledStartTime&&true',
  );
  const [searchContent, setSearchContent] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [taskClicked, setTaskClicked] = useState('');

  const getSearchedFormat = (
    newContent: string,
    selectedLevel: string | null,
    selectedLabel: string | null,
    selectedCompletence: string | null,
    selectedSortWay: string,
  ) => {
    const sortWayCombination = selectedSortWay.split('&&');
    return {
      searchedName: newContent,
      filterMethod: {
        severity: selectedLevel === 'all' ? null : selectedLevel,
        label: selectedLabel === 'all' ? null : selectedLabel,
        isCompleted:
          selectedCompletence === 'true'
            ? true
            : selectedCompletence === 'false'
              ? false
              : null,
      },
      sortMethod: {
        way: sortWayCombination[0],
        atz: sortWayCombination[1] === 'true' ? true : false,
      },
    };
  };

  const handleSearchContentChange = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newContent = e.target.value;
      if (newContent !== '') {
        setIsSearch(true);
        setSearchContent(newContent);
        const formatedSearchContent = getSearchedFormat(
          newContent,
          selectedLevel,
          selectedLabel,
          selectedCompletence,
          selectedSortWay,
        );
        dispatch(
          getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
        );
      } else {
        setIsSearch(false);
        setSearchContent(newContent);
      }
    };
  };

  const handleLevelChange = () => {
    return (value: string) => {
      setIsSearch(true);

      setSelectedLevel(value ? value : null);
      const formatedSearchContent = getSearchedFormat(
        searchContent,
        value,
        selectedLabel,
        selectedCompletence,
        selectedSortWay,
      );
      dispatch(
        getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
      );
    };
  };

  const handleLabelChange = () => {
    return (value: string) => {
      setIsSearch(true);

      setSelectedLabel(value ? value : null);
      const formatedSearchContent = getSearchedFormat(
        searchContent,
        selectedLevel,
        value,
        selectedCompletence,
        selectedSortWay,
      );
      dispatch(
        getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
      );
    };
  };

  const handleCompletenceChange = () => {
    return (value: string) => {
      setIsSearch(true);

      setSelectedCompletence(value ? value : null);
      const formatedSearchContent = getSearchedFormat(
        searchContent,
        selectedLevel,
        selectedLabel,
        value,
        selectedSortWay,
      );
      dispatch(
        getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
      );
    };
  };

  const handleSelectedSortWayChange = () => {
    return (value: string) => {
      setIsSearch(true);

      setSelectedSortWay(value);
      const formatedSearchContent = getSearchedFormat(
        searchContent,
        selectedLevel,
        selectedLabel,
        selectedCompletence,
        value,
      );
      dispatch(
        getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
      );
    };
  };

  const onEditSuccess = () => {
    if (isSearch) {
      const formatedSearchContent = getSearchedFormat(
        searchContent,
        selectedLevel,
        selectedLabel,
        selectedCompletence,
        selectedSortWay,
      );
      dispatch(
        getTodaySearchResultTasks(formatedSearchContent as SearchMethod),
      );
    }
  };

  const handleTaskCardClick = (taskId: string, isCompleted: boolean) => {
    return () => {
      const isTaskCompeleted = !isCompleted;
      setTaskClicked(taskId);
      dispatch(
        editTaskAsync(taskId, { isCompleted: isTaskCompeleted }, new Date()),
      );
    };
  };

  const handleTaskEditClick = (task: Task) => {
    return () => {
      dispatch(showTaskPanel(task));
    };
  };

  const handleTaskDeleteClick = (taskId: string) => {
    return () => {
      setTaskClicked(taskId);
      dispatch(daleteTaskByTaskIdAsync(taskId, new Date()));
    };
  };

  useEffect(() => {
    // get tasks
    if (todayTasks.length === 0) {
      dispatch(getTodayTasksAsync());
    }
  }, []);

  useEffect(() => {
    // reload
    onEditSuccess();
  }, [todayTasks]);

  return (
    <div className='flex flex-col justify-start gap-9'>
      <div className='flex flex-col tablet:flex-row gap-4 items-baseline justify-between'>
        <Text className='font-semibold text-4xl'>{formattedDate}</Text>
        {todayTasks && todayTasks.length > 0 && (
          <div className='flex gap-4 items-center'>
            <Text size='2' color='gray'>
              {todayTasksComplete.completedNum} of {todayTasksComplete.total}{' '}
              Completed
            </Text>
            <Box width={'200px'}>
              <Progress
                size='3'
                value={
                  (todayTasksComplete.completedNum / todayTasksComplete.total) *
                  100
                }
              />
            </Box>
          </div>
        )}
      </div>
      <Callout.Root variant='surface' size='3'>
        <Callout.Icon>
          <WavingHandIcon />
        </Callout.Icon>
        <Callout.Text size='3'>
          Welcome to
          <Link href='#'>
            <Text className='font-semibold'> To Do List </Text>
          </Link>
          ~~ Start to plan from today !
        </Callout.Text>
      </Callout.Root>
      <div className='flex flex-col gap-8 h-full'>
        {todayTasks && todayTasks.length > 0 && (
          <div className='flex flex-col gap-4'>
            <Text className='text-xl font-semibold'>Today's Tasks</Text>
            <div className='flex flex-col justify-between gap-3 items-start tablet:flex-row tablet:items-center'>
              <div className='flex-1 w-full'>
                <TextField.Root
                  placeholder='Search task'
                  radius='large'
                  value={searchContent}
                  onChange={handleSearchContentChange()}
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height='16' width='16' />
                  </TextField.Slot>
                </TextField.Root>
              </div>
              <div className='flex items-center gap-3 flex-wrap'>
                <Select.Root
                  value={selectedLevel ? selectedLevel : ''}
                  onValueChange={handleLevelChange()}
                >
                  <Select.Trigger placeholder='severity' />
                  <Select.Content position='popper'>
                    <Select.Item value='all'>all</Select.Item>
                    <Select.Item value='Low'>low</Select.Item>
                    <Select.Item value='Moderate'>moderate</Select.Item>
                    <Select.Item value='Critical'>critical</Select.Item>
                    <Select.Item value='Urgent'>urgent</Select.Item>
                  </Select.Content>
                </Select.Root>
                <Select.Root
                  value={selectedLabel ? selectedLabel : ''}
                  onValueChange={handleLabelChange()}
                >
                  <Select.Trigger placeholder='label' />
                  <Select.Content position='popper'>
                    <Select.Item value='all'>all</Select.Item>
                    <Select.Item value='study'>study</Select.Item>
                    <Select.Item value='work'>work</Select.Item>
                    <Select.Item value='health'>health</Select.Item>
                    <Select.Item value='dating'>dating</Select.Item>
                    <Select.Item value='entertainment'>
                      entertainment
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
                <Select.Root
                  value={selectedCompletence ? selectedCompletence : ''}
                  onValueChange={handleCompletenceChange()}
                >
                  <Select.Trigger placeholder='completence' />
                  <Select.Content position='popper'>
                    <Select.Item value='all'>all</Select.Item>
                    <Select.Item value='true'>done</Select.Item>
                    <Select.Item value='false'>unfinish</Select.Item>
                  </Select.Content>
                </Select.Root>
                <Select.Root
                  value={selectedSortWay ? selectedSortWay : ''}
                  onValueChange={handleSelectedSortWayChange()}
                >
                  <Select.Trigger placeholder='sort way' />
                  <Select.Content position='popper'>
                    <Select.Item value='scheduledStartTime&&true'>
                      start time ascending
                    </Select.Item>
                    <Select.Item value='scheduledStartTime&&false'>
                      start time descending
                    </Select.Item>
                    <Select.Item value='totalTimeUse&&true'>
                      time range ascending
                    </Select.Item>
                    <Select.Item value='totalTimeUse&&false'>
                      time range descending
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <Spinner loading={loading.getTaskLoading}>
              <div>
                <Text
                  color='gray'
                  size='1'
                  className='flex items-center gap-2 mt-4'
                >
                  <ActivityLogIcon />
                  {isSearch ? todaySearchResultTasks.length : todayTasks.length}
                  &nbsp;Tasks
                </Text>
              </div>
              <ScrollArea
                type='hover'
                scrollbars='vertical'
                className='max-h-[280px]'
              >
                <div className='flex flex-col gap-3'>
                  {(isSearch ? todaySearchResultTasks : todayTasks).map(
                    (task) => (
                      <Card
                        key={task.taskId}
                        variant='classic'
                        className='hover:border-brand border border-transparent'
                      >
                        <div className='flex flex-col justify-between tablet:flex-row tablet:items-center gap-4'>
                          <div className='flex gap-4 items-center justify-between'>
                            <div className='flex gap-4 items-center'>
                              <Spinner
                                loading={
                                  taskClicked === task.taskId
                                    ? loading.editTaskLoading
                                    : false
                                }
                              >
                                <Checkbox
                                  size={'3'}
                                  checked={task.isCompleted}
                                  onClick={handleTaskCardClick(
                                    task.taskId ? task.taskId : '',
                                    task.isCompleted ? task.isCompleted : false,
                                  )}
                                />
                              </Spinner>

                              <div className='flex flex-col'>
                                <Text
                                  as='div'
                                  size='3'
                                  weight='bold'
                                  className={`${task.isCompleted && 'text-brand line-through'} short-text-ellipsis`}
                                >
                                  {task.desc}
                                </Text>
                                <Text
                                  className='flex gap-2'
                                  as='div'
                                  color='gray'
                                  size='2'
                                >
                                  {dayjs(task.scheduledStartTime).format('LT')}-
                                  {dayjs(task.scheduledEndTime).format('LT')}
                                </Text>
                              </div>
                            </div>
                            <div className='flex gap-4 tablet:hidden'>
                              <IconButton
                                variant='soft'
                                size={{ initial: '4', xs: '3' }}
                                onClick={handleTaskEditClick(task)}
                              >
                                <Pencil1Icon />
                              </IconButton>
                              <Spinner
                                loading={
                                  taskClicked === task.taskId
                                    ? loading.deleteTaskLoading
                                    : false
                                }
                              >
                                <IconButton
                                  variant='outline'
                                  size={{ initial: '4', xs: '3' }}
                                  onClick={handleTaskDeleteClick(
                                    task.taskId ? task.taskId : '',
                                  )}
                                >
                                  <Cross2Icon />
                                </IconButton>
                              </Spinner>
                            </div>
                          </div>
                          <div className='flex gap-6 items-center'>
                            <div className='flex gap-2 items-center'>
                              <MyBadge label={task.label} variant={'soft'}>
                                &nbsp;&nbsp;{task.label}&nbsp;&nbsp;
                              </MyBadge>
                              <Text
                                color='indigo'
                                size='1'
                                className='flex items-center gap-1'
                              >
                                <Flex>
                                  {renderIcons(
                                    severitys[task.severity as SeverityLevel],
                                  )}
                                </Flex>
                                {task.severity.toUpperCase()}
                              </Text>
                            </div>
                            <div className=' hidden tablet:flex gap-2'>
                              <IconButton
                                variant='soft'
                                size={{ initial: '4', xs: '2' }}
                                onClick={handleTaskEditClick(task)}
                              >
                                <Pencil1Icon />
                              </IconButton>
                              <Spinner
                                loading={
                                  taskClicked === task.taskId
                                    ? loading.deleteTaskLoading
                                    : false
                                }
                              >
                                <IconButton
                                  variant='outline'
                                  size={{ initial: '4', xs: '2' }}
                                  onClick={handleTaskDeleteClick(task.taskId)}
                                >
                                  <Cross2Icon />
                                </IconButton>
                              </Spinner>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ),
                  )}
                </div>
              </ScrollArea>
              <Link href='#' onClick={() => dispatch(showTaskPanel(null))}>
                <Text className='flex gap-2 items-center mb-20'>
                  <AddCircleIcon />
                  Add Tasks
                </Text>
              </Link>
            </Spinner>
          </div>
        )}
        {todayTasks && todayTasks.length === 0 && !loading.getTaskLoading && (
          <div className='flex flex-col gap-6 justify-center items-center'>
            <img
              src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              alt='empty content'
              className='w-1/2 h-auto'
            />
            <Text color='gray' className='text-2xl'>
              You haven't added any tasks
            </Text>
            <div className='flex justify-center'>
              <div className='rounded-full text-brand border-brand border-dashed border'>
                <Button
                  size='3'
                  variant='soft'
                  onClick={() => dispatch(showTaskPanel(null))}
                >
                  <AddCircleIcon />
                  Add Tasks
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayTasks;
