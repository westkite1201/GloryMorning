/**
 * Global helper functions - client & server
 */
//색상 정의
//1 #3b5bdb // 파랑
//2 #37b24d // 연파랑
//3 #37b24d // 초록
//4 ffd43b  // 연노랑
//5 #fcc419  // 노랑
//6 #f08c00  // 주황
//7 #e03131  //빨강
//8 #212529  //흑
const colorArray = [
  '#3b5bdb', // 파랑
  '#3bc9db', // 청록
  '#37b24d', // 초록
  '#ffd43b', // 연노랑
  '#fcc419', // 노랑
  '#f08c00', // 주황
  '#e03131', //빨강
  '#212529', //흑 '
];

const weatherCodeArray = ['cloudy', 'rain', 'drizzle', 'storm', 'snow'];
const dayYnArray = ['', '', '_night'];
function rainViewCodeConverter(rainViewCode) {
  let code = rainViewCode.split('');
  return weatherCodeArray[code[0]] + dayYnArray[code[1]];
}

/* dust IcoMaker */
// 최고 😍
// 좋음 :😆
// 양호 😊
// 보통 😐
// 나쁨 😭
// 상당히 나쁨 😱
// 매우 나쁨 👿
// 최악 🖕💩🖕

let dustMessageInfo1;
let dustMessageInfo2;
let dustMessageInfo3;
let dustMessageInfo4;
let dustMessageInfo5;
let dustMessageInfo6;
let dustMessageInfo7;
let dustMessageInfo8;
const dustMessageObjectList = [
  (dustMessageInfo1 = {
    category: '',
    InfoHeader: '최고야!!',
    infoIcon: '😍',
    infoMessage: '끝내주는 공기입니다 ><',
    level: 0,
    color: colorArray[0],
  }),
  (dustMessageInfo2 = {
    category: '',
    InfoHeader: '좋아!',
    infoIcon: '😆',
    infoMessage: '좋은 공기를 즐기세요!',
    level: 1,
    color: colorArray[1],
  }),
  (dustMessageInfo3 = {
    category: '',
    InfoHeader: '양호',
    infoIcon: '😊',
    infoMessage: '괜찮아요 그래도! 버틸만 하네요.',
    level: 2,
    color: colorArray[2],
  }),
  (dustMessageInfo4 = {
    category: '',
    InfoHeader: '보통이에요',
    infoIcon: '😐',
    infoMessage: '그럭저럭이네요',
    level: 3,
    color: colorArray[3],
  }),
  (dustMessageInfo5 = {
    category: '',
    InfoHeader: '나쁨',
    infoIcon: '😭',
    infoMessage: '마스크를 꼭 챙기세요',
    level: 4,
    color: colorArray[4],
  }),
  (dustMessageInfo6 = {
    category: '',
    InfoHeader: '상당히 나빠요...',
    infoIcon: '😱',
    infoMessage: '하...이러지말자.',
    level: 5,
    color: colorArray[5],
  }),
  (dustMessageInfo7 = {
    category: '',
    InfoHeader: '매우 나빠요..',
    infoIcon: '👿',
    infoMessage: '당신은 밖에 나갈 생각을 하지 말아야합니다.(단호)',
    level: 6,
    color: colorArray[6],
  }),
  (dustMessageInfo8 = {
    category: '',
    InfoHeader: 'FUCK',
    infoIcon: '🖕💩🖕',
    infoMessage: '도망쳐',
    level: 7,
    color: colorArray[7],
  }),
];

