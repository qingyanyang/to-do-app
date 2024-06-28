import { auth as firebaseAuth } from '../../FirebaseConfig';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

const logoutUser = async () => {
  return await signOut(firebaseAuth);
};

const sendResetEmail = async (email: string) => {
  return await sendPasswordResetEmail(firebaseAuth, email);
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(firebaseAuth, provider);
};

const subscribeToAuthChanges = (handleAuthChange: (user: any) => void) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    handleAuthChange(user);
  });
};

export const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};
