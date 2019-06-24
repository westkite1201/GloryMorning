var express = require('express');
var router = express.Router();
let {PythonShell } = require('python-shell') 
const weatherDao = require('../../model/mysql/weatherDao')
const weatherDaoTest = require('../../model/mysql/weatherDaoTest')
const async = require('async');
const CallSeverApi = require('./CallSeverApi')('weather');
const moment = require('moment')

let newtime = 0;
let newdate = 0;



getNowTime = () => {
  let date = new Date();
  let hourMinute = parseInt( moment(date).format('HHMM'))
  console.log( hourMinute )
  if( 0 <= hourMinute && hourMinute < 230){
     //하루전날 
    newdate = moment(date).subtract(1, 'days').format('YYYYMMDD')
    newtime = '2300'
  }
  else if ( 230 <= hourMinute && hourMinute < 530 ){

    newdate = moment(date).format('YYYYMMDD')
    newtime = '0200'
  }
  else if ( 530 <=  hourMinute && hourMinute < 830 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '0500'
  }
  else if ( 830 <=  hourMinute && hourMinute < 1130 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '0800'
  }
  else if ( 1130 <=  hourMinute && hourMinute < 1430 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '1100'
  }
  else if ( 1430 <=  hourMinute && hourMinute < 1730 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '1400'
  }
  else if ( 1730 <=  hourMinute && hourMinute < 2030 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '1700'
  }
  else if ( 2030 <=  hourMinute && hourMinute  < 2330 ){
    newdate = moment(date).format('YYYYMMDD')
    newtime = '2000'
  }
}



getWeatherData = async(res, nx, ny) => {
      //nx, ny는 디비에서 가져오기 
      //base_date오늘 날짜 
      //이 정보는 디비에서 글고 여기 함수에서 계산되는거임 
      let base_date, base_time, type;
      base_date = newdate
      base_time = newtime

      type = 'json'
        await CallSeverApi.weather(base_date, base_time, nx, ny, type, ( err, result ) => {
        if (!err) {
          console.log('in getWeatherData' , result)
          //return result
          res.json(result);
        } else {
          console.log(err);
        }
      })

}
router.post('/testWeatherAPI',  (req, res) => {
      //nx, ny는 디비에서 가져오기 
      //base_date오늘 날짜 
      //이 정보는 디비에서 글고 여기 함수에서 계산되는거임 
      let base_date, base_time, nx, ny, type;
      base_date = newdate
      base_time = newtime
      nx = 60,
      ny = 127,
      type = 'json'
      CallSeverApi.weather(base_date, base_time, nx, ny, type, function( err, result ){
        if (!err) {
          console.log(result);
          res.json(result);
        } else {
          console.log(err);
            res.json(err);
        }
      })
});



/* 디비 조회하기  */
router.post('/dbtest',  async(req, res) => {
  try{
    let rows = await weatherDaoTest.dbTest();
    if(rows){
        console.log(rows)
        return res.json(rows)
    }else{
      console.log('error')
    }
  }catch(e){
    console.log('error' ,e)
  }
})
//서버에서 모두 처리
// 이슈사항...AWAIT 으로 어떻게 이쁘게 받지.?ㅜㅜ
router.post('/getLocation_chain',  async(req, res) => {
  await getNowTime(); //현재 시간 세팅
  try{
    const data = {
      LOCATION_A :  req.body.LOCATION_A,
      LOCATION_B :  req.body.LOCATION_B,
      LOCATION_C :  req.body.LOCATION_C,
    } 
    //console.log(data)
    let rows = await weatherDaoTest.getLocation(data); // LOCATION 정보 XX,YY  

    if(rows){ //온경우 
        let nx = rows[0].X;
        let ny = rows[0].Y; 
        let response = await getWeatherData(res, nx, ny) // getwehaterDATA
        console.log('response' , response)
        console.log('getWeatherData 완료')
        //return res.json(response)
    }else{
      console.log('error')
    }
  }catch(e){
    console.log('error' ,e)
  }
})




