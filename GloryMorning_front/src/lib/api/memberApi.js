import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig';

export const getMemberInfo = mem_email => {
  const tokenStr = localStorage.getItem('access_token');
  console.log(tokenStr);
  const data = {
    mem_email: mem_email,
  };

  return axios.post('http://localhost:3031/api/user/getMemberInfo', data, {
    headers: { 'x-access-token': `${tokenStr}` },
  });
};

/* 로그인 */
export const login = (mem_email, mem_password) => {
  const data = {
    mem_email: mem_email,
    mem_password: mem_password,
  };
  return axios.post('http://localhost:3031/api/auth/login', data);
  // return (axios.post("http://localhost:3031/api/login",data));
};

export const setUserBackground = (userId, backgroundURL) => {
  const data = {
    userId: userId,
    backgroundURL: backgroundURL,
  };
  return axios.post(cilentConfig.endpoint.api + '/bus/setUserBackground', data);
};
export const getUserBackground = userId => {
  const data = {
    userId: userId,
  };
  return axios.post(cilentConfig.endpoint.api + '/bus/getUserBackground', data);
};

export const saveBookMarkBackground = backgroundBookMark => {
  const data = {
    backgroundBookMarkList: backgroundBookMark,
  };
  return axios.post(
    cilentConfig.endpoint.api + '/bus/saveBookMarkBackground',
    data,
  );
};

export const getBookmarkBackground = memIdx => {
  const data = {
    memIdx: memIdx,
  };
  return axios.post(
    cilentConfig.endpoint.api + '/bus/getBookmarkBackground',
    data,
  );
};
