import { observable, action, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment'
import io from 'socket.io-client';
import * as _ from 'lodash';
import * as helpers from  '../lib/helpers'
import * as weatherApi from  '../lib/api/weatherApi'
import {isEmpty} from 'lodash' 
import clientConfig from '../configuration/clientConfig'
const MODE = "PRIVATE_MODE" // PRIVATE_MODE 모드 DEFAULT 세팅 없음 개인 유저키로 운영
export default class WeatherStore {
    
                              
    @observable timeSocket = null
    @observable timeObj = {
      hour : '',
      minute : '',
      second : '',
    }

    //LEGACY
    @observable error = null
    @observable isFetchingRain = false
    @observable isFetchingTemp = false
    @observable isFetchingHumi = false

    @observable dustInfoObject = { 
      //초 미세먼지 
      dustMessageInfoPm10 : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      //미세먼지 
      dustMessageInfoPm25 : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      //오존
      dustMessageInfoO3 : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      //일산화탄소
      dustMessageInfoCo : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      //이산화
      dustMessageInfoNo2 : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      //아황산
      dustMessageInfoSo2 : {
        InfoHeader : '',
        infoIcon : '',
        infoMessage : '',
        level : '',
        color : '',
      },
      addr: "",
      coGrade: "",
      coValue: "",
      dataTerm: "",
      dataTime: "",
      distance: 0,
      khaiGrade: "",
      khaiValue: "",
      mangName: "",
      no2Grade: "",
      no2Value: "",
      numOfRows: "",
      o3Grade: "",
      o3Value: "",
      pageNo: "",
      pm10Grade: "",
      pm10Grade1h: "",
      pm10Value: "",
      pm10Value24: "",
      pm25Grade: "",
      pm25Grade1h: "",
      pm25Value: "",
      pm25Value24: "",
      resultCode: "",
      resultMsg: "",
      rnum: 0,
      serviceKey: "",
      sidoName: "",
      so2Grade: "",
      so2Value: "",
      stationCode: "",
      stationName: "",
      totalCount: "",
      ver: "",
      _returnType: "",
    }
    @observable weatherInfObject = {
      baseTime : '',
      baseDate : '',
      weatherclassNames : '',
      weatherInfoName : '',
      temperatureNow : '',
      rainNow : '',
      humidityNow : ''
    }

    @observable weatherClassName = ''
    @observable temperatureNow = ''
    @observable weatherInfoData = []
    @observable weatherData = []
    @observable rainData = [];
    @observable humidityData = [];
    @observable temperatureData = [];
    @observable nowLocation = '서울역 날씨'



    @observable isFetchingSky = false
    @observable isFetchingRain = false
    @observable isFetchingRainmm = false
    @observable isFetchingTemp = false
    @observable isFetchingHumi = false



    @observable humidityDataList = [];  //습도 
    @observable rainfallDataList = []; //강수확률
    @observable rainfallmmDataList =[]; //강수량
    @observable skyDataList =[]; //날씨
    @observable temperatureDataList =[]; //온도 

    @observable currentX = null; // 좌표 X
    @observable currentY = null; // 좌표 Y

    @observable LocationA='';
    @observable LocationB='';
    @observable LocationC='';



    @action
    setHumidityDataListEmpty = () => {
      this.humidityDataList = []
    }
    @action
    setRainfallDataListEmpty = () => {
      this.rainfallDataList = []
    }
    @action
    setRainfallmmDataEmpty = () => {
      this.rainfallmmDataList = []
    }
    @action
    setSkyDataListEmpty = () => {
      this.skyDataList = []
    }    
    @action
    setTemperatureDataListEmpty = () => {
      this.temperatureDataList = []
    }

    @action
    setSocketConnection = () => {
      console.log("[SetSocketConnectio]")
      if (isEmpty(this.timeSocket)) {
        const timeSocket = io('http://localhost:3031/time');
        // console.log(socket)
        timeSocket.on('connect',() => { 
          console.log('[seo] connected')
        });
        this.timeSocket = timeSocket;
        

        /* socketIo를 통한 시계 구현  */
        timeSocket.on("getTime", (data) => {   
          console.log("data!", data.count)
          if( !_.isNil(data.serverTime)){
              this.timeObj = data.serverTime
          }
      })
    }
    }
    @action 
    getTimeIntervalStart = () => {
      this.timeSocket.emit("time",'getTimeStart');
    }

    @action
    setSocketDisconnect =() =>{
      console.log("[SEO] setSocketDisconnect")
      this.timeSocket.emit('disconnect', 'disconnect')
      //this.timeSocket = null;
    }

  

    @action
    getAreaRiseSetInfo = async() => { 
      try{
        let response =  await weatherApi.getAreaRiseSetInfo();
        let resData=  response.data.data;
        return resData.response.body.items;
      }catch(e){
        console.log('error' , e)
      }

    }




    //현재 위치 알것  nowGeolocation이용 
    //현재 위치 에서 가장 근처에 있는 측정소를 찾을 것 
    //가장 근처에 있는 측정소 미세먼지 정보 RETURN 
    @action
    getDustInfo = async() => {
      console.log("[SEO] getDustInfo1")
      let locationInfo = await this.nowGeolocation()
      try{
        console.log("[SEO] getDustInfo2 locationInfo", locationInfo)
        let tmCordinate = await this.getCordinate('TM', locationInfo);
        console.log("[SEO] getDustInfo3")
        console.log('[SEO]  tmCordinate ' ,tmCordinate)
        let tmX = tmCordinate.x;
        let tmY = tmCordinate.y;
        const response = await weatherApi.getNearbyMsrstnList(tmX, tmY);
        console.log("[SEO] getNearbyMsrstnList ", response)
        if ( response.status === 200  && response.statusText === "OK"){
          let dustInfoObject = response.data;

              dustInfoObject.dustMessageInfoPm10 = helpers.getDustIcon("pm10",parseInt(dustInfoObject.pm10Value))
              dustInfoObject.dustMessageInfoPm25 = helpers.getDustIcon("pm25",parseInt(dustInfoObject.pm25Value))
              dustInfoObject.dustMessageInfoO3 = helpers.getDustIcon("o3",parseInt(dustInfoObject.o3Value))
              dustInfoObject.dustMessageInfoCo = helpers.getDustIcon("co",parseInt(dustInfoObject.coValue))
              dustInfoObject.dustMessageInfoNo2 = helpers.getDustIcon("no2",parseInt(dustInfoObject.no2Value))
              dustInfoObject.dustMessageInfoSo2 = helpers.getDustIcon("so2",parseInt(dustInfoObject.so2Value))
              console.log("[SEO] dustInfoObject ", dustInfoObject, dustInfoObject.length)

            this.dustInfoObject = dustInfoObject;
          
        }
      }catch(e){
        console.log("error" , e)
      }
    }
 


    

    @action
    getWeatherDataShortTerm = async() => {
      let locationInfo = await this.nowGeolocation();
      let riseSetInfo = await this.getAreaRiseSetInfo();
      console.log("[SEO][getWeatherDataShortTerm] RiseSetInfo", riseSetInfo)
      console.log("[SEO][getWeatherDataShortTerm] locationInfo", locationInfo)
      let dayTimeYn = riseSetInfo.item.isDayTimeYn;
      console.log("[SEO][getWeatherDataShortTerm] dayTimeYn", dayTimeYn)
      let responsedata = this.convert(locationInfo.currentY, locationInfo.currentX);
      console.log("[Seo][getWeatherDataShortTerm] getWeatherDataShortTerm ", responsedata )
      let nx = responsedata.x;
      let ny = responsedata.y;
      try{
        let response;
        if( MODE ==='MEMBER_MODE'){
            response = await weatherApi.getWeatherDataShortTerm( 
            nx, 
            ny,
          );
          }
          else if ( MODE ==='PRIVATE_MODE') {
            response = await weatherApi.getWeatherDataPrivateMode( 
              nx, 
              ny,
              true
              );
          }
        let sky;  //날씨  
        let pty;  //강수형태 
        let temperatureNow;
        let humidityNow;
        let rainNow; 
        let baseDate;
        let baseTime;
        let weatherInfo;
        if( MODE === 'PRIVATE_MODE'){
            let responseData= response.data.data.response.body;
            //console.log("responseData" , responseData)
            weatherInfo = responseData.items.item;

            weatherInfo.map((item) =>{
              //console.log('item', item.CATEGORY)
              if( item.category === 'SKY'){
                sky = parseInt(item.fcstValue); 
              }
              if( item.category === 'PTY'){
                pty = parseInt(item.fcstValue); 
              }
              if( item.category === 'T1H') {
                temperatureNow = parseInt(item.fcstValue);
              }
              if( item.category === 'RN1') {
                rainNow = item.fcstValue;
              }
              if( item.category === 'REH') {
                humidityNow = parseInt(item.fcstValue);
              }
              baseDate = item.baseDate;
              baseTime = item.baseTime;
          })
          let skyInfoStr = String(sky) + String(pty)
          let weatherInfoData = this.getWeatherClassName(skyInfoStr, dayTimeYn)
          let weatherInfObject= {
            baseDate : baseDate,
            baseTime : baseTime,
            weatherClassName : weatherInfoData.weatherClassName,
            weatherInfoName : weatherInfoData.weatherInfoName,
            temperatureNow : temperatureNow,
            rainNow : rainNow,
            humidityNow : humidityNow
          }
          this.weatherInfObject = weatherInfObject;
        }
        if( MODE ==='MEMBER_MODE'){
          weatherInfo = response.data
          //console.log(weatherInfo)
          weatherInfo.map((item) =>{
              //console.log('item', item.CATEGORY)
              if( item.CATEGORY === 'SKY'){
                sky = parseInt(item.FCST_VALUE); 
              }
              if( item.CATEGORY === 'PTY'){
                pty = parseInt(item.FCST_VALUE); 
              }
              if( item.CATEGORY === 'T1H') {
                temperatureNow = parseInt(item.FCST_VALUE);
              }
              if( item.CATEGORY === 'RN1') {
                rainNow = item.FCST_VALUE;
              }
              if( item.CATEGORY === 'REH') {
                humidityNow = parseInt(item.FCST_VALUE);
              }
              baseDate = item.BASE_DATE;
              baseTime = item.BASE_TIME;
          })
          let skyInfoStr = String(sky) + String(pty)

          //.temperatureNow = temperatureNow;
          //this.weatherClassName = this.getWeatherClassName(skyInfoStr)
          //this.weatherInfoData = weatherInfo;
          let weatherInfoData= this.getWeatherClassName(skyInfoStr, dayTimeYn)
          let weatherInfObject= {
            baseDate : baseDate,
            baseTime : baseTime,
            weatherClassName : weatherInfoData.weatherClassName,
            weatherInfoName : weatherInfoData.weatherInfoName,
            temperatureNow : temperatureNow,
            rainNow : rainNow,
            humidityNow : humidityNow
          }
          this.weatherInfObject = weatherInfObject;
      }
      }catch(e){
        console.log(e)
      }
    }

    getWeatherClassName =(skyInfoStr, dayTimeYn) =>{
      let className = ''
      let weatherInfoName = ''
      // sky 
      // ① 1 : 맑음
      // ② 2 : 구름조금
      // ③ 3 : 구름많음
      // ④ 4 : 흐림

      // pty 
      // ① 0 : 없음
      // ② 1 : 비
      // ③ 2 : 비/눈
      // ④ 3 : 눈/비
      // ⑤ 4 : 눈
      switch (skyInfoStr) {
        //맑음 
        case "10" :
          className = dayTimeYn ? 'wi wi-day-sunny' : 'wi wi-night-clear'
          weatherInfoName = '맑음'
          break;

        case "20" :
          className = dayTimeYn ? 'wi wi-day-cloudy' : 'wi wi-night-alt-cloudy'
          weatherInfoName = '구름 적음'
          break;
        case "21" :
            className = dayTimeYn ? 'wi wi-day-rain' : 'wi wi-night-alt-rain'
            weatherInfoName = '구름 적고 비'
          break;
        case "22" :
            className =  dayTimeYn ?  'wi wi-day-sleet' : 'wi wi-night-alt-sleet'
            weatherInfoName = '구름 적고 비 또는 눈'
          break;
        case "23" :
            className =  dayTimeYn ?  'wi wi-day-sleet' :  'wi wi-night-alt-sleet'
            weatherInfoName = '구름 적고 눈 또는 비'
          break;
        case "24" :
            className =  dayTimeYn ?  'wi wi-day-snow' :  'wi wi-night-alt-snow'
            weatherInfoName = '구름 적고 눈'
          break;


        case "30" :
            className =  dayTimeYn ? 'wi wi-cloud' :  'wi wi-night-alt-cloudy'
            weatherInfoName = '구름 많음'
            break;
        case "31" :
            className =  dayTimeYn ? 'wi wi-rain' : 'wi wi-night-alt-rain'
            weatherInfoName = '구름 많고 비'
            break;
        case "32" :
            className =  dayTimeYn ? 'wi wi-sleet' :'wi wi-night-alt-sleet'
            weatherInfoName = '구름 많고 비 또는 눈'
            break;
        case "33" :
            className =  dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet'
            weatherInfoName = '구름 많고 눈 또는 비'
            break;
        case "34" :
            className =  dayTimeYn ? 'wi wi-snow' : 'wi wi-night-alt-snow'
            weatherInfoName = '구름 많고 눈 '
            break;

        case "40" :
            className = dayTimeYn ? 'wi wi-cloudy' :   'wi wi-night-alt-cloudy'
            weatherInfoName = '흐림'
            break;
        case "41" :
            className = dayTimeYn ?'wi wi-rain' : 'wi wi-night-alt-rain'
            weatherInfoName = '흐리고 비'
            break;
        case "42" :
            className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet'
            weatherInfoName = '흐리고 비 또는 눈'
            break; 
        case "43" :
            className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet'
            weatherInfoName = '흐리고 눈 또는 비'
            break;
          case "44" :
            className = dayTimeYn ? 'wi wi-snow' : 'wi wi-night-alt-snow'
            weatherInfoName = '흐리고 눈'
            break;

        default :
          break;
      }
      //---------weather code 

      // 10 맑음  wi-day-sunny 
      //-- 존재 불가 
      // 11  맑음 비 
      // 12  맑은 비/눈
      // 13  맑은 눈/비
      // 14  맑은 눈 
      

      // 20 구름조금    wi-day-cloudy
      // 21  구름조금 비   wi-day-rain
      // 22  구름조금 비/눈 wi-day-sleet
      // 23  구름조금 눈/비   wi-day-sleet
      // 24  구름조금 눈  wi-day-snow

      // 30 구름많음 wi-cloud
      // 31  구름많음 비  wi-rain
      // 32  구름많음 비/눈 wi-sleet
      // 33  구름많음 눈/비  wi-sleet
      // 34  구름많음 눈   wi-snow


      // 40  흐림 wi-cloudy
      // 41  흐림 비  wi-rain
      // 42  흐림 비/눈  wi-sleet
      // 43  흐림 눈/비   wi-sleet
      // 44  흐림 눈  wi-snow
      return { weatherClassName : className,
                weatherInfoName : weatherInfoName } 
    }

    /* gps 좌표를 바탕으로 
      현재 gps 세팅함 
    */


  getPosition =  (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  
    @action 
    nowGeolocation = async() => {
      console.log("[SEO][nowGeolocation]")
      if (navigator.geolocation) { // GPS를 지원하면
        try{
          let position = await this.getPosition();
          console.log("[SEO][nowGeolocation] POSITION 이거 확인해 " , position)
          console.log("[SEO][nowGeolocation] ", position.coords.latitude + ' ' + position.coords.longitude);
          this.currentX = position.coords.longitude
          this.currentY = position.coords.latitude
          let currentX = position.coords.longitude
          let currentY = position.coords.latitude
          let locationInfo = await this.getLocationName(currentX, currentY);
          return locationInfo;
        }catch(e){
          alert('에러')
          console.log("error " , e)
        } 
      }else{
        alert('GPS를 지원하지 않습니다');
      }
    }

    //1. 현재 위치 받아오기
    //2. 현재 위치에 대한 data insert시켜 
    // weatherChain = async() =>{
    //   weatherApi.insertWeatherData();
    // }

    checkisLocationSet = () => {
      //X Y 좌표를 아직 세팅을 안했다면   
      //5초마다 세팅을 하게 함 
      if ( _.isNil(this.currentX) || _.isNil(this.currentY) ){
        this.setInterval(()=>{
          this.nowGeolocation()
        },3000)
      }
    }
    
  
    @action
    getLocationName = async(currentX , currentY) => {  //현재 x,y 에 대한 동네 위치 요청 
      //console.log("axiosTest!!")
      // _.isNil(this.currentX) ? this.currentX = 127.10459896729914 : this.currentX = this.currentX
      // _.isNil(this.currentY) ? this.currentY = 37.40269721785548 : this.currentY = this.currentY 
      console.log("[SEO][getLocationName] currentX ,   currentY", currentX, currentY)
      
      //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
      try{
        //오류날 경우 반복 요청해야하나?
        const res = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?', {
          params: { // query string
            // x: '127.10459896729914',
            // y: '37.40269721785548'
            x : currentX.toString(),
            y : currentY.toString(),
          },
          headers: { // 요청 헤더
            'Authorization': clientConfig.apiKeys.kakaoApiKey
          },
          timeout: 3000 // 3초 이내에 응답이 오지 않으면 에러로 간주
        })
         //카카오톡에 요청 
        if(res.data.documents) {
            let resData = res.data.documents[1];
            let LocationA = resData.region_1depth_name
            let LocationB = resData.region_2depth_name
            let LocationC = resData.region_3depth_name
            this.LocationA = LocationA
            this.LocationB = LocationB
            this.LocationC = LocationC
            console.log("[SEO][getLocationName] LocationA LocationB, LocationC", LocationA, LocationB ,LocationC )
            return {
              LocationA : LocationA,
              LocationB : LocationB,
              LocationC : LocationC,
              currentX : currentX,
              currentY : currentY,
            }
            //this.getTmCordinate();
        }else{
          return {
            LocationA : '',
            LocationB : '',
            LocationC : '',
            currentX : currentX,
            currentY : currentY,
          }
        }
      }catch(e){
        console.log("[SEO][getLocationName][ERROR] ", e)
        alert('[에러] 현재 동네 위치를 알수가 없습니다. 인터넷 연결을 확인해주세요 ')
        return {
          LocationA : '',
          LocationB : '',
          LocationC : '',
          currentX : currentX,
          currentY : currentY,
        }
      
      }
    }
    
    /* tm 좌표를 가져옴  */
    /* 미세먼지 좌표를 위한  */
    @action
    getCordinate= async(outputCoord, locationInfo) => {  //현재 x,y 에 대한 동네 위치 요청 
      console.log("[SEO][getCordinate]!!", locationInfo)
      // _.isNil(this.currentX) ? this.currentX = 127.10459896729914 : this.currentX = this.currentX
      // _.isNil(this.currentY) ? this.currentY = 37.40269721785548 : this.currentY = this.currentY 
      //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
      try{
        //?x=160710.37729270622&y=-4388.879299157299&input_coord=WTM&output_coord=WGS84" 
        const response = await axios.get("https://dapi.kakao.com/v2/local/geo/transcoord.json?", {
          params: { // query string
            // x: '127.10459896729914',
            // y: '37.40269721785548'
            x : locationInfo.currentX.toString(),
            y : locationInfo.currentY.toString(),
            input_coord : 'WGS84',
            output_coord : outputCoord
          },
          headers: { // 요청 헤더
            'Authorization': clientConfig.apiKeys.kakaoApiKey
          },
          timeout: 3000 // 1초 이내에 응답이 오지 않으면 에러로 간주
        });
        if(response.data.documents) {
            let resData = response.data.documents;
            //console.log("resData ", resData[0])
            return resData[0]
          }else{
            return false;
        }
      
      }catch(e){
        console.log(e)
      }
    }





 
    /*
      REH = humi
      POP = rain
      PTY = rainmm
      SKY = sky
      T3H = temperture

      == SKY CODE ==  
      ① 1 : 맑음
      ② 2 : 구름조금
      ③ 3 : 구름많음
      ④ 4 : 흐림
    */
    @action
    //X,Y가 거꾸로 되어 있는거 같음 
    getWeatherData = async(category) =>{
      let locationInfo = await this.nowGeolocation();
      console.log("[SEO][getWeatherData] locationInfo ", locationInfo)
      // _.isNil(this.currentY) ? nx = 37 : nx = parseInt(this.currentY)
      // _.isNil(this.currentX) ? ny = 126 : ny = parseInt(this.currentX)
      let responsedata = this.convert(locationInfo.currentY, locationInfo.currentX);
    
      let nx = responsedata.x;
      let ny = responsedata.y;
      let response;
      try{
        if( category ==='REH'){ this.isFetchingHumi = true }
        if( category ==='POP'){ this.isFetchingRain = true }
        if( category ==='R06'){ this.isFetchingRainmm = true }
        if( category ==='SKY'){ this.isFetchingSky = true }
        if( category ==='T3H'){ this.isFetchingTemp = true }
        if( MODE ==='MEMBER_MODE'){
        response = await weatherApi.getWeatherData( 
            nx, 
            ny,
            category
        );
        }
        else if ( MODE ==='PRIVATE_MODE') {
          response = await weatherApi.getWeatherDataPrivateMode( 
            nx, 
            ny,
            false
            );

        }
 
        if (response.statusText === "OK") { //포스트 작성 성공 
          let weatherArray;
  
          if( MODE ==='MEMBER_MODE'){
            weatherArray = response.data
          }
          else if ( MODE ==='PRIVATE_MODE') {
            let responseData= response.data.data.response.body;
            weatherArray = responseData.items.item;
          }
        

          //console.log(weatherArray)
          if( MODE === 'MEMBER_MODE'){
          switch (category) {
            case "REH" :
              this.humidityDataList = weatherArray.map((item) => {
               // console.log(item)
                let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm') 
      
                return ([
                  ((momentobj._d).valueOf() ) ,
                  parseInt( item.FCST_VALUE) ,
                ])
              })
              this.isFetchingHumi = false;
              break;
            case 'POP' :
              this.rainfallDataList = weatherArray.map((item) => {
                let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm') 
                return ([
                  ((momentobj._d).valueOf()  ),
                  parseInt( item.FCST_VALUE) ,
                ])
              })
              this.isFetchingRain = false
              break;
            case 'R06' :
              this.rainfallmmDataList = weatherArray.map((item) => {
                //console.log("R06!!!", item)
                let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm') 
                return ([
                  ((momentobj._d).valueOf() ) ,
                  parseInt( item.FCST_VALUE) ,
                ])
              })
              this.isFetchingRainmm = false
              break;
            case 'SKY' :
              this.skyDataList = weatherArray.map((item) => {
                let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm') 
                return ([
                  ((momentobj._d).valueOf())  ,
                  parseInt( item.FCST_VALUE) ,
                ])
              })
              this.isFetchingSky = false
              break;
            case 'T3H' :
              this.temperatureDataList = weatherArray.map((item) => {
                let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm') 
                return ([
                  ((momentobj._d).valueOf()  ),
                  parseInt( item.FCST_VALUE) ,
                ])
              })
              this.isFetchingTemp = false
              break;
            default :
              alert('선택한 값이 없습니다.');
              break;
            }
          }
          else if ( MODE ==='PRIVATE_MODE') {
            weatherArray =  weatherArray.filter((item) =>{
              if (item.category === category){
                return item;
              }
            })
            switch (category) {
              case "REH" :
                this.humidityDataList = weatherArray.map((item) => {
                  let momentobj = moment(String(item.fcstDate) + String(item.fcstTime), 'YYYYMMDDHHmm') 
                  //console.log(momentobj)
                  return ([
                    ((momentobj._d).valueOf() ) ,
                      parseInt( item.fcstValue) ,
                  ])
                })
                this.isFetchingHumi = false;
                break;
              case 'POP' :
                this.rainfallDataList = weatherArray.map((item) => {
                  let momentobj = moment(String(item.fcstDate) + String(item.fcstTime), 'YYYYMMDDHHmm') 
                  return ([
                    ((momentobj._d).valueOf()  ),
                    parseInt( item.fcstValue) ,
                  ])
                })
                this.isFetchingRain = false
                break;
              case 'R06' :
                this.rainfallmmDataList = weatherArray.map((item) => {
                 // console.log("R06!!!", item)
                  let momentobj = moment(String(item.fcstDate) + String(item.fcstTime), 'YYYYMMDDHHmm') 
                  return ([
                    ((momentobj._d).valueOf() ) ,
                    parseInt( item.fcstValue) ,
                  ])
                })
                this.isFetchingRainmm = false
                break;
              case 'SKY' :
                this.skyDataList = weatherArray.map((item) => {
                  let momentobj = moment(String(item.fcstDate) + String(item.fcstTime), 'YYYYMMDDHHmm') 
                  return ([
                    ((momentobj._d).valueOf())  ,
                    parseInt( item.fcstValue) ,
                  ])
                })
                this.isFetchingSky = false
                break;
              case 'T3H' :
                this.temperatureDataList = weatherArray.map((item) => {
                  let momentobj = moment(String(item.fcstDate) + String(item.fcstTime), 'YYYYMMDDHHmm') 
                  return ([
                    ((momentobj._d).valueOf()  ),
                    parseInt( item.fcstValue) ,
                  ])
                })
                this.isFetchingTemp = false
                break;
              default :
                alert('선택한 값이 없습니다.');
                break;
            }
          }
        } 
      }catch(e){
        console.log(e)
      }
    }




  
      @action
      getAllWeatherData = async(locationA, locationB, locationC) =>{
        try{ 
          this.isFetchingHumi = true
          this.isFetchingRain = true
          const response = await weatherApi.getLocation( 
                                                        locationA, 
                                                        locationB,
                                                        locationC
                                                      );
        if (response.statusText === "OK") { //포스트 작성 성공 
            //console.log(response)
            let responseData= response.data.response.body;
            let weatherArray = responseData.items.item;
            //console.log(weatherArray)
    
            let rainfallArr = []
            let rainfallmmArr = [];
            let humidityArr = [];
            let skyArr = [];
            let temperatureArr = [] 
            weatherArray.map((item)=>{
              if(item.category ==='POP'){
                rainfallArr.push(item)
              }
              if(item.category ==='PTY'){
                rainfallmmArr.push(item)
              }
              if(item.category ==='REH'){
                humidityArr.push(item)
              }
              if(item.category ==='SKY'){
                skyArr.push(item)
              }
              if(item.category ==='T3H'){
                temperatureArr.push(item)
              }
            })
  
            humidityArr.map((item) => {
              this.humidityDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
            })
            rainfallArr.map((item) => {
              this.rainfallDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
            })
            rainfallmmArr.map((item) => {
              this.rainfallmmDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
            })
            skyArr.map((item) => {
              this.skyDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
            })
            temperatureArr.map((item) =>{
              this.temperatureDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
            })
            
            this.isFetchingHumi = false;
            this.isFetchingRain = false;
          }
        }catch(e){
            console.log(e)
        }
    }
    


    

    @action setWeatherData = (weatherData) => { this.weatherData = weatherData }


    //use naver crawailng 용 함수들 
    //08-02 기준 레거시 
    makeTemperature = (resData, wantApi) => {
      // weatherInfo.push(timeList) //시간
      // weatherInfo.push(weatherDetailList) //날씨 한글 축약
      // weatherInfo.push(temperatureList) //온도
      // weatherInfo.push(humidityList)     //습도
      // weatherInfo.push(proPrecipitationList) // 강수확률
      // weatherInfo.push(precipitation)     //강수량
      //console.log(resData)
      //시간 온도 
      if( wantApi === "TEMPERATURE" ){
        let timeList = resData[0]
       // console.log(timeList);
        let weatherDetailList = resData[1]
        let temperatureList= resData[2];
        
        let chartData = [];
        for(let i = 0; i < timeList.length; i++){
            chartData.push([ timeList[i], parseInt(temperatureList[i])])
        }
        return chartData;
      }
      //습도 
      if( wantApi === "HUMIDITY" ){
        let timeList = resData[0]
        //console.log(timeList);
        let weatherDetailList = resData[1]
        let humidityList= resData[3];
        
        let chartData = [];
        for(let i = 0; i < timeList.length; i++){
            chartData.push([ timeList[i], parseInt(humidityList[i])])
        }
        return chartData;
      }
      //강수량 
      if( wantApi === "RAIN" ){
        let timeList = resData[0]
        //console.log(timeList);
        let weatherDetailList = resData[1]
        let proPrecipitationList = resData[4];
        let precipitationList = resData[5];
        // console.log(proPrecipitationList.length);
        // console.log(precipitationList.length);
        let chartData = [];
        let proTemp = [];
        let preTemp = [];
        for(let i = 0; i < timeList.length; i++){
            proTemp.push([ timeList[i], parseInt(proPrecipitationList[i])])
            //precipitationList[i] 
           
            preTemp.push([ timeList[i],  _.isNaN(parseFloat(precipitationList[i])) ? 0.0 :  
                                          parseFloat(precipitationList[i])])


        }
        chartData.push(proTemp)
        chartData.push(preTemp);
        //console.log('chartData ', chartData)
        return chartData;
      }
    }



    @action
    setInterval = (wantApi) => {
      let playAlert = setInterval(async() =>{
        //console.log('hello', wantApi)
        if(wantApi === "RAIN"){
          this.isFetchingRain = true
          this.rainData = []
        }
        if(wantApi === "HUMIDITY"){
          this.isFetchingHumi = true
          this.humidityData = []
         }
         if(wantApi === "TEMPERATURE"){
          this.temperatureData = []
          this.isFetchingTemp = true
         }
        this.weatherData = []
        this.error = null
        let data = {
          loc : this.nowLocation
        }
        try{
          const response = await axios.post('http://localhost:3031/api/weather/PYTHONTEST',data)         
          //const response = await axios.post('http://localhost:3031/api/bus/get_data')
          if(wantApi === "RAIN"){
            this.rainData = this.makeTemperature(response.data, wantApi )
            this.isFetchingRain = false;  
          }
          if(wantApi === "HUMIDITY"){
              this.humidityData = this.makeTemperature(response.data, wantApi )
              this.isFetchingHumi = false
            }
           if(wantApi === "TEMPERATURE"){
              this.temperatureData = this.makeTemperature(response.data, wantApi )
              this.isFetchingTemp = false      
          }
        }
        
        catch(e){
          console.log(e)
        }
      }, 30000);
    }


    @action 
    getWeather = async( wantApi ) => {
      //this.isFetching = true
      this.weatherData = []
      this.rainData = []
      this.huminityData = []
      this.temperatureData = []
      if(wantApi === "RAIN"){
        this.isFetchingRain = true
      }
      if(wantApi === "HUMIDITY"){
        this.isFetchingHumi = true
       }
       if(wantApi === "TEMPERATURE"){
        this.isFetchingTemp = true
       }
      this.error = null
      let data = {
        loc : this.nowLocation
      }
      try{
        const response = await axios.post('http://localhost:3031/api/weather/PYTHONTEST',data)
        //const response = await axios.post('http://localhost:3031/api/bus/get_data')
        //console.log(response)
        this.isFetching = false
        if(wantApi === "RAIN"){
          this.rainData = this.makeTemperature(response.data, wantApi )
          this.isFetchingRain = false;  
        }
        if(wantApi === "HUMINITY"){
            this.humidityData = this.makeTemperature(response.data, wantApi )
            this.isFetchingHumi = false;  
          }
         if(wantApi === "TEMPERATURE"){
            this.temperatureData = this.makeTemperature(response.data, wantApi )
            this.isFetchingTemp = false;  
          }
         this.setInterval(wantApi); 
        }
        //this.setWeatherData(response.data)
      
      catch(e){
        this.error = true
        console.log(e)
      }
    }


    convert = (xx , yy) =>{
      var RE = 6371.00877; // 지구 반경(km)
      var GRID = 5.0; // 격자 간격(km)
      var SLAT1 = 30.0; // 투영 위도1(degree)
    
      var SLAT2 = 60.0; // 투영 위도2(degree)
      var OLON = 126.0; // 기준점 경도(degree)
      var OLAT = 38.0; // 기준점 위도(degree)
      var XO = 43; // 기준점 X좌표(GRID)
      var YO = 136; // 기1준점 Y좌표(GRID)
    
    // LCC DFS 좌표변환 ( code : 
    //          "toXY"(위경도->좌표, v1:위도, v2:경도), 
    //          "toLL"(좌표->위경도,v1:x, v2:y) )
    //
      function dfs_xy_conv(code, v1, v2) {
        
          var DEGRAD = Math.PI / 180.0;
          var RADDEG = 180.0 / Math.PI;
          
          var re = RE / GRID;
          var slat1 = SLAT1 * DEGRAD;
          var slat2 = SLAT2 * DEGRAD;
          var olon = OLON * DEGRAD;
          var olat = OLAT * DEGRAD;
          
          var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
          sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
          var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
          sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
          var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
          ro = re * sf / Math.pow(ro, sn);
          var rs = {};
          if (code == "toXY") {
              rs['lat'] = v1;
              rs['lng'] = v2;
              var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
              ra = re * sf / Math.pow(ra, sn);
              var theta = v2 * DEGRAD - olon;
              if (theta > Math.PI) theta -= 2.0 * Math.PI;
              if (theta < -Math.PI) theta += 2.0 * Math.PI;
              theta *= sn;
              rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
              rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
          }
          else {
              rs['x'] = v1;
              rs['y'] = v2;
              var xn = v1 - XO;
              var yn = ro - v2 + YO;
              ra = Math.sqrt(xn * xn + yn * yn);
              if (sn < 0.0) {
                ra = -ra;
              }
              var alat = Math.pow((re * sf / ra), (1.0 / sn));
              alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
              
              if (Math.abs(xn) <= 0.0) {
                  theta = 0.0;
              }
              else {
                  if (Math.abs(yn) <= 0.0) {
                      theta = Math.PI * 0.5;
                      if (xn < 0.0){
                        theta = -theta;
                      } 
                  }
                  else theta = Math.atan2(xn, yn);
              }
              var alon = theta / sn + olon;
              rs['lat'] = alat * RADDEG;
              rs['lng'] = alon * RADDEG;
          }
          return rs;
      }
    
    
      var rs = dfs_xy_conv("toXY", xx, yy);
      console.log(rs)
    
      return rs;
    }

}


