import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

/* 회원가입  */

 export const getLocation = (locationA, locationB, locationC) =>{
     const data = {
        LOCATION_A: locationA,
        LOCATION_B : locationB,
        LOCATION_C : locationC,
      }
      return (axios.post(cilentConfig.endpoint.api + "/weather/getLocation_chain",data));
      //return (axios.post("http://localhost:3031/api/member/test",data));
}


