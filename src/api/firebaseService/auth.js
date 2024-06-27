import { firebaseAuth } from '../../FirebaseConfig';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

const logoutUser = async () => {
  return await signOut(firebaseAuth);
};

const sendPasswordResetEmail = async (email) => {
  return await sendPasswordResetEmail(firebaseAuth, email);
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(firebaseAuth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    handleAuthChange(user);
  });
};

export const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};
