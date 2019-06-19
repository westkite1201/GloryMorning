import React, { Component } from 'react'
import authHelpers from '../../lib/authHelpers'
import './Login.scss'

import Radio from '@material-ui/core/Radio';
import * as api from '../../lib/api/api'
import * as memberApi from '../../lib/api/memberApi'


import history from '../../history';
import { withAlert } from "react-alert";
import cilentConfig from '../../configuration/clientConfig'
import { withCookies, Cookies } from 'react-cookie';
import WithAuth from '../WithAuth';


const DEBUG = true;
const LOG_DEBUG = true;

const log = DEBUG && LOG_DEBUG ? (msg, ...args) => {
  console.log('[Login] ' + msg, ...args);
} : () => { };

const blue = DEBUG ? (msg, ...args) => {
  console.log('%c[Login] ' + msg, 'color: white; background: blue', ...args);
} : () => { };

const red = DEBUG && LOG_DEBUG ? (msg, ...args) => {
  console.log('%c[Login] ' + msg, 'color: white; background: red', ...args);
} : () => { };


class Login extends Component {

  state = {
    name: '',
    phone: '',
    email: '',
    password: '',
    checkPassword: '',
    sosok_nm: '',

    inOutGubun: '',


    loginEmail: '',
    loginPassword: '',
    invaild: '',

    loginView: true,
    forgetPasswordView : false,

    forgetEmail :'',
  }
  

  signUpClickHandler = (e) =>{
    this.setState({
      loginView : false,
      forgetPasswordView : false,
    }) 
  }
  LoginClickHandler = (e) =>{
    this.setState({
      loginView : true,
      forgetPasswordView : false,
    }) 
  }

  forgetEmailHandler = (e) =>{
    this.setState({
      forgetEmail: e.target.value
    });
  } 


