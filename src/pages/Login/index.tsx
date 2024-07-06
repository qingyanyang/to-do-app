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
import React, { useState, ReactNode } from 'react';
import { FirebaseAuthService } from '../../api/firebaseService/auth';
import { FirebaseFirestoreService } from '../../api/firebaseService/db';
import { useNavigate } from 'react-router-dom';
import {
  setProfileURL,
  setToken,
  setUID,
  setUserEmail,
} from '../../util/localStorageFucs';

import { useAppDispatch } from '../../store/hooks';
import { setError, setSuccess } from '../../store/modules/taskSlice';

interface TodoInputProps {
  label: string;
  instruction?: ReactNode;
  placeholder: string;
  isPassword?: boolean;
  preffixIcon?: ReactNode;
  actions?: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  label,
  instruction = null,
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
        {instruction}
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
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0); //0:signin; 1:reset pw; 2: signup
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMSG, setEmailErrorMSG] = useState('');
  const [passwordErrorMSG, setPasswordErrorMSG] = useState('');

  const navigate = useNavigate();

  const switchPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleValidateEmail = () => {
    const errMSG = validateEmail(email);
    setEmailErrorMSG(errMSG);
    return errMSG;
  };

  const handleValidatePassword = () => {
    const errMSG = validatePassword(password);
    setPasswordErrorMSG(errMSG);
    return errMSG;
  };

  const handleLogin = async () => {
    const emailErrorMSG = handleValidateEmail();
    const passwordErrorMSG = handleValidatePassword();
    //validations
    if (!emailErrorMSG && !passwordErrorMSG) {
      try {
        dispatch(setError(null));
        dispatch(setSuccess(null));
        const res = await FirebaseAuthService.loginUser(email, password);
        setEmail('');
        setPassword('');
        // save info
        const accessToken = await res.user.getIdToken();
        setUID(res.user.uid);
        setToken(accessToken);
        setUserEmail(res.user.email ? res.user.email : 'example@email.com');
        setProfileURL(res.user.photoURL);
        // redirect
        navigate('/');
        dispatch(setSuccess('Login successfully!'));
      } catch (error) {
        dispatch(setError(error as string));
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      dispatch(setError(null));
      dispatch(setSuccess(null));
      const res = await FirebaseAuthService.loginWithGoogle();
      // save info
      const accessToken = await res.user.getIdToken();
      setUID(res.user.uid);
      setToken(accessToken);
      setUserEmail(res.user.email ? res.user.email : 'user');
      setProfileURL(res.user.photoURL);
      // redirect
      navigate('/');
      dispatch(setSuccess('Login successfully!'));
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

  return (
    <Flex
      align='center'
      className='h-screen'
      justify='center'
      direction='column'
    >
      {page === 0 ? (
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  label={'Email'}
                  placeholder='enter your email'
                />
                <TodoInput
                  error={passwordErrorMSG}
                  onBlur={handleValidatePassword}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  label={'Password'}
                  instruction={
                    <Link href='#' onClick={() => switchPage(1)} size={'2'}>
                      Forgot password?
                    </Link>
                  }
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
                <Button variant='surface' onClick={() => switchPage(2)}>
                  Create an account
                </Button>
                <Button onClick={handleLogin}>Sign in</Button>
                <Button variant='soft' onClick={handleLoginWithGoogle}>
                  <FontAwesomeIcon icon={faGoogle} />
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Box>
      ) : page === 1 ? (
        <ResetPassword handleSwitch={switchPage} />
      ) : (
        <SignUp handleSwitch={switchPage} />
      )}
    </Flex>
  );
}

type SignUpProps = {
  handleSwitch: (pageNumber: number) => void;
};
const SignUp: React.FC<SignUpProps> = ({ handleSwitch }) => {
  const dispatch = useAppDispatch();
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
    return errMSG;
  };

  const handleValidatePassword = () => {
    const errMSG = validatePassword(password);
    setPasswordErrorMSG(errMSG);
    return errMSG;
  };

  const handleValidateConfirmPassword = () => {
    const errMSG = validateConfirmPassword(password, confirmPassword);
    setPasswordConfirmErrorMSG(errMSG);
    return errMSG;
  };

  const handleSignUp = async () => {
    const emailErrorMSG = handleValidateEmail();
    const passwordErrorMSG = handleValidatePassword();
    const passwordConfirmErrorMSG = handleValidateConfirmPassword();
    //validations
    if (!emailErrorMSG && !passwordErrorMSG && !passwordConfirmErrorMSG) {
      try {
        const res = await FirebaseAuthService.registerUser(email, password);
        const userEmail = res.user.email;
        const uid = res.user.uid;
        const photoURL = res.user.photoURL;
        dispatch(setError(null));
        dispatch(setSuccess(null));
        // create user document
        await FirebaseFirestoreService.createDocumentWithName(
          'users',
          {
            email: userEmail,
            uid: uid,
            photoURL: photoURL,
          },
          uid,
        );
        dispatch(setSuccess('Create account successfully!'));
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        handleSwitch(0);
      } catch (error) {
        dispatch(setError(error as string));
      }
    }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                label={'Email'}
                placeholder='set your email'
              />
              <TodoInput
                error={passwordErrorMSG}
                onBlur={handleValidatePassword}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
              <Link onClick={() => handleSwitch(0)} href='#' size={'2'}>
                Already has account?
              </Link>
              <Button onClick={handleSignUp}>Create an account</Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

type ResetPasswordProps = {
  handleSwitch: (pageNumber: number) => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ handleSwitch }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailErrorMSG, setEmailErrorMSG] = useState('');

  const handleValidateEmail = () => {
    const errMSG = validateEmail(email);
    setEmailErrorMSG(errMSG);
    return errMSG;
  };

  const handleResetPassword = async () => {
    const emailErrorMSG = handleValidateEmail();
    //validations
    if (!emailErrorMSG) {
      try {
        dispatch(setError(null));
        dispatch(setSuccess(null));
        await FirebaseAuthService.sendResetEmail(email);
        dispatch(setSuccess('Sent the password reset email!'));
      } catch (error) {
        dispatch(setError(error as string));
      }
    }
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
              Send Email
            </Text>
            <Flex direction='column' gap='1'>
              <TodoInput
                error={emailErrorMSG}
                onBlur={handleValidateEmail}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                label={'Email'}
                placeholder='enter your email to get reset password link'
              />
            </Flex>
            <Flex justify='end' gap='3' align={'center'}>
              <Button variant='surface' onClick={() => handleSwitch(0)}>
                Back
              </Button>
              <Button onClick={handleResetPassword}>Send Email</Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default Login;
