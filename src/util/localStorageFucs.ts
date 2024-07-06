const UID_KEY = 'uid';
const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const PRO_URL_KEY = 'profileURL';

// uid
const getUID = () => {
  return localStorage.getItem(UID_KEY);
};
const setUID = (uid: string) => {
  localStorage.setItem(UID_KEY, uid);
};
const removeUID = () => {
  localStorage.removeItem(UID_KEY);
};

// token
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// email
const getUserEmail = () => {
  return localStorage.getItem(EMAIL_KEY);
};
const setUserEmail = (email: string) => {
  localStorage.setItem(EMAIL_KEY, email);
};
const removeUserEmail = () => {
  localStorage.removeItem(EMAIL_KEY);
};

// ProfileURL
const getProfileURL = () => {
  return localStorage.getItem(PRO_URL_KEY);
};
const setProfileURL = (proURL: string | null) => {
  localStorage.setItem(PRO_URL_KEY, proURL ? proURL : '');
};
const removeProfileURL = () => {
  localStorage.removeItem(PRO_URL_KEY);
};

export {
  getUID,
  setUID,
  removeUID,
  getToken,
  setToken,
  removeToken,
  getProfileURL,
  setProfileURL,
  removeProfileURL,
  getUserEmail,
  setUserEmail,
  removeUserEmail,
};
