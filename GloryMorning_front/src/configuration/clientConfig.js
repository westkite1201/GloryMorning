/*
 * Client Configuration
 *
 */
module.exports = {
  apiKeys: {
    kakaoApiKey: '',
    datagoApiKey: '',
  },

  adminEmail: 'txtcopy@naver.com',
  //adminEmail : 'april3@sk.com'

  // local dev
  endpoint: {
    web: 'http://localhost:1201',
    api: 'http://localhost:3031/api',
    socket: 'http://localhost:3031/time',
  },

  defaultImg: '/images/defaultImg.png',

  // product
  // endpoint: {
  //  web: "http://210.57.226.134:1201/",
  //  api: "http://210.57.226.134:3031/api"
  //  socket: 'http://210.57.226.134:3031/time',
  // },
};