  onInputchange = (e) => {
    if (e.target.name === 'password' ||
      e.target.name === 'checkPassword') {
      this.checkPasswordSame();
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeViewHandler = () => {

    this.setState({
      loginView: !this.state.loginView,
      forgetPasswordView : false
    })
  }


  checkPasswordSame = () => {
    const { password, checkPassword } = this.state;
    if (password === checkPassword) {
      return true
    } else {
      return false
    }
  }

  // 영문, 숫자 혼합하여 6~20자리 이내
  checkValidationPassword = (password) =>{
      let reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      if(!reg_pwd.test(password)){
       return false;
      }
      return true;
  }
     
  /* 회원가입  */
  handleSignInFormSubmit = async e => {
    const { name,
      email,
      password,
      checkPassword,
      sosok_nm,
      inOutGubun } = this.state;

    e.preventDefault();

    /* 중복 체크 */
    // const alreadyExist = await api.getEmailIsAlreadyExist(email)
    // //console.log(alreadyExist)
    // if (alreadyExist.data[0].EXISTFLAG === 'EXIST') {
    //   this.props.alert.error('중복된 이메일입니다. 다시 한번 확인 해주세요!')
    //   this.emailInput.focus();
    //   return
    // }
    /*
    if(!this.checkValidationPassword(password) ){
      this.props.alert.error('패스워드는 영문, 숫자 혼합해서 8~20 입니다.')
      this.passwordInput.focus();
      return
    }
    if(!this.checkValidationPassword(checkPassword) ){
      this.props.alert.error('영문, 숫자 혼합해서 6~20 입니다.')
      return
    }
    if (!this.checkPasswordSame()) {
      this.props.alert.error('패스워드가 다릅니다!')
      this.passwordInput.focus();
      return
    }
    if (inOutGubun === '') {
      this.props.alert.error('구분을 선택해주세요!')
      return
    }
    */


    /* 회원 가입  */
    const id = email;
    let mem_gb_cd = 2 //default
    if (inOutGubun) {
      mem_gb_cd = 2
    } else {
      mem_gb_cd = 3
    }

    //console.log('heelo ', name, email, password, sosok_nm, 'ddd',mem_gb_cd)
     const response = await memberApi.setMemberSignUp(name, email, password, sosok_nm, mem_gb_cd);
     //const response = await api.test(name, email, password, sosok_nm, mem_gb_cd);
    
    //console.log('handleSignInFormSubmit response ' ,response)
    if (response.data.error) {
      //this.props.alert.error('가입신청이 실패했습니다. 다시 시도해주세요')
      return
    }

    if (response.status === 200) {
      //this.sendMailToAdmin('가입요청', email)
      //this.props.alert.success('성공적으로 신청되었습니다. 가입 승인을 기다려 주세요.')
      this.changeViewHandler();
      this.setState({
        name: '',
        phone: '',
        email: '',
        password: '',
        checkPassword: '',
        GB_CD: '',
        sosok_nm: '',
        inOutGubun: '',
      })
    }
    else {
      this.props.alert.error('오류가 발생했습니다. 다시 시도해주세요.')
    }
  };

  /* 가입신청시 Admin에게 가입 요청  */
  sendMailToAdmin = async(emailFlag, mem_userid) =>{
    let admin = cilentConfig.adminEmail
    let emailConfig = {
      emailFlag : emailFlag,
      from : 'cqms.op@digicaps.com',
      to : [ admin,'cqms.digicaps.com' ],
      message: 'toAdmin',
      mem_userid: mem_userid,
    }
    try{
      const response = await api.sendMail(emailConfig);
      //console.log(response)
      if(response.data.code === 100){
        //this.props.alert.success("성공적으로 관리자에게 전송 처리하였습니다.");
      }
      if(response.data.code === 200){
        this.props.alert.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }catch(e){
      console.log(e)
    }
  }



  /* forgetPassword 클릭시 */
  forgetPasswordClick = () => {
    this.setState({
      forgetPasswordView : true,
      loginView : ''
    })
  }




  /*로그인 관련함수 */
  clearForm = () => {
    this.setState({
      loginEmail: '',
      loginPassword: '',
    })
  };

  handleEmailChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      loginEmail: e.target.value
    });
  }
  handlePasswordChange = (e) => {
    this.setState({ loginPassword: e.target.value });
  }

  

  /* login  */
  handleLoginFormSubmit = async e => {
    const { loginEmail, loginPassword } = this.state;
    const { cookies } = this.props;
    //console.log(email , password)

    console.log('cookie ', cookies)    

    e.preventDefault();

    // const id = this.email.value;
    // const password = this.password.value;
    const id = loginEmail;
    
    console.log(id, loginPassword)
    const response = await memberApi.login(id, loginPassword);
    console.log("로그인 리스폰스 " , response);

    blue("로그인 리스폰스 ",response.data.code);
    if ( response.data.code !== 200 ){
      //실패시
      alert('실패');
    }else{
      //성공 
      console.log(response.data.token)
      //cookies.set('x-access-token', response.data.token ); 
      localStorage.setItem("access_token", response.data.token);
      history.push('/board')
   
    }
    // if(){

    // }
    //response.data.token = 
    // if (response.data.code === 100) {
    //   cookies.set('access_token', response.data.token);
    //   cookies.set('user_gb', response.data.gb);
    //   history.push('/main');
    // }
    // else {
    //   if (response.data.code === 200) {
    //     this.props.alert.error('아이디나 비밀번호를 다시 한번 확인해주세요.')
    //     this.clearForm();
    //     //history.push('/home');
    //     this.faildLogin();
    //   }
    //   if (response.data.code === 300) {
    //     this.props.alert.error('존재하지 않는 ID 입니다. 다시 한번 확인해주세요.')
    //     this.clearForm();
    //     //history.push('/home');
    //     this.faildLogin();
    //   }
    //   if (response.data.code === 400) {
    //     this.props.alert.error('가입 승인 대기중입니다.')
    //     this.clearForm();
    //     //history.push('/home');
    //     this.faildLogin();
    //   }
    // }
  };

