import { Cross1Icon } from '@radix-ui/react-icons';
import {
  Card,
  Flex,
  Text,
  Tabs,
  Box,
  TextField,
  Button,
  Switch,
  Badge,
  IconButton,
} from '@radix-ui/themes';
import React from 'react';
import ConstructionMask from '../../../components/ConstructionMask';

function Settings() {
  return (
    <div className='relative z-0 pointer-events-none'>
      <ConstructionMask />
      <Flex direction='column' gap='5'>
        <Card variant='surface'>
          <Tabs.Root defaultValue='account'>
            <Tabs.List>
              <Tabs.Trigger value='account'>
                <Text size='3' className='font-semibold'>
                  Preferences
                </Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Box pt='3'>
              <Tabs.Content value='account' className='p-4'>
                <Flex direction={'column'} gapY={'4'}>
                  <Text className='text-l font-semibold' color='gray'>
                    Customize Labels
                  </Text>
                  <Flex gap='2'>
                    <div className='flex-1'>
                      <TextField.Root
                        placeholder='Example: entertainment'
                        radius='large'
                      ></TextField.Root>
                    </div>
                    <Button radius='large'>
                      &nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;
                    </Button>
                  </Flex>
                  <Text color='gray' size='2'>
                    User can add at most 10 labels, each length of label cannot
                    exceed 15 characters.
                  </Text>
                  <Flex wrap='wrap' gapX={'2'} gapY={'2'}>
                    <Badge color='indigo' size={'3'}>
                      study
                      <IconButton size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Badge>
                    <Badge color='cyan' size={'3'}>
                      work
                      <IconButton size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Badge>
                    <Badge color='orange' size={'3'}>
                      health
                      <IconButton size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Badge>
                    <Badge color='crimson' size={'3'}>
                      dating
                      <IconButton size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Badge>
                    <Badge color='yellow' size={'3'}>
                      entertainment
                      <IconButton size={'1'}>
                        <Cross1Icon />
                      </IconButton>
                    </Badge>
                  </Flex>
                </Flex>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Card>
        <Card variant='surface'>
          <Tabs.Root defaultValue='account'>
            <Tabs.List>
              <Tabs.Trigger value='account'>
                <Text size='3' className='font-semibold'>
                  Notification
                </Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Box pt='3'>
              <Tabs.Content value='account' className='p-4'>
                <Flex direction={'column'} gapY={'2'}>
                  <Flex gap='4' align={'center'}>
                    <Text className='text-l font-semibold' color='gray'>
                      Allow Notifications
                    </Text>
                    <Switch defaultChecked size='3' />
                  </Flex>
                  <Text color='gray' size='2'>
                    User can get notification popup when scheduled time is up.
                  </Text>
                </Flex>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Card>
      </Flex>
    </div>
  );
}

export default Settings;
