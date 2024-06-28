const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const PRO_URL_KEY = 'profileURL';

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
const getEmail = () => {
  return localStorage.getItem(EMAIL_KEY);
};
const setEmail = (email: string) => {
  localStorage.setItem(EMAIL_KEY, email);
};
const removeEmail = () => {
  localStorage.removeItem(EMAIL_KEY);
};

// ProfileURL
const getProfileURL = () => {
  return localStorage.getItem(PRO_URL_KEY);
};
const setProfileURL = (proURL: string) => {
  localStorage.setItem(PRO_URL_KEY, proURL);
};
const removeProfileURL = () => {
  localStorage.removeItem(PRO_URL_KEY);
};

export {
  getToken,
  setToken,
  removeToken,
  getProfileURL,
  setProfileURL,
  removeProfileURL,
  getEmail,
  setEmail,
  removeEmail,
};
