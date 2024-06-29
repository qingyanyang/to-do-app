import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import WhatshotIcon from '@mui/icons-material/Whatshot';
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
  Badge,
  ScrollArea,
} from '@radix-ui/themes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { ActivityLogIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

function TodayTasks() {
  dayjs.extend(LocalizedFormat);
  const formattedDate = dayjs().format('LL');
  return (
    <div className='flex flex-col justify-start gap-9'>
      <div className='flex gap-4 items-baseline justify-between'>
        <Text className='font-semibold text-4xl'>{formattedDate}</Text>
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
          Welcome to{' '}
          <Link href='#'>
            {' '}
            <Text className='font-semibold'>To do list 1.0.1</Text>
          </Link>{' '}
          ~~ Start to plan from today !
        </Callout.Text>
      </Callout.Root>
      <div className='flex flex-col gap-8 h-screen'>
        <div className='flex flex-col gap-4'>
          <Text className='text-xl font-semibold'>Today's Tasks</Text>
          <div className='flex gap-3 items-center justify-between'>
            <div className='flex-1'>
              <TextField.Root placeholder='Search task' radius='large'>
                <TextField.Slot>
                  <MagnifyingGlassIcon height='16' width='16' />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div className='flex items-center gap-3'>
              <Select.Root defaultValue='apple'>
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value='apple'>Level</Select.Item>
                  <Select.Item value='orange'>Orange</Select.Item>
                </Select.Content>
              </Select.Root>
              <Select.Root defaultValue='apple'>
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value='apple'>Label</Select.Item>
                  <Select.Item value='orange'>Orange</Select.Item>
                </Select.Content>
              </Select.Root>
              <Select.Root defaultValue='apple'>
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value='apple'>Sort by</Select.Item>
                  <Select.Item value='orange'>Orange</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <div>
            <Text
              color='gray'
              size='1'
              className='flex items-center gap-2 mt-4'
            >
              <ActivityLogIcon /> 5 Tasks
            </Text>
          </div>

          <ScrollArea
            type='hover'
            scrollbars='vertical'
            style={{ maxHeight: 280 }}
          >
            <div className='flex flex-col gap-3'>
              <Box>
                <Card asChild variant='classic'>
                  <a href='#'>
                    <Flex align='center' justify='between' gap='5'>
                      <div className='flex gap-4 items-center'>
                        <Checkbox size='3' defaultChecked />
                        <div className='flex flex-col'>
                          <Text as='div' size='2' weight='bold'>
                            Shopping with Bob ...
                          </Text>
                          <Text
                            className='flex gap-2'
                            as='div'
                            color='gray'
                            size='1'
                          >
                            June 29, 2024 * 2:30pm
                          </Text>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Badge variant='soft' color='yellow'>
                          &nbsp;&nbsp;life&nbsp;&nbsp;
                        </Badge>
                        <Badge variant='soft' color='pink'>
                          &nbsp;&nbsp;entertainment&nbsp;&nbsp;
                        </Badge>
                        <Text
                          color='indigo'
                          size='1'
                          className='flex items-center gap-1'
                        >
                          <span>
                            <WhatshotIcon fontSize='small' />
                            <WhatshotIcon fontSize='small' />
                          </span>
                          URGENT
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              </Box>
              <Box>
                <Card asChild variant='classic'>
                  <a href='#'>
                    <Flex align='center' justify='between' gap='5'>
                      <div className='flex gap-4 items-center'>
                        <Checkbox size='3' defaultChecked />
                        <div className='flex flex-col'>
                          <Text as='div' size='2' weight='bold'>
                            Shopping with Bob ...
                          </Text>
                          <Text
                            className='flex gap-2'
                            as='div'
                            color='gray'
                            size='1'
                          >
                            June 29, 2024 * 2:30pm
                          </Text>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Badge variant='soft' color='yellow'>
                          &nbsp;&nbsp;life&nbsp;&nbsp;
                        </Badge>
                        <Badge variant='soft' color='pink'>
                          &nbsp;&nbsp;entertainment&nbsp;&nbsp;
                        </Badge>
                        <Text
                          color='indigo'
                          size='1'
                          className='flex items-center gap-1'
                        >
                          <span>
                            <WhatshotIcon fontSize='small' />
                            <WhatshotIcon fontSize='small' />
                          </span>
                          URGENT
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              </Box>
              <Box>
                <Card asChild variant='classic'>
                  <a href='#'>
                    <Flex align='center' justify='between' gap='5'>
                      <div className='flex gap-4 items-center'>
                        <Checkbox size='3' defaultChecked />
                        <div className='flex flex-col'>
                          <Text as='div' size='2' weight='bold'>
                            Shopping with Bob ...
                          </Text>
                          <Text
                            className='flex gap-2'
                            as='div'
                            color='gray'
                            size='1'
                          >
                            June 29, 2024 * 2:30pm
                          </Text>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Badge variant='soft' color='yellow'>
                          &nbsp;&nbsp;life&nbsp;&nbsp;
                        </Badge>
                        <Badge variant='soft' color='pink'>
                          &nbsp;&nbsp;entertainment&nbsp;&nbsp;
                        </Badge>
                        <Text
                          color='indigo'
                          size='1'
                          className='flex items-center gap-1'
                        >
                          <span>
                            <WhatshotIcon fontSize='small' />
                            <WhatshotIcon fontSize='small' />
                          </span>
                          URGENT
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              </Box>
              <Box>
                <Card asChild variant='classic'>
                  <a href='#'>
                    <Flex align='center' justify='between' gap='5'>
                      <div className='flex gap-4 items-center'>
                        <Checkbox size='3' defaultChecked />
                        <div className='flex flex-col'>
                          <Text as='div' size='2' weight='bold'>
                            Shopping with Bob ...
                          </Text>
                          <Text
                            className='flex gap-2'
                            as='div'
                            color='gray'
                            size='1'
                          >
                            June 29, 2024 * 2:30pm
                          </Text>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Badge variant='soft' color='yellow'>
                          &nbsp;&nbsp;life&nbsp;&nbsp;
                        </Badge>
                        <Badge variant='soft' color='pink'>
                          &nbsp;&nbsp;entertainment&nbsp;&nbsp;
                        </Badge>
                        <Text
                          color='indigo'
                          size='1'
                          className='flex items-center gap-1'
                        >
                          <span>
                            <WhatshotIcon fontSize='small' />
                            <WhatshotIcon fontSize='small' />
                          </span>
                          URGENT
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              </Box>
              <Box>
                <Card asChild variant='classic'>
                  <a href='#'>
                    <Flex align='center' justify='between' gap='5'>
                      <div className='flex gap-4 items-center'>
                        <Checkbox size='3' defaultChecked />
                        <div className='flex flex-col'>
                          <Text as='div' size='2' weight='bold'>
                            Shopping with Bob ...
                          </Text>
                          <Text
                            className='flex gap-2'
                            as='div'
                            color='gray'
                            size='1'
                          >
                            June 29, 2024 * 2:30pm
                          </Text>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Badge variant='soft' color='yellow'>
                          &nbsp;&nbsp;life&nbsp;&nbsp;
                        </Badge>
                        <Badge variant='soft' color='pink'>
                          &nbsp;&nbsp;entertainment&nbsp;&nbsp;
                        </Badge>
                        <Text
                          color='indigo'
                          size='1'
                          className='flex items-center gap-1'
                        >
                          <span>
                            <WhatshotIcon fontSize='small' />
                            <WhatshotIcon fontSize='small' />
                          </span>
                          URGENT
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              </Box>
            </div>
          </ScrollArea>
          <Link href='#'>
            <Text className='flex gap-2 items-center'>
              <AddCircleIcon />
              Add Tasks
            </Text>
          </Link>
        </div>
        <div className='flex flex-col gap-6 justify-center items-center'>
          <img
            src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            alt='empty content'
            className='w-1/2 h-auto'
          />
          <Text color='gray' className='text-2xl'>
            You haven't added any tasks
          </Text>
        </div>
        <div className='flex justify-center'>
          <div className='rounded-full text-brand border-brand border-dashed border'>
            <Button size='3' variant='soft'>
              <AddCircleIcon />
              Add Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayTasks;