  faildLogin = () => {
    const { invaild } = this.state;
    this.setState({
      invaild: true
    }, () => {
      setTimeout(() => {
        this.setState({
          invaild: false
        })
      }, 3000)
    })
  }

  gubunRadioChange = (e) => {
    if (e.target.value === '내부사용자') {
      this.setState({
        inOutGubun: true
      })
    } else if (e.target.value === '외부사용자') {
      this.setState({
        inOutGubun: false
      })
    }
  }


  /* 패스워드 전송  */
  handleforgetPasswordFormSubmit = async(e) =>{
    const { forgetEmail } = this.state;
    //console.log(email , password)

    e.preventDefault();
    // const id = this.email.value;
    // const password = this.password.value;
    const id = forgetEmail;

    let emailConfig = {
      emailFlag : '비밀번호요청',
      from : 'cqms.op@digicaps.com',
      to : [forgetEmail],
      message: '비밀번호 요청.',
      mem_userid : forgetEmail
    }

    const response = await api.getForgetPassword(emailConfig);
    
    const resData =response.data;
    console.log(response.data)
    if(resData.code === 300 ) {
      this.props.alert.error('해당 이메일에 대한 정보가 없습니다.')
    }
    else if(resData.code === 100 ){
      this.props.alert.success('메일로 비밀번호를 전송하였습니다.')
      this.setState({
        loginView: !this.state.loginView,
        forgetPasswordView : false,
        forgetEmail : ''
      })
    }
  }