router.post('/getLocation',  async(req, res) => {
  console.log("getLocation!!"  )
  const data = {
    LOCATION_A :  req.body.LOCATION_A,
    LOCATION_B :  req.body.LOCATION_B,
    LOCATION_C :  req.body.LOCATION_C,
} 
  try {
    async.waterfall(
      [
        (cb) => {
          weatherDao.connect(cb);
        },
        (conn, cb) => {
          weatherDao.getLocation(conn, data, cb);
        }
      ],
      (error, conn, result) => {
        if( conn ){
          weatherDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          return res.json(result);
        }
      }
    )
  }
  catch (error) {
    console.error(error);
    return res.json({
      message: 'fail',
      code: 200,
      error: error
    });
  }
})

  router.post('/PYTHONTEST',function (req,res){
    console.log('PYTHONTEST')

    let loc = req.body.loc;
    
    res.set('Content-Type', 'text/plain');

    let options = {
        mode: 'text',
        args : [loc],
        pythonPath: '',
        pythonOptions: ['-u'], // get print results in real-time
        encoding: '',
        scriptPath: 'C:/nodejs/jwt/public/python',
      };

      PythonShell.run('weatherMain.py', options, (err, results) => {
    
        if (err) throw err;
        console.log('안녕하세요');
        //console.log(results)
        function replaceAll(strTemp, strValue1, strValue2){
            while(1){
                if( strTemp.indexOf(strValue1) != -1 )
                    strTemp = strTemp.replace(strValue1, strValue2);
                else
                    break;
            }
            return strTemp;
        }
       // let strTem = replaceAll(results.toString(),"\\","%");
        //console.log('str ' , strTem )
        let decodingStr = unescape(replaceAll(results.toString(),"\\","%"));
        let splitList = decodingStr.split(',');
        let weatherList = splitList.map( item => replaceAll(item,'"',''));
        console.log(weatherList);
       // var strContents =  Buffer.from(results);
       // let decodingString = (iconv.decode(strContents,'UTF-8').toString());
        //console.log('results: %j', value);
    
        // ,"TIME","14시","15시","16시","17시","18시","21시","내일 00시",
        // "03시","00시","03시","06시","WEATHER","흐림","맑음","맑음",
        // "맑음","맑음","맑음","맑음","구름조금","맑음","구름조금",
        // "구름조금",
        // "TEMPERATURE",
        // "17","17","16","14","13","5","2","0","2","0","-1",
        // "response","06:13","18:58"]
        
        let arr =["TIME", "WEATHER","TEMPERATURE","HUMIDITY","proPrecipitation","precipitation"]
        let timeList = [];
        let weatherDetailList = [];
        let humidityList = [];
        let temperatureList = [];
        let proPrecipitationList = [];
        let precipitation =[];

        let weatherInfo = [];
        let idx = 0;

        for(let i = 0; i < weatherList.length; i++){
          if( weatherList[i] === arr[idx]){
            idx += 1;
            continue;
          }
          if(idx == 1){
            timeList.push(weatherList[i])
          }
          if(idx == 2){
            weatherDetailList.push(weatherList[i])
          }
          if(idx == 3){
            temperatureList.push(weatherList[i])
          }
          if(idx == 4){
            humidityList.push(weatherList[i])
          }
          if(idx == 5){
            proPrecipitationList.push(weatherList[i])
          }
          if(idx == 6){
            if(weatherList[i] === "response" ){
              break;
            }
            precipitation.push(weatherList[i])
          }


        }
        weatherInfo.push(timeList) //시간
        weatherInfo.push(weatherDetailList) //날씨 한글 축약
        weatherInfo.push(temperatureList) //온도
        weatherInfo.push(humidityList)     //습도
        weatherInfo.push(proPrecipitationList) // 강수확률
        weatherInfo.push(precipitation)     //강수량


        
        let testData = []
        for(let i = 0; i < timeList.length; i++){
          testData.push([ timeList[i], parseInt(temperatureList[i])])
        }
        //seriesData = [['1시',5],['13시',4],['18시',8]];   
        
        res.send(weatherInfo);
      });

         
});
module.exports = router;
