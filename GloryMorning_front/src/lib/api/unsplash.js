import axios from 'axios';
import objectToQueryString from '../objectToQueryString';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  },
});

export const getRandomPhotos = params =>
  instance
    .get(`/photos/random?${objectToQueryString(params)}`)
    .then(res => res.data);

export const searchPhotos = params => {
  console.log('searchPhotos ', params);
  return instance
    .get(`/search/photos?${objectToQueryString(params)}`)
    .then(res => res.data);
};

export const getImage = (url, name) => {
  return axios
    .get(url, {
      responseType: 'blob',
    })
    .then(response => {
      if (response) {
        var FileSaver = require('file-saver');
        FileSaver.saveAs(new Blob([response.data]), `${name}.png`);
      }
    });
};