const getDustIcon = (category, value) => {
  console.log('[SEO] getDustIcon', category, value);
  let index = 0;
  //미세먼지 pm10
  if (category === 'pm10') {
    //0 15 최고
    if ((0 <= value) & (value <= 15)) {
      index = 0;
    }
    //16-30 좋음
    if ((16 <= value) & (value <= 30)) {
      index = 1;
    }
    //31-40 양호
    if ((31 <= value) & (value <= 40)) {
      index = 2;
    }
    // 41-50 보통
    if ((41 <= value) & (value <= 50)) {
      index = 3;
    }
    // 51-75 나쁨
    if ((51 <= value) & (value <= 75)) {
      index = 4;
    }
    //76-100 상당히 나쁨
    if ((76 <= value) & (value <= 100)) {
      index = 5;
    }
    //101-150// 매우 나쁨
    if ((101 <= value) & (value <= 150)) {
      index = 6;
    }
    //151~ 최악
    if (151 <= value) {
      index = 7;
    }
  } else if (category === 'pm25') {
    //0 8 최고
    if ((0 <= value) & (value <= 8)) {
      index = 0;
    }
    //9-15 좋음
    if ((9 <= value) & (value <= 15)) {
      index = 1;
    }
    //16~20 양호
    if ((16 <= value) & (value <= 20)) {
      index = 2;
    }
    //21-25 보통
    if ((21 <= value) & (value <= 25)) {
      index = 3;
    }
    // 26-37 나쁨
    if ((26 <= value) & (value <= 37)) {
      index = 4;
    }
    //38-50 상당히 나쁨
    if ((38 <= value) & (value <= 50)) {
      index = 5;
    }
    //51-75// 매우 나쁨
    if ((51 <= value) & (value <= 75)) {
      index = 6;
    }
    //76~ 최악
    if (76 <= value) {
      index = 7;
    }
  } else if (category === 'o3') {
    //0 ~0.2 최고
    if ((0 <= value) & (value <= 0.02)) {
      index = 0;
    }
    //0.02-0.03 좋음
    if ((0.02 <= value) & (value <= 0.03)) {
      index = 1;
    }
    //0.03~0.06 양호
    if ((0.03 <= value) & (value <= 0.06)) {
      index = 2;
    }
    //0.06-0.09 보통
    if ((0.06 <= value) & (value <= 0.09)) {
      index = 3;
    }
    // 0.09~0.12 나쁨
    if ((0.09 <= value) & (value <= 0.12)) {
      index = 4;
    }
    //0.12-0.15 상당히 나쁨
    if ((0.12 <= value) & (value <= 0.15)) {
      index = 5;
    }
    //0.15-0.38// 매우 나쁨
    if ((0.15 <= value) & (value <= 0.38)) {
      index = 6;
    }
    //0.38~ 최악
    if (0.38 <= value) {
      index = 7;
    }
  }
  //이산화질소
  else if (category === 'no2') {
    //0 ~0.2 최고
    if ((0 <= value) & (value <= 0.02)) {
      index = 0;
    }
    //0.02-0.03 좋음
    if ((0.02 <= value) & (value <= 0.03)) {
      index = 1;
    }
    //0.03~0.05 양호
    if ((0.03 <= value) & (value <= 0.05)) {
      index = 2;
    }
    //0.05-0.09 보통
    if ((0.05 <= value) & (value <= 0.06)) {
      index = 3;
    }
    // 0.06~0.12 나쁨
    if ((0.06 <= value) & (value <= 0.13)) {
      index = 4;
    }
    //0.13-0.2 상당히 나쁨
    if ((0.13 <= value) & (value <= 0.2)) {
      index = 5;
    }
    //0.2 -1.1// 매우 나쁨
    if ((0.2 <= value) & (value <= 1.1)) {
      index = 6;
    }
    //0.1.1~ 2최악
    if (0.38 <= value) {
      index = 7;
    }
  }
  //일산화탄소
  else if (category === 'co') {
    //0 ~ 1최고
    if ((0 <= value) & (value <= 1)) {
      index = 0;
    }
    //1 ~ 2 좋음
    if ((1 <= value) & (value <= 2)) {
      index = 1;
    }
    //2~5.5 양호
    if ((2 <= value) & (value <= 5.5)) {
      index = 2;
    }
    //5.5-9 보통
    if ((5.5 <= value) & (value <= 9)) {
      index = 3;
    }
    // 9 ~ 12 나쁨
    if ((9 <= value) & (value <= 12)) {
      index = 4;
    }
    //12-15 상당히 나쁨
    if ((12 <= value) & (value <= 15)) {
      index = 5;
    }
    //15~32// 매우 나쁨
    if ((15 <= value) & (value <= 32)) {
      index = 6;
    }
    //32 ~ 최악
    if (32 <= value) {
      index = 7;
    }
  }
  //아황산 가스
  else if (category === 'so2') {
    //0 ~ 0.01최고
    if ((0 <= value) & (value <= 0.01)) {
      index = 0;
    }
    //0.01 ~ 0.02 좋음
    if ((0.01 <= value) & (value <= 0.02)) {
      index = 1;
    }
    //0.02 ~ 0.04 양호
    if ((0.02 <= value) & (value <= 0.04)) {
      index = 2;
    }
    // 0.04 ~ 0.05 보통
    if ((0.04 <= value) & (value <= 0.05)) {
      index = 3;
    }
    // 0.05 ~ 0.1 나쁨
    if ((0.05 <= value) & (value <= 0.1)) {
      index = 4;
    }
    // 0.1 ~ 0.15 상당히 나쁨
    if ((0.1 <= value) & (value <= 0.15)) {
      index = 5;
    }
    // 0.15 ~ 0.6 // 매우 나쁨
    if ((0.15 <= value) & (value <= 0.6)) {
      index = 6;
    }
    // 0.6  ~ 최악
    if (0.6 <= value) {
      index = 7;
    }
  }

  return Object.assign({}, dustMessageObjectList[index]);
};

