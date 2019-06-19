import { observable, action, computed } from 'mobx';
import axios from 'axios';
import * as _ from 'lodash';
export default class WeatherStore {
    @observable error = null
    @observable isFetchingRain = false
    @observable isFetchingTemp = false
    @observable isFetchingHumi = false
    @observable weatherData = []
    @observable rainData = [];
    @observable humidityData = [];
    @observable temperatureData = [];
    @observable nowLocation = '서울역 날씨'

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
