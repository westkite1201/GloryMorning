import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'


export const updatePassword = ( mem_email, 
                                mem_password_origin,
                                mem_password_new_1,
                                mem_password_new_2 ) => {
  console.log('updatePassword')
  const tokenStr = localStorage.getItem('access_token');
  const data ={
    mem_email : mem_email,
    mem_password_origin : mem_password_origin,
    mem_password_new_1 : mem_password_new_1,
    mem_password_new_2 : mem_password_new_2

  }
  
  return(axios.post("http://localhost:3031/api/user/updatePassword",  data, { headers: { "x-access-token" : `${tokenStr}`} } )) 
}





export const updateMemberSosok = (mem_sosok_nm, mem_email) => {

  const tokenStr = localStorage.getItem('access_token');
  console.log(tokenStr)
  const data ={
    mem_sosok_nm : mem_sosok_nm,
    mem_email : mem_email
  }
  
  return(axios.post("http://localhost:3031/api/user/updateMemberSosok",  data, { headers: { "x-access-token" : `${tokenStr}`} } )) 
}



export const getMemberInfo = (mem_email) => {

  const tokenStr = localStorage.getItem('access_token');
  console.log(tokenStr)
  const data ={
    mem_email : mem_email
  }
  
  return(axios.post("http://localhost:3031/api/user/getMemberInfo",  data, { headers: { "x-access-token" : `${tokenStr}`} } )) 
}


/* 로그인 */
export const login = (mem_email, mem_password) => {
    const data = {
      mem_email : mem_email,
      mem_password: mem_password,
    }
    return (axios.post("http://localhost:3031/api/auth/login",data));
   // return (axios.post("http://localhost:3031/api/login",data));
  }

  export const setMemberSignUp = (mem_username, mem_email, mem_password, mem_sosok_nm, mem_gb_cd) => {
    const data = {
      mem_username: mem_username,
      mem_userid : mem_email,
      mem_email : mem_email,
      mem_password: mem_password,
      mem_sosok_nm: mem_sosok_nm,
      mem_gb_cd : mem_gb_cd
    }
    return (axios.post("http://localhost:3031/api/auth/setMemberSignUp",data));
    //return (axios.post("http://localhost:3031/api/member/setMemberSignUp",data));
  }

  export const setUserBackground = (userId, backgroundURL) => {
    const data = {
      userId  :userId,
      backgroundURL : backgroundURL,
    }
    return (axios.post(cilentConfig.endpoint.api + "/bus/setUserBackground",data));
  }
  export const getUserBackground = () => {
    const data = {
      userId  :userId,
    }
    return (axios.post(cilentConfig.endpoint.api + "/bus/getUserBackground",data));
  }