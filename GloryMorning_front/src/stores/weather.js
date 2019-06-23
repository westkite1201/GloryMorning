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



    @observable humidityDataList = [['6시',2],['10시',4]];


    getLocaionName = (cx, cy) => {  //현재 x,y 에 대한 동네 위치 요청 
      console.log("axiosTest!!")
      _.isNil(cx) ? cx = 127.10459896729914 : cx = cx
      _.isNil(cy) ? cy = 37.40269721785548 : cy = cy 
      //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
      try{
        axios.get('https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?', {
          params: { // query string
            // x: '127.10459896729914',
            // y: '37.40269721785548'
            x : cx.toString(),
            y : cy.toString(),
          },
          headers: { // 요청 헤더
            'Authorization': 'KakaoAK 964c43954aeb54d0711aed4e57a588e5'
          },
          timeout: 1000 // 1초 이내에 응답이 오지 않으면 에러로 간주
        }).then(res => {
          //카카오톡애 요청 

          if(res.data.documents) {
            let resData = res.data.documents[1];
            let LocationA = resData.region_1depth_name
            let LocationB = resData.region_2depth_name
            let LocationC = resData.region_3depth_name
            console.log(LocationA, LocationB ,LocationC )
            this.getLocationAtDB(LocationA, LocationB, LocationC)
          }
        })
      }catch(e){
        console.log(e)
      }
    }
    
    @action
    getLocationAtDB = async(locationA, locationB, locationC) =>{
      try{ 
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
          console.log(rainfallArr)
          console.log(rainfallmmArr)
          console.log(humidityArr)
          console.log(skyArr)
          console.log(temperatureArr)

        
          humidityArr.map((item) =>{
            this.humidityDataList.push([item.fcstTime.toString(), parseInt( item.fcstValue) ]) 
          })
        }
      }catch(e){
          console.log(e)
      }
    }


    @action
    fetchingData = () => {

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
