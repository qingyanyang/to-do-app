import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Progress, Text, Box, Button, Callout, Link } from '@radix-ui/themes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WavingHandIcon from '@mui/icons-material/WavingHand';

function TodayTasks() {
  dayjs.extend(LocalizedFormat);
  const formattedDate = dayjs().format('LL');
  return (
    <div className='flex flex-col justify-start gap-9'>
      <div className='flex gap-4 items-baseline justify-between'>
        <Text size='8'>{formattedDate}</Text>
        <div className='flex gap-4 items-center'>
          <Text size='2' color='gray'>
            {' '}
            7 of 10 Completed
          </Text>
          <Box width={'200px'}>
            <Progress size='3' value={75} />
          </Box>
        </div>
      </div>
      <Callout.Root variant='surface' size='3'>
        <Callout.Icon>
          <WavingHandIcon />
        </Callout.Icon>
        <Callout.Text size='3'>
          Welcome to <Link href='#'> To do list 1.0.1</Link> ~~ Start to plan
          from today !
        </Callout.Text>
      </Callout.Root>
      <div className='flex flex-col gap-8 h-screen mt-6'>
        <div className='flex flex-col gap-6 justify-center items-center opacity-70'>
          <img
            src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            alt='empty content'
            className='w-1/2 h-auto'
          />
          <Text color='gray' className='text-2xl text-opacity-50'>
            You haven't added any tasks
          </Text>
        </div>
        <div className='flex justify-center'>
          <Button variant='soft' size='4'>
            <AddCircleIcon />
            Add Tasks
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TodayTasks;
