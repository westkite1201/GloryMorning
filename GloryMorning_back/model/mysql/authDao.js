const dbHelpers = require('./mysqlHelpers');





//findByEmail 
/* 이메일 중복 체크 */
const getEmailIsAlreadyExist = (conn, parameter, cb) => {
    const mem_email = parameter.mem_email
    conn.query(
      `
      SELECT CASE WHEN count(mem_email) > 0 THEN 'EXIST'
                ELSE 'NONE'
                END AS EXISTFLAG
      FROM CQMS_MEMBER
      WHERE mem_email = ?
      `,
      [
        mem_email,
      ],
      (error, result) => {
        if( error ) {
          return cb(error, conn);
        }
        else{
            //console.log('ddd')
            //console.log('result.data ',  result[0].EXISTFLAG)
            //if( result[0].EXISTFLAG === 'EXIST'){
                return cb(null, conn, result);
            // }else{
            //     return cb(null, conn, false);
            // }
        }
      }
    )
}

/*login , join  */
const getLoginData = async (conn, parameter, cb) => {
    const mem_email = parameter.mem_email;
    conn.query(
      `
        SELECT mem_idx, mem_email ,mem_username, mem_gb_cd ,mem_password, mem_status
        FROM CQMS_MEMBER
        WHERE mem_email = ?
      `,
      [
        mem_email
      ],
      (error, result) => {
        if (error) {
          return cb(error, conn);
        }
        else {
          return cb(null, conn, result);
        }
      }
    )
  }
  

  
/* 회원 가입  */
const setMemberSignUp = (conn, parameter, cb) => {
    const mem_username = parameter.mem_username
    const mem_userid = parameter.mem_userid
    const mem_email = parameter.mem_email
    const mem_password = parameter.mem_password
    const mem_sosok_nm = parameter.mem_sosok_nm
    const mem_gb_cd = parameter.mem_gb_cd
  
    conn.query(
      `
      INSERT INTO CQMS_MEMBER (mem_username, mem_userid, mem_email, mem_password, mem_sosok_nm, mem_gb_cd)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        mem_username,
        mem_userid,
        mem_email,
        mem_password,
        mem_sosok_nm,
        mem_gb_cd,
      ],
      (error, result) => {
        if( error ) {
          return cb(error, conn);
        }
        else{
          return cb(null, conn, result);
        }
      }
    )
  }

//updateSetPassword

const updateSetPassword = (conn, parameter, cb) => {
  // const mem_username = parameter.mem_username
  // const mem_userid = parameter.mem_userid
  const mem_email = parameter.mem_email
  const mem_password = parameter.mem_password

  conn.query(
    `
    UPDATE cqms_member
    SET mem_password =  ?
    WHERE mem_email = ?
    `,
    [
      mem_password,
      mem_email
    ],
    (error, result) => {
      if( error ) {
        return cb(error, conn);
      }
      else{
        return cb(null, conn, result);
      }
    }
  )
}


module.exports ={
    connect: dbHelpers.doConnect,
    release: dbHelpers.doRelease,
    getEmailIsAlreadyExist : getEmailIsAlreadyExist,
    setMemberSignUp : setMemberSignUp,
    getLoginData : getLoginData,
    updateSetPassword: updateSetPassword
}