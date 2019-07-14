import { observable, action, computed } from 'mobx';
import axios from 'axios';
import * as _ from 'lodash';
import * as weatherApi from  '../lib/api/weatherApi'
export default class WeatherStore {
    //LEGACY
    @observable error = null
    @observable isFetchingRain = false
    @observable isFetchingTemp = false
    @observable isFetchingHumi = false
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

    @observable currentX; // 좌표 X
    @observable currentY; // 좌표 Y

    @observable LocationA;
    @observable LocationB;
    @observable LocationC;

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


    getLocationName = () => {  //현재 x,y 에 대한 동네 위치 요청 
      console.log("axiosTest!!")
      _.isNil(this.currentX) ? this.currentX = 127.10459896729914 : this.currentX = this.currentX
      _.isNil(this.currentY) ? this.currentY = 37.40269721785548 : this.currentY = this.currentY 
      //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
      try{
        axios.get('https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?', {
          params: { // query string
            // x: '127.10459896729914',
            // y: '37.40269721785548'
            x : this.currentX.toString(),
            y : this.currentY.toString(),
          },
          headers: { // 요청 헤더
            'Authorization': 'KakaoAK 964c43954aeb54d0711aed4e57a588e5'
          },
          timeout: 1000 // 1초 이내에 응답이 오지 않으면 에러로 간주
        }).then(res => {
          //카카오톡에 요청 
          if(res.data.documents) {
            let resData = res.data.documents[1];
            let LocationA = resData.region_1depth_name
            let LocationB = resData.region_2depth_name
            let LocationC = resData.region_3depth_name
            this.LocationA = LocationA
            this.LocationB = LocationB
            this.LocationC = LocationC
            console.log(LocationA, LocationB ,LocationC )
          }
        })
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
    getWeatherData = async( nx ,ny, category ) =>{
      try{
        if( category ==='REH'){ this.isFetchingHumi = true }
        if( category ==='POP'){ this.isFetchingRain = true }
        if( category ==='PTY'){ this.isFetchingRainmm = true }
        if( category ==='SKY'){ this.isFetchingSky = true }
        if( category ==='T3H'){ this.isFetchingTemp = true }

        const response = await weatherApi.getWeatherData( 
          nx, 
          ny,
          category
        );
        console.log(response)
        if (response.statusText === "OK") { //포스트 작성 성공 

          console.log(response)
          let weatherArray= response.data

          switch (category) {
            case "REH" :
              this.humidityDataList = weatherArray.map((item) => {
                return ([item.FCST_TIME.toString(), parseInt( item.FCST_VALUE) ]) 
              })
              this.isFetchingHumi = false;
              break;
            case 'POP' :
              this.rainfallDataList = weatherArray.map((item) => {
                return ([item.FCST_TIME.toString(), parseInt( item.FCST_VALUE) ]) 
              })
              this.isFetchingRain = false
              break;
            case 'PTY' :
              this.rainfallmmDataList = weatherArray.map((item) => {
                return ([item.FCST_TIME.toString(), parseInt( item.FCST_VALUE) ]) 
              })
              this.isFetchingRainmm = false
              break;
            case 'SKY' :
              this.skyDataList = weatherArray.map((item) => {
                return ([item.FCST_TIME.toString(), parseInt( item.FCST_VALUE) ]) 
              })
              this.isFetchingSky = false
              break;
            case 'T3H' :
              this.temperatureDataList = weatherArray.map((item) => {
                return ([item.FCST_TIME.toString(), parseInt( item.FCST_VALUE) ]) 
              })
              this.isFetchingTemp = false
              break;
            default :
              alert('선택한 값이 없습니다.');
              break;
          }
        }
      }catch(e){
        console.log(e)
      }
    }


    
    


    //이걸 한시간 마다 호출하도록 
    /*
    @action
    getWeatherData = async( wantApi ) =>{
      try{ 
        if( wantApi ==='humidity'){ this.isFetchingHumi = true }
        if( wantApi ==='rainfall'){ this.isFetchingRain = true }
        if( wantApi ==='rainfallmm'){ this.isFetchingRainmm = true }
        if( wantApi ==='sky'){ this.isFetchingSky = true }
        if( wantApi ==='temperature'){ this.isFetchingTemp = true }
        //this.isFetchingHumi = true
        //this.isFetchingRain = true
        const response = await weatherApi.getLocation( 
                                                      this.locationA, 
                                                      this.locationB,
                                                      this.locationC
                                                    );
      if (response.statusText === "OK") { //포스트 작성 성공 
          console.log(response)
          let responseData= response.data.response.body;
          let weatherArray = responseData.items.item;
          console.log(weatherArray)
  
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

          console.log(rainfallArr)
          console.log(rainfallmmArr)
          console.log(humidityArr)
          console.log(skyArr)
          console.log(temperatureArr)

          if( wantApi ==='humidity'){
              humidityArr.map((item) => {
                this.humidityDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
              })
          }
          if( wantApi ==='rainfall'){
              rainfallArr.map((item) => {
                this.rainfallDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
              })
          }
          if( wantApi ==='rainfallmm' ){
              rainfallmmArr.map((item) => {
                this.rainfallmmDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
              })
          }
          if( wantApi ==='sky'){
              skyArr.map((item) => {
                this.skyDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
              })
          }
          if( wantApi ==='temperature'){
              temperatureArr.map((item) =>{
                this.temperatureDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
              })
          }

          if( wantApi ==='humidity'){ this.isFetchingHumi = false }
          if( wantApi ==='rainfall'){ this.isFetchingRain = false  }
          if( wantApi ==='rainfallmm'){ this.isFetchingRainmm = false }
          if( wantApi ==='sky'){ this.isFetchingSky = false }
          if( wantApi ==='temperature'){ this.isFetchingTemp = false }

        }
      }catch(e){
          console.log(e)
      }
    }
    */

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
            console.log(response)
            let responseData= response.data.response.body;
            let weatherArray = responseData.items.item;
            console.log(weatherArray)
    
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
    
    makeTemperature = (resData, wantApi) => {
      // weatherInfo.push(timeList) //시간
      // weatherInfo.push(weatherDetailList) //날씨 한글 축약
      // weatherInfo.push(temperatureList) //온도
      // weatherInfo.push(humidityList)     //습도
      // weatherInfo.push(proPrecipitationList) // 강수확률
      // weatherInfo.push(precipitation)     //강수량
      console.log(resData)
      //시간 온도 
      if( wantApi === "TEMPERATURE" ){
        let timeList = resData[0]
        console.log(timeList);
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
        console.log(timeList);
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
        console.log(timeList);
        let weatherDetailList = resData[1]
        let proPrecipitationList = resData[4];
        let precipitationList = resData[5];
        console.log(proPrecipitationList.length);
        console.log(precipitationList.length);
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
        console.log('chartData ', chartData)
        return chartData;
      }
    }



    @action
    setInterval = (wantApi) => {
      let playAlert = setInterval(async() =>{
        console.log('hello', wantApi)
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
        console.log(response)
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

}
