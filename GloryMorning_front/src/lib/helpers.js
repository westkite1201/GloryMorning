
/**
 * Global helper functions - client & server
 */
// ---------------------------------------------------------
// isEmpty
//
// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
// ---------------------------------------------------------

const isEmpty = (value) => {
  if (value === '' || value === 'undefined' || value === 'null'
    || value === undefined || value === null
    || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true
  }
  else {
    return false
  }
}

const floatCalculator = (number1, number2) =>{ //ref, floor, ceiling
  let sum =  parseFloat(number1) + parseFloat(number2);
  let E = Number('1e' + 1);
  //console.log("sum : " + (sum * E)/E);
  return (sum * E)/E ;
};




const cutSmallPoint = (value, n ) => {
  //원하는 소숫점 자리만큼 10의 n승 
  let number =Math.pow(10 , n) 

  return Math.floor(value * number) / number;
}

const cutSmallPointUseString = (value) =>{

  let SmallPoint = ''
  if(String(value).indexOf(".") !== -1){

    let splitList = String(value).split('.')
    SmallPoint =  "." +splitList[1].substring(0,2);
    value = splitList[0]
  }

  return parseFloat( value + SmallPoint)
}



/*숫자에 comma  넣기 */
const putInsideComma= (value) =>{

  //소숫점 확인하기 
  let SmallPoint = ''
  if(String(value).indexOf(".") !== -1){

    let splitList = String(value).split('.')

    SmallPoint =  "." +splitList[1];
    value = Math.floor(value)
   
  }
  let len, point, str; 
  value = value + ""; 
  point = value.length % 3 ;
  len = value.length; 
  str = value.substring(0, point); 
  while (point < len) { 
      if (str != "") str += ","; 
      str += value.substring(point, point + 3); 
      point += 3; 
  } 
  return str + SmallPoint;
}

/* Moment 함수  */

//과거 n달의 처음 날짜를 보여준다
/*params : YYYYMMDD, N */
const getMonthAgoFirst= (formatDay, monthAgo) => {
  const moment = require('moment')
  return moment(formatDay).subtract(monthAgo, 'months').startOf('month').format('YYYYMMDD')
}

//현재날짜에서 n 날짜를 뺀다
const getDayAgo= (formatDay, dayAgo) => {
  const moment = require('moment')
  return moment(formatDay).subtract(dayAgo, 'days').format('YYYYMMDD')
}
const getDayAfter= (formatDay, dayAfter) => {
  const moment = require('moment')
  return moment(formatDay).add(dayAfter, 'days').format('YYYYMMDD')
}


const getSundayList  = (beforeDate, afterDate) => {
  const moment = require('moment')
  let sundayList = [];
  // let beforeDate = '20170120';
  // let afterDate  = '20190129';
  //console.log(moment(beforeDate).format('YYYY'))
  let beforeDateYear = moment(beforeDate).format('YYYY')
  //let beforeDateMonth = moment(beforeDate).format('MM')
  //let beforeDateDay = moment(beforeDate).format('DD')

  let afterDateYear = moment(afterDate).format('YYYY')
  //let afterDateMonth = moment(afterDate).format('MM')
  //let aftereDateDay = moment(afterDate).format('DD')
  outer: for (let year = beforeDateYear; year <= afterDateYear; year++){
          for( let month = 1; month <= 12; month++){
              let date = year + '-' + month
              let startOfMonth = moment(date).startOf('month').format('YYYY-MM-');
              let endOfMonth   = moment(date).endOf('month').format('DD');
              for(let day = 1; day <= parseInt(endOfMonth); day++){
                  let thisDate = startOfMonth + day
                  let endDate = moment(afterDate).format('YYYY-MM-DD')
                  if ( ( moment(startOfMonth + day).weekday()) === 1 ){
                       //console.log(year + ' ' + month +'month of sunday ' , day)
                       sundayList[ moment(startOfMonth + day).format('YYYYMMDD')] = true
                  }
                  if ( checkDateSame(thisDate, endDate) ){
                      break outer;
                  }
              }
          }
      }
  return sundayList
}
const checkDateSame = (thisDate, endDate) => {
  if ( thisDate === endDate ){
      return true
  }
  else{
      return false;
  }
}

const findAndRemove = (originalStr, wantRemoveStr) => {
  //console.log(originalStr)
  let originStr = originalStr.slice(0)
  console.log(originStr)
  let index = originStr.indexOf(wantRemoveStr);
  let len = wantRemoveStr.length;
  if(index !== -1){
    originStr = originStr.substring(0,index) + originStr.substring(index + len ,originStr.length) 
  }
  return originStr.replace( /  +/g, ' ' )
}




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
}

const checkAuth = (userId) => {
  switch (userId) {
    // admin
    case '000001':
    case '000002':
    case 'msson':
      return true;
    default:
      return false;
  }
}

const checkAdminUrl = (to) => {
  switch (to) {
    case '/admin':
      return true;
    default:
      return false;
  }
}

const checkMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ;
}

const checkEmail = (email) => {
    return /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email);
}

const checkReqUserBrowser = (req) => {

  const header = req.get('user-agent').toString();

  if (header.includes("MSIE")){
    return "MSIE";
  }
  else if(header.includes("Chrome")) {
    return "Chrome";
  }
  else if(header.includes("Opera")) {
    return "Opera";
  }
  return "Firefox";
}
// ---------------------------------------------------------
// check file format
// ---------------------------------------------------------
const isImageFormat = (filename) => {
  return filename.match(/.(jpg|jpeg|png|gif|tiff|bmp)$/i);
}

const checkFileFormat = (filename) => {
  return !filename.match(/.(exe|sh|bat)$/i);
}

// ---------------------------------------------------------
// getHash
// MD5 해쉬를 생성해서 리턴한다. 주로 파일명 해쉬 등에 사용된다.
// ---------------------------------------------------------
const getHash = (data) => {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(data).digest('hex');
}

// ---------------------------------------------------------
// getRandomInt
//
// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
// ---------------------------------------------------------
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  getHash: getHash,
  getRandomInt: getRandomInt,

  isEmpty: isEmpty,
  isImageFormat: isImageFormat,
  checkFileFormat: checkFileFormat,
  checkLogin: checkLogin,
  checkAuth: checkAuth,
  checkAdminUrl: checkAdminUrl,
  checkMobile: checkMobile,
  checkEmail: checkEmail,
  checkReqUserBrowser: checkReqUserBrowser,

  putInsideComma : putInsideComma, 
  cutSmallPoint : cutSmallPoint,
  cutSmallPointUseString : cutSmallPointUseString,
  floatCalculator : floatCalculator,
  getMonthAgoFirst : getMonthAgoFirst,
  getDayAgo : getDayAgo,
  getDayAfter : getDayAfter,
  getSundayList: getSundayList,
  findAndRemove : findAndRemove,
}
