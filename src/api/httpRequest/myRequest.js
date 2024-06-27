import request from './httpClient';

const myRequest = (() => {
  let hasRequest = [];

  return async (config) => {
    const url = config.url;
    if (hasRequest.indexOf(url) !== -1) {
      return Promise.reject({ mes: 'Request has been submitted' });
    }
    hasRequest.push(url);
    try {
      const res = await request({ ...config });
      hasRequest = hasRequest.filter((item) => item !== url);
      return res;
    } catch (error) {
      hasRequest = hasRequest.filter((item) => item !== url);
      return Promise.reject(error);
    }
  };
})();

export { myRequest as request, request as initRequest };
