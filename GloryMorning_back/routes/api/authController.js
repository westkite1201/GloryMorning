var express = require('express');
var router = express.Router();
const async = require('async');
const authDao = require('../../model/mysql/authDao')
const token = require('../../src/lib/token')
//const helpers = require('../../lib/helpers');
const crypto = require('crypto');

var bcrypt = require('bcrypt-nodejs');
const authMiddleware = require('../../middlewares/auth')

// /    GET /api/auth/check
const check = (req, res) => {
  console.log('check in');
  res.json({
      success: true,
      info: req.decoded
  })
}
router.use('/check', authMiddleware)
router.get('/check', check)
// (...)



/* 로그인  */
router.post('/login' , (req, res) => {
  console.log('login');
    try{
        const data = {
            mem_email : req.body.mem_email,
            mem_password : req.body.mem_password
        }
        const password = req.body.mem_password;
        console.log('password' , password)
        async.waterfall(
            [
              (cb) => {
                authDao.connect(cb);
              },
              (conn, cb) => {
                authDao.getLoginData(conn, data, cb);
              },
              (conn, data, cb) => { //패스워드 비교 
                if( data.length ){
                    console.log('data[0] ', data[0].mem_password)
                    bcrypt.compare(password, data[0].mem_password, (err, res) => {
                        //console.log(res);
                        if ( err ) { cb( null, conn, {'message' : 'something wrong',
                                                       code : 400 }) } 

                        if ( res ) { //성공시 
                            //console.log(res, 'correct',  data[0].mem_email)
                            //console.log(data[0].mem_email)
                            payload = {
                                mem_idx : data[0].mem_idx, 
                                mem_username: data[0].mem_username,
                                mem_email : data[0].mem_email,
                                gb_cd : data[0].mem_gb_cd
                            }

                            var jwtToken = token.generateToken( payload )
                            
                            cb (null, conn, {
                                             'message' : 'logged in successfully',
                                              token : jwtToken,
                                              code : 200 
                                            });
                        }
                        else {
                           // console.log('dsadsa')
                            cb (null, conn,  { 
                              'message' : 'Your password is incorrect' ,
                              code : 400 // bad Request 
                              });
                              //return done(null, false, {'message' : 'Your password is incorrect'});
                        }
                    });
                }
                else{
                    cb(null, conn, 'your login info is not found')
                }

              }
            ],
            (error, conn, result) => {
                //console.log(conn)
              if( conn ){
                authDao.release(conn);
              }
              if( error ){
                return res.json({
                  code : 500, //서버에러
                  error: error
                });
              }
              else{
                //console.log('result', result)            
                return res.json(result);
              }
            }
          )
        }
        catch (error) {
          console.error(error);
          return res.json({
            message: 'fail',
            code: 500, //서버에러 
            error: error
          });
    }
})







// 영문, 숫자 혼합하여 6~20자리 이내
checkValidationPassword = (password, res) =>{
    let reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if(!reg_pwd.test(password)){
     return false;
    }
    return true;
}

/* 회원가입 */
router.post('/setMemberSignup', async (req, res) => {
    //res.cookie('favorite', favorite);
    if (!checkValidationPassword(req.body.mem_password)){
        return res.json({
          message: 'fail',
          code: 500,
          error: error
        });
    }

    try {
        const data = {
            mem_username: req.body.mem_username,
            mem_userid :  req.body.mem_email,
            mem_email : req.body.mem_email,
            mem_password: req.body.mem_password,
            mem_sosok_nm: req.body.mem_sosok_nm,
            mem_gb_cd : req.body.mem_gb_cd
        }
        const userData = {
            mem_username: req.body.mem_username,
            mem_userid :  req.body.mem_email,
            mem_email : req.body.mem_email,
            mem_password: req.body.mem_password,
            mem_sosok_nm: req.body.mem_sosok_nm,
            mem_gb_cd : req.body.mem_gb_cd
        }
        let password =req.body.mem_password;
      
      async.waterfall(
        [
          (cb) => {
            authDao.connect(cb);
          },
          (conn, cb) => {
            authDao.getEmailIsAlreadyExist(conn, data, cb); //로그인 중복체크 
          },
          (conn, data, cb) => {
            if(data[0].EXISTFLAG === 'NONE'){
                console.log('1')
                bcrypt.genSalt(10, function(err, salt) {
                    if(err){
                        console.log('bcrypt.getSalt() error ', err.message);
                    }else{
                        console.log('password ' , password);
                        bcrypt.hash( password, salt, null, function(err , hash){
                            if( err ){
                                console.log('bcy', err.message)
                            }else{        
                                userData.mem_password = hash
                                authDao.setMemberSignUp(conn, userData, cb);
                            }
                        })
                    }
                })
            }else{
                cb(null, conn, { message: '가입이 되어 있습니다.'})
            }
          },
          (conn, data, cb) => {
            cb(null, conn, data)
          }
        ],
        (error, conn, result) => {
            //console.log(conn)
          if( conn ){
            authDao.release(conn);
          }

          if( error ){
            return res.json({
              message: 'fail',
              code: 500,
              error: error
            });
          }
          else{
            //console.log('result', result)            
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 500,
        error: error
      });
    }
  })















  
  module.exports = router;
