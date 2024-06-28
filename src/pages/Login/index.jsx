import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../util/validations';
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
import React, { useState } from 'react';

const TodoInput = ({
  label,
  instruction = '',
  placeholder,
  isPassword = false,
  preffixIcon,
  actions = null,
  value,
  onChange,
  onBlur,
  error,
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
        onBlur={onBlur}
        onChange={onChange}
        value={value}
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
      {error ? (
        <Text color='red' size='1'>
          {error}
        </Text>
      ) : (
        <Box height='16px'></Box>
      )}
    </Flex>
  );
};

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMSG, setEmailErrorMSG] = useState('');
  const [passwordErrorMSG, setPasswordErrorMSG] = useState('');

  const switchPage = () => {
    setIsLogin(!isLogin);
  };

  const handleValidateEmail = () => {
    const errMSG = validateEmail(email);
    setEmailErrorMSG(errMSG);
  };

  const handleValidatePassword = () => {
    const errMSG = validatePassword(password);
    setPasswordErrorMSG(errMSG);
  };

  const handleLogin = () => {
    //validations
    if (!emailErrorMSG && !passwordErrorMSG) {
      console.log('login');
    }
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
            <Flex direction='column' gap='4'>
              <Text className='text-primary-invert font-bold text-2xl'>
                Sign in
              </Text>
              <Flex direction='column' gap='1'>
                <TodoInput
                  error={emailErrorMSG}
                  onBlur={handleValidateEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label={'Email'}
                  placeholder='enter your email'
                />
                <TodoInput
                  error={passwordErrorMSG}
                  onBlur={handleValidatePassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <Button onClick={handleLogin}>Sign in</Button>
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

const SignUp = ({ handleSwitch }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErrorMSG, setEmailErrorMSG] = useState('');
  const [passwordErrorMSG, setPasswordErrorMSG] = useState('');
  const [passwordConfirmErrorMSG, setPasswordConfirmErrorMSG] = useState('');

  const handleValidateEmail = () => {
    const errMSG = validateEmail(email);
    setEmailErrorMSG(errMSG);
  };

  const handleValidatePassword = () => {
    const errMSG = validatePassword(password);
    setPasswordErrorMSG(errMSG);
  };

  const handleValidateConfirmPassword = () => {
    const errMSG = validateConfirmPassword(password, confirmPassword);
    setPasswordConfirmErrorMSG(errMSG);
  };

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
            <Flex direction='column' gap='1'>
              <TodoInput
                error={emailErrorMSG}
                onBlur={handleValidateEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={'Email'}
                placeholder='set your email'
              />
              <TodoInput
                error={passwordErrorMSG}
                onBlur={handleValidatePassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                error={passwordConfirmErrorMSG}
                onBlur={handleValidateConfirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
