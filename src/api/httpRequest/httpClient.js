import axios from 'axios';
import webConfig from '@/global.config.js';
import { md5 } from 'js-md5';

const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30 * 1000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    //token
    const whiteList = webConfig.whiteListApi;
    const url = config.url;
    const token = localStorage.getItem('token');
    if (whiteList.indexOf(url) === -1 && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // secretID+alg
    const _secret = md5(webConfig.secretId + new Date().toISOString());
    config.headers.secret = _secret;
    return config;
  },
  (error) => {
    // network errors; timeout; request info errors
    console.error('Request Error:', error);
    alert('Failed to send request. Please try again.');
    return Promise.reject(new Error(error));
  },
);
request.interceptors.response.use(
  (res) => {
    //response
    const status = res.data.code || 200;
    const message = res.data.msg || 'unknow error';
    if (status === 401) {
      alert('No authorization. Please log in.');
      //redirect
      return Promise.reject(new Error(message));
    }
    if (status !== 200) {
      alert('Something went wrong. Please try again later.');
      console.error(`Error code ${status}: ${message}`);
      return Promise.reject(new Error(message));
    }
    return res;
  },
  (error) => {
    console.error('Response Error:', error);
    alert('Failed to receive a valid response. Please try again.');
    return Promise.reject(new Error(error));
  },
);

export default request;
