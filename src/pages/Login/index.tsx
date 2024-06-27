import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import {
  Box,
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Link,
  IconButton,
} from '@radix-ui/themes';
import React, { useState, ReactNode } from 'react';

type TodoInputProps = {
  label: string;
  instruction?: string;
  placeholder: string;
  isPassword?: boolean;
  preffixIcon?: ReactNode;
  actions?: ReactNode;
};

const TodoInput: React.FC<TodoInputProps> = ({
  label,
  instruction = '',
  placeholder,
  isPassword = false,
  preffixIcon,
  actions = null,
}) => {
  return (
    <Flex direction='column' gap='1'>
      <Flex align='center' justify='between'>
        <Text as='label' className='text-primary-invert' size='2'>
          {label}
        </Text>
        <Link href='#' size={'2'}>
          {instruction}
        </Link>
      </Flex>
      <TextField.Root
        radius='large'
        size='2'
        placeholder={placeholder}
        type={isPassword ? 'password' : 'text'}
      >
        {preffixIcon && (
          <TextField.Slot side='left' pl='3'>
            {preffixIcon}
          </TextField.Slot>
        )}
        <TextField.Slot side='right' pr='3'>
          {actions}
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const switchPage = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Flex
      align='center'
      className='h-screen'
      justify='center'
      direction='column'
    >
      {isLogin ? (
        <Box className='mobile:w-[350px] tablet:w-[400px]'>
          <Card size='3'>
            <Flex direction='column' gap='5'>
              <Text className='text-primary-invert font-bold text-2xl'>
                Sign in
              </Text>
              <Flex direction='column' gap='4'>
                <TodoInput label={'Email'} placeholder='enter your email' />
                <TodoInput
                  label={'Password'}
                  instruction='Forgot Password?'
                  placeholder='enter your password'
                  isPassword={!isPasswordVisible}
                  actions={
                    <IconButton
                      variant='ghost'
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  }
                />
              </Flex>

              <Flex justify='end' gap='3' align={'center'}>
                <Button variant='surface' onClick={switchPage}>
                  Create an account
                </Button>
                <Button>Sign in</Button>
                <Button>
                  <FontAwesomeIcon icon={faGoogle} />
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Box>
      ) : (
        <SignUp handleSwitch={switchPage} />
      )}
    </Flex>
  );
}

type SignUpProps = {
  handleSwitch: () => void;
};
const SignUp: React.FC<SignUpProps> = ({ handleSwitch }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <Flex
      align='center'
      className='h-screen'
      justify='center'
      direction='column'
    >
      <Box className='mobile:w-[350px] tablet:w-[400px]'>
        <Card size='3'>
          <Flex direction='column' gap='5'>
            <Text className='text-primary-invert font-bold text-2xl'>
              Sign up
            </Text>
            <Flex direction='column' gap='3'>
              <TodoInput label={'Email'} placeholder='set your email' />
              <TodoInput
                label={'Password'}
                placeholder='set your password'
                isPassword={!isPasswordVisible}
                actions={
                  <IconButton
                    variant='ghost'
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                }
              />
              <TodoInput
                label={'Confirm Password'}
                placeholder='confirm your password'
                isPassword={!isConfirmPasswordVisible}
                actions={
                  <IconButton
                    variant='ghost'
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOpenIcon />
                    ) : (
                      <EyeClosedIcon />
                    )}
                  </IconButton>
                }
              />
            </Flex>
            <Flex justify='end' gap='3' align={'center'}>
              <Link onClick={handleSwitch} href='#' size={'2'}>
                Already has account?
              </Link>
              <Button>Create an account</Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default Login;
