import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

export const getNearbyMsrstnList = (tmX, tmY) =>{
  console.log("getNearbyMsrstnList")
  const data = { 
    tmX : tmX,
    tmY : tmY
  }
  return (axios.post(cilentConfig.endpoint.api + "/weather/getNearbyMsrstnList",data));
}



 export const getLocation = (locationA, locationB, locationC) =>{
     const data = {
        LOCATION_A: locationA,
        LOCATION_B : locationB,
        LOCATION_C : locationC,
      }
      return (axios.post(cilentConfig.endpoint.api + "/weather/getLocation_chain",data));
      //return (axios.post("http://localhost:3031/api/member/test",data));
}




export const getWeatherData = (nx, ny, category) =>{
     const data = {
        nx: nx,
        ny : ny,
        category : category,
      }
      return (axios.post(cilentConfig.endpoint.api + "/weather/getWeatherData",data));
      //return (axios.post("http://localhost:3031/api/member/test",data));
}


export const getWeatherDataShortTerm = (nx, ny) => {
  const data = {
    nx: nx,
    ny : ny,
  }
  return (axios.post(cilentConfig.endpoint.api + "/weather/getWeatherDataShortTerm",data));

}
