var express = require('express');
var router = express.Router();
const async = require('async');
const memberDao = require('../../model/mysql/memberDao')
const authDao = require('../../model/mysql/authDao')
const crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

/* user Controller 는 auth가 지정되어있음  */

// 영문, 숫자 혼합하여 6~20자리 이내
checkValidationPassword = (password, res) =>{
  let reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  if(!reg_pwd.test(password)){
   return false;
  }
  return true;
}
  /* 패스워드 변경   */
  router.post('/updatePassword' , (req, res) => {
    console.log('updatePassword');
      
      if (!checkValidationPassword(req.body.mem_password_origin)){
        return res.json({
          message: 'validation fail_origin',
          code: 500,
          //error: error
        });
      }
      if (!checkValidationPassword(req.body.mem_password_new_1)){
        return res.json({
          message: 'validation fail_new_1',
          code: 500,
          //error: error
        });
      }
      if (!checkValidationPassword(req.body.mem_password_new_2)){
        return res.json({
          message: 'validation fail_new_2',
          code: 500,
          //error: error
        });
      }
      if( req.body.mem_password_new_1 !== req.body.mem_password_new_2){
        return res.json({
          message: 'different new1_2',
          code: 500,
          //error: error
        });
      }
      console.log('ddd')
  
  
      try{

          console.log( req.body )
          const data = {
              mem_email : req.body.mem_email,
              mem_password_origin : req.body.mem_password_origin,
              mem_password_new_1 : req.body.mem_password_new_1,
              mem_password_new_2 : req.body.mem_password_new_2
          }
          let userdata = {
            mem_email : req.body.mem_email,
            mem_password : req.body.mem_password_origin,
         }
  
          const password = req.body.mem_password_origin;
          const changePassword = req.body.mem_password_new_2
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
                          if ( err ) { cb( null, conn, { 'message' : 'something wrong',
                                                          code : 400 }) } 
                          if ( res ) { //성공시 
                            bcrypt.genSalt(10, function(err, salt) {
                              if(err){
                                  console.log('bcrypt.getSalt() error ', err.message);
                              }else{
                                  /* password 업데이트 */
                                  bcrypt.hash( changePassword, salt, null, function(err , hash){
                                    if( err ){
                                        console.log('bcy', err.message)
                                        cb( null, conn, { 'message' : 'something wrong',
                                        code : 400 })
                                    }else{        
                                        userdata.mem_password = hash
                                        authDao.updateSetPassword(conn, userdata, cb);
                                    }
                                  })
                              }
                            })
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
                      cb(null, conn, { 
                        'message' : 'Your not a user' ,
                         code : 400 // bad Request 
                        })
                  }
                },
                (conn, data, cb) => {
                  console.log(data)
                  if(!data.code){
                   cb(null,conn, {'message': 'update sucess',code: 200})
                  }else{
                    cb(null, conn, data)
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
            console.log('error 낫다')
            console.error(error);
            return res.json({
              message: 'fail',
              code: 500, //서버에러 
              error: error
            });
      }
  })
  

/*마이페이지에서 내 소속 수정하기 */
router.post('/updateMemberSosok', async (req, res) => { 
  const data = {
    mem_email : req.body.mem_email,
    mem_sosok_nm : req.body.mem_sosok_nm
  }
  try {
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.updateMemberSosok(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          memberDao.release(conn);
        }
        if( error ){
          return res.json({
            code: 400,
            error: error
          });
        }
        else{
          return res.json({
            message: 'update successful',
            code: 200,
          });
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


/*마이페이지 접근시 내 정보 가져오기 */
router.post('/getMemberInfo', async (req, res) => { 
  console.log('hello')
  const data = {
    mem_email : req.body.mem_email,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getMemberInfo(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          memberDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
         
          return res.json(result);
        }
      }
    )
  }
  catch (error) {
    console.error(error);
    return res.json({
      message: 'fail',
      code: 200,
      error: error
    });
  }
})


router.post('/getMemberManagementList', async (req, res) => {

    if(!req.decoded.mem_gb_cd !== 1) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    try {
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            memberDao.getMemberManagementList(conn, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            memberDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })
  
  
  router.post('/getUpdateByMemberAuth', async (req, res) => {
    
    if(!req.decoded.mem_gb_cd !== 1) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }


    const data = {
      mem_gb_cd: req.body.mem_gb_cd,
      mem_userid : req.body.mem_userid
    }
  
    try {
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            memberDao.getUpdateByMemberAuth(conn, data, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            memberDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })
  
  
  router.post('/deleteMember', async (req, res) => {

    if(!req.decoded.mem_gb_cd !== 1) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    const data = {
      mem_userid : req.body.mem_userid
    }
  
    try {
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            memberDao.deleteMember(conn, data, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            memberDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })




/*대기 중 인원 가져오기  */
router.post('/getStandbyMemberList', async (req, res) => {

    if(!req.decoded.mem_gb_cd !== 1) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    try {
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            memberDao.getStandbyMemberList(conn, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            memberDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })
  
  
  /*  승인 거절 세팅하기   */
  router.post('/setMemberStatus', async (req, res) => {
      
    if(!req.decoded.mem_gb_cd !== 1) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }


    try {
      const data = {
        mem_status : req.body.mem_status,
        mem_userid: req.body.mem_userid
      }
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            memberDao.setMemberStatus(conn, data, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            memberDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json(result);
          }
        }
      )
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })
  
  module.exports = router;