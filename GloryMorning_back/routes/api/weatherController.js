var express = require('express');
var router = express.Router();
let {PythonShell } = require('python-shell') 
const weatherDao = require('../../model/mysql/weatherDao')
const async = require('async');
/* 디비 조회하기  */
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