// ---------------------------------------------------------
// isEmpty
//
// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
// ---------------------------------------------------------

const isEmpty = value => {
  if (
    value === '' ||
    value === 'undefined' ||
    value === 'null' ||
    value === undefined ||
    value === null ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

const floatCalculator = (number1, number2) => {
  //ref, floor, ceiling
  let sum = parseFloat(number1) + parseFloat(number2);
  let E = Number('1e' + 1);
  //console.log("sum : " + (sum * E)/E);
  return (sum * E) / E;
};

const cutSmallPoint = (value, n) => {
  //원하는 소숫점 자리만큼 10의 n승
  let number = Math.pow(10, n);

  return Math.floor(value * number) / number;
};

const cutSmallPointUseString = value => {
  let SmallPoint = '';
  if (String(value).indexOf('.') !== -1) {
    let splitList = String(value).split('.');
    SmallPoint = '.' + splitList[1].substring(0, 2);
    value = splitList[0];
  }

  return parseFloat(value + SmallPoint);
};

/*숫자에 comma  넣기 */
const putInsideComma = value => {
  //소숫점 확인하기
  let SmallPoint = '';
  if (String(value).indexOf('.') !== -1) {
    let splitList = String(value).split('.');

    SmallPoint = '.' + splitList[1];
    value = Math.floor(value);
  }
  let len, point, str;
  value = value + '';
  point = value.length % 3;
  len = value.length;
  str = value.substring(0, point);
  while (point < len) {
    if (str != '') str += ',';
    str += value.substring(point, point + 3);
    point += 3;
  }
  return str + SmallPoint;
};

/* Moment 함수  */

//과거 n달의 처음 날짜를 보여준다
/*params : YYYYMMDD, N */
const getMonthAgoFirst = (formatDay, monthAgo) => {
  const moment = require('moment');
  return moment(formatDay)
    .subtract(monthAgo, 'months')
    .startOf('month')
    .format('YYYYMMDD');
};

//현재날짜에서 n 날짜를 뺀다
const getDayAgo = (formatDay, dayAgo) => {
  const moment = require('moment');
  return moment(formatDay)
    .subtract(dayAgo, 'days')
    .format('YYYYMMDD');
};
const getDayAfter = (formatDay, dayAfter) => {
  const moment = require('moment');
  return moment(formatDay)
    .add(dayAfter, 'days')
    .format('YYYYMMDD');
};

const getSundayList = (beforeDate, afterDate) => {
  const moment = require('moment');
  let sundayList = [];
  // let beforeDate = '20170120';
  // let afterDate  = '20190129';
  //console.log(moment(beforeDate).format('YYYY'))
  let beforeDateYear = moment(beforeDate).format('YYYY');
  //let beforeDateMonth = moment(beforeDate).format('MM')
  //let beforeDateDay = moment(beforeDate).format('DD')

  let afterDateYear = moment(afterDate).format('YYYY');
  //let afterDateMonth = moment(afterDate).format('MM')
  //let aftereDateDay = moment(afterDate).format('DD')
  outer: for (let year = beforeDateYear; year <= afterDateYear; year++) {
    for (let month = 1; month <= 12; month++) {
      let date = year + '-' + month;
      let startOfMonth = moment(date)
        .startOf('month')
        .format('YYYY-MM-');
      let endOfMonth = moment(date)
        .endOf('month')
        .format('DD');
      for (let day = 1; day <= parseInt(endOfMonth); day++) {
        let thisDate = startOfMonth + day;
        let endDate = moment(afterDate).format('YYYY-MM-DD');
        if (moment(startOfMonth + day).weekday() === 1) {
          //console.log(year + ' ' + month +'month of sunday ' , day)
          sundayList[moment(startOfMonth + day).format('YYYYMMDD')] = true;
        }
        if (checkDateSame(thisDate, endDate)) {
          break outer;
        }
      }
    }
  }
  return sundayList;
};
const checkDateSame = (thisDate, endDate) => {
  if (thisDate === endDate) {
    return true;
  } else {
    return false;
  }
};

const findAndRemove = (originalStr, wantRemoveStr) => {
  //console.log(originalStr)
  let originStr = originalStr.slice(0);
  console.log(originStr);
  let index = originStr.indexOf(wantRemoveStr);
  let len = wantRemoveStr.length;
  if (index !== -1) {
    originStr =
      originStr.substring(0, index) +
      originStr.substring(index + len, originStr.length);
  }
  return originStr.replace(/  +/g, ' ');
};

// ---------------------------------------------------------
// check apis - login, auth, ...
// ---------------------------------------------------------

const checkLogin = (userId, token) => {
  if (isEmpty(userId)) {
    return false;
  }
  if (isEmpty(token)) {
    return false;
  }

  return true;
};

const checkAuth = userId => {
  switch (userId) {
    // admin
    case '000001':
    case '000002':
    case 'msson':
      return true;
    default:
      return false;
  }
};

const checkAdminUrl = to => {
  switch (to) {
    case '/admin':
      return true;
    default:
      return false;
  }
};

const checkMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

const checkEmail = email => {
  return /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
    email,
  );
};

const checkReqUserBrowser = req => {
  const header = req.get('user-agent').toString();

  if (header.includes('MSIE')) {
    return 'MSIE';
  } else if (header.includes('Chrome')) {
    return 'Chrome';
  } else if (header.includes('Opera')) {
    return 'Opera';
  }
  return 'Firefox';
};
// ---------------------------------------------------------
// check file format
// ---------------------------------------------------------
const isImageFormat = filename => {
  return filename.match(/.(jpg|jpeg|png|gif|tiff|bmp)$/i);
};

const checkFileFormat = filename => {
  return !filename.match(/.(exe|sh|bat)$/i);
};

// ---------------------------------------------------------
// getHash
// MD5 해쉬를 생성해서 리턴한다. 주로 파일명 해쉬 등에 사용된다.
// ---------------------------------------------------------
const getHash = data => {
  const crypto = require('crypto');
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
};

// ---------------------------------------------------------
// getRandomInt
//
// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
// ---------------------------------------------------------
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// ---------------------------------------------------------
// Restful api error code
// ---------------------------------------------------------

const errorCode = {
  empty: {
    code: 101,
    message: 'invalid parameter',
  },
  failure: {
    code: 101,
    message: 'failure',
    error: '',
  },
  socketFailure: {
    code: 101,
    message: 'invalid socket',
  },
};

module.exports = {
  // properties
  errorCode: errorCode,

  // methods
  rainViewCodeConverter: rainViewCodeConverter,
  getHash: getHash,
  getRandomInt: getRandomInt,
  getDustIcon: getDustIcon,
  isEmpty: isEmpty,
  isImageFormat: isImageFormat,
  checkFileFormat: checkFileFormat,
  checkLogin: checkLogin,
  checkAuth: checkAuth,
  checkAdminUrl: checkAdminUrl,
  checkMobile: checkMobile,
  checkEmail: checkEmail,
  checkReqUserBrowser: checkReqUserBrowser,

  putInsideComma: putInsideComma,
  cutSmallPoint: cutSmallPoint,
  cutSmallPointUseString: cutSmallPointUseString,
  floatCalculator: floatCalculator,
  getMonthAgoFirst: getMonthAgoFirst,
  getDayAgo: getDayAgo,
  getDayAfter: getDayAfter,
  getSundayList: getSundayList,
  findAndRemove: findAndRemove,
};
