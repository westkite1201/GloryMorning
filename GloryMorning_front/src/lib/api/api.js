import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'


/* 회원가입  */

 export const test = (mem_username, mem_email, mem_password, mem_sosok_nm, mem_gb_cd) =>{
     const data = {
        mem_username: mem_username,
        mem_userid : mem_email,
        mem_email : mem_email,
        mem_password: mem_password,
        mem_sosok_nm: mem_sosok_nm,
        mem_gb_cd : mem_gb_cd
      }
      return (axios.post(cilentConfig.endpoint.api + "/member/setMemberSignUp",data));
      //return (axios.post("http://localhost:3031/api/member/test",data));
}



