  render() {
    const { loginView, forgetPasswordView } = this.state;
    const { match, confirm } = this.props;
    console.log('@@@@@@@@@@match ' , match, confirm) 
    let radioStyle = {
      float: 'left'
    }
    return (
      <div className='loginWrappingContainer'>
        <div className='form'>
          <div className="userform">
            <ul className="tab-group">
              <li className={loginView === true ? "tab" : loginView === false ? "tab tabActive" : "tab" }><a onClick={this.signUpClickHandler}> Sign Up </a></li>
              <li className={loginView === true ? "tab tabActive" :  loginView === false ? "tab" :  "tab" }><a onClick={this.LoginClickHandler}>Log In</a></li>
            </ul>

            <div className="tab-content">
              { loginView === false ?
                <div id="signup">
                  <div className='bannerText'>
                    <h1>회원가입</h1>
                  </div>
                  <form action="#"
                    method="post"
                    onSubmit={this.handleSignInFormSubmit}>
                    <div className="top-row">
                      <div className="field-wrap">
                        <label className={this.state.name === '' ? 'loginLabel' : 'loginLabel active highlight'} >
                          이름<span className="req">*</span>
                        </label>
                        <input
                          className="loginInput"
                          type="text"
                          required autocomplete="off"
                          name='name'
                          onChange={this.onInputchange}
                          value={this.state.name} />
                      </div>
                      
                      <div className="field-wrap">
                        <label className={this.state.sosok_nm === '' ? 'loginLabel' : 'loginLabel active highlight'} >
                          소속<span className="req">*</span>
                        </label>
                        <input
                          className="loginInput"
                          type="text"
                          required autocomplete="off"
                          name='sosok_nm'
                          onChange={this.onInputchange}
                          value={this.state.sosok_nm} />
                      </div>

                    </div>



                    <div className="field-wrap">
                      <label className={this.state.email === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                        이메일<span className="req">*</span>
                      </label>
                      <input
                        className="loginInput"
                        type="email"
                        required autocomplete="off"
                        onChange={this.onInputchange}
                        value={this.state.email}
                        name='email'
                        ref={(input) => { this.emailInput = input; }}
                      />
                    </div>

                    <div className="field-wrap">

                      <label className={this.state.password === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                        패스워드<span className="req">*</span>
                      </label>

                      <input
                        className="loginInput"
                        type="password"
                        required autocomplete="off"
                        onChange={this.onInputchange}
                        value={this.state.password}
                        name='password'
                        ref={(input) => { this.passwordInput = input; }}
                      />
                    </div>
                    <div className="field-wrap">

                      <label className={this.state.checkPassword === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                        패스워드 재입력<span className="req">*</span>
                      </label>

                      <input
                        className="loginInput"
                        type="password"
                        required autocomplete="off"
                        onChange={this.onInputchange}
                        value={this.state.checkPassword}
                        name='checkPassword'
                      />
                    </div>

                    {/*
                    <div className="field-wrap">
                      <div className='radioContainer'>
                        <div style={radioStyle}>
                          <Radio
                            checked={this.state.inOutGubun === true}
                            onChange={this.gubunRadioChange}

                            value="내부사용자"
                            name="radio-button-demo"
                            label="외부사용자"
                          //aria-label="A"
                          /> 내부사용자
                    </div>
                        <div>
                          <Radio
                            checked={this.state.inOutGubun === false}
                            onChange={this.gubunRadioChange}

                            value="외부사용자"
                            name="radio-button-demo"
                            label="외부사용자"
                          //aria-label="A"
                          />
                          외부사용자
                      </div>
                      </div>
                    </div>
                    */}

                    <button type="submit" className="loginButton button-block" >가입 하기</button>

                  </form>

                </div>

                : loginView === true && forgetPasswordView === false ?
                ( 
                <div id="login">
                  <div className='bannerText'>
                    <h2> One Drop INK </h2>
                  </div>
                  <form action="#"
                    method="post"
                    onSubmit={this.handleLoginFormSubmit}>
                    <div className="field-wrap">
                      <label className={this.state.loginEmail === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                        이메일<span className="req">*</span>
                      </label>
                      <input className="loginInput"
                        type="email"
                        required autocomplete="off"
                        onChange={this.onInputchange}
                        value={this.state.loginEmail}
                        name='loginEmail'
                      />
                    </div>

                    <div className="field-wrap">
                      <label className={this.state.loginPassword === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                        패스워드<span className="req">*</span>
                      </label>
                      <input
                        className="loginInput"
                        type="password"
                        required autocomplete="off"
                        onChange={this.onInputchange}
                        value={this.state.loginPassword}
                        name='loginPassword'
                      />
                    </div>
                    {<p className="forgot" ><a onClick = {this.forgetPasswordClick}>Forgot Password?</a></p>}
                    <button className="loginButton button-block" > 로그인 </button>
                  </form>
                </div>
                )
      
                :
                (
                  <div>
                    <div id="login">
                      <div className='bannerText'>
                          <h2>비밀번호를 잊으셨나요?</h2>
                      </div>
                      <div className='bannerText'>
                          <h4>이메일을 입력해주세요</h4>
                      </div>
                      <div className='bannerText'>
                          <h6 style ={{paddingTop: '10px'}}>해당 이메일로  비밀번호를 보내드립니다.</h6>
                      </div>
                      <div className="field-wrap">
                      </div>
                      <form action="#"
                          method="post"
                          onSubmit={this.handleforgetPasswordFormSubmit}>
                          <div className="field-wrap">
                              <label className={this.state.forgetEmail === '' ? 'loginLabel' : 'loginLabel active highlight'}>
                                  이메일<span className="req">*</span>
                              </label>
                              <input className="loginInput"
                                  type="email"
                                  required autocomplete="off"
                                  onChange={this.onInputchange}
                                  value={this.state.forgetEmail}
                                  name='forgetEmail'
                              />
                          </div>
                          <button className="loginButton button-block" > 보내기 </button>
                      </form>
                  </div>
                </div>
                )
                
                
              
              } 
                                                                                                                                                       

            </div>

  
          </div>
        </div>
      </div>
    )
  }
}
export default (Login);