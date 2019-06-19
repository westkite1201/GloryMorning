//  *  Content Data Access Object
//  */
const dbHelpers = require('./mysqlHelpers');


/* 이름 한국어가져오기   */
const getMemberName = async (conn, parameter, cb) => {
  const mem_idx = parameter.mem_idx;
  conn.query(
    `
    SELECT MEM_USERNAME,
    FROM CQMS_MEMBER 
    WHERE mem_idx = ?
    `,
    [
      mem_idx
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






/*마이페이지에서 내 소속 수정하기 */
const updateMemberSosok = async (conn, parameter, cb) => {
  const mem_email = parameter.mem_email;
  const mem_sosok_nm = parameter.mem_sosok_nm;
  conn.query(
    `
    UPDATE CQMS_MEMBER
    SET mem_sosok_nm =  ?
    WHERE MEM_EMAIL = ?
    `,
    [
      mem_sosok_nm,
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

/*마이페이지 접근시 내 정보 가져오기 */
const getMemberInfo = async (conn, parameter, cb) => {
  const mem_email = parameter.mem_email;
  conn.query(
    `
    SELECT CM.MEM_USERNAME,
    CM.MEM_EMAIL, 
    CM.MEM_SOSOK_NM,  ( SELECT GB_CD_NM 
                        FROM GB_CD_TABLE 
                        WHERE GB_CD = CM .MEM_GB_CD ) AS GB_CD_NM 
    FROM CQMS_MEMBER CM
    WHERE MEM_EMAIL = ?
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



/*login , join  */
const getLoginData = async (conn, parameter, cb) => {
  const mem_userid = parameter.mem_userid;
  const mem_password = parameter.mem_password;
  conn.query(
    `
      SELECT mem_userid , mem_gb_cd ,mem_password, mem_status, mem_username, mem_idx
      FROM CQMS_MEMBER
      WHERE mem_userid = ?
    `,
    [
      mem_userid
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
    VALUES (?, ?, ?, ?, ?, ?);
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

/* 이메일 중복 체크 */
const getEmailIsAlreadyExist = (conn, parameter, cb) => {
  const mem_userid = parameter.mem_userid
  conn.query(
    `
    SELECT CASE WHEN count(mem_userid) > 0 THEN 'EXIST'
              ELSE 'NONE'
              END AS EXISTFLAG
    FROM CQMS_MEMBER
    WHERE mem_userid = ?
    `,
    [
      mem_userid,
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


/* 이메일 중복 체크 */
const getForgetPassword = (conn, parameter, cb) => {
  const mem_userid = parameter.mem_userid
  conn.query(
    `
    SELECT mem_password
    FROM CQMS_MEMBER
    WHERE mem_userid = ?
    `,
    [
      mem_userid,
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
















const getMemberManagementList = (conn, cb) => {
  conn.query(
    `
    SELECT *
    FROM cqms_member CM , gb_cd_table GCT
    WHERE CM.mem_gb_cd = GCT.GB_CD
    AND CM.mem_status = 'Y'
    `,
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

// Update Member Authiority
const getUpdateByMemberAuth = (conn, parameter, cb) => {
  const mem_gb_cd = parameter.mem_gb_cd;
  const mem_userid = parameter.mem_userid;
  console.log(mem_gb_cd ,mem_userid )
  conn.query(
    `
      UPDATE cqms_member
      SET mem_gb_cd =  ?
      WHERE mem_userid = ?
    `,
    [
      mem_gb_cd,
      mem_userid,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    });
};


//delete member

const deleteMember = (conn, parameter, cb) => {
  const mem_userid = parameter.mem_userid;
  //console.log(mem_gb_cd ,mem_userid )
  conn.query(
    `
      delete from cqms_member
      where mem_userid = ?;
    `,
    [
      mem_userid,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    });
};











/* 구분별 CD, CD_MN 가져오기 */
const getGubunCDMapping = (conn, cb) => {
  conn.query(
    `
      SELECT GB_CD, GB_CD_NM
      FROM GB_CD_TABLE
    `,
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





/*  페이지 CD, CD_NM 가져오기 */
const getpageCDMapping = (conn, cb) => {
  conn.query(
    `
      SELECT  PAGE_CD ,PAGE_CD_NM
      FROM page_cd_table
      WHERE PAGE_CD != 0
    `,

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




/* 구분별 페이지 권한 default 가져오기 */
const getGubunPageList = (conn, parameter, cb) => {
  let mem_gb_cd = parameter.mem_gb_cd
  conn.query(
    `
      SELECT A.GB_CD
      ,C.GB_CD_NM
      ,A.PAGE_CD
      ,B.PAGE_CD_NM
      FROM GUBUN_ACCESS_PAGE A
      INNER JOIN PAGE_CD_TABLE B ON A.PAGE_CD = B.PAGE_CD
      INNER JOIN GB_CD_TABLE C ON A.GB_CD = C.GB_CD
      WHERE A.GB_CD = ? AND A.USE_YN ='Y'
    `,
    [
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


/*쿼리 작성 요망  */
const setSeletedPages = async (conn, data, cb) => {
  const id_array = data.id_array;
  conn.query(
    `

    `,
    [
      id_array
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


const getStandbyMemberList = (conn, cb) => {
  conn.query(
    `
    SELECT *
    FROM cqms_member CM , gb_cd_table GCT
    WHERE CM.mem_gb_cd = GCT.GB_CD
    AND mem_status = 'N'
    `,
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




//* status 세팅*/
const setMemberStatus = (conn, parameter, cb) => {
  const mem_status = parameter.mem_status;
  const mem_userid = parameter.mem_userid;

  conn.query(
    `
      UPDATE cqms_member
      SET mem_status =  ?
      WHERE mem_userid = ?
    `,
    [
      mem_status,
      mem_userid,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    });
};







module.exports = {

  connect: dbHelpers.doConnect,
  release: dbHelpers.doRelease,

  getMemberName : getMemberName,

  setMemberSignUp: setMemberSignUp ,
  getEmailIsAlreadyExist : getEmailIsAlreadyExist,
  getLoginData: getLoginData ,
  getForgetPassword :getForgetPassword,

  getMemberManagementList : getMemberManagementList,
  getUpdateByMemberAuth : getUpdateByMemberAuth,
  deleteMember : deleteMember,

  getGubunPageList : getGubunPageList,
  getGubunCDMapping : getGubunCDMapping,
  getpageCDMapping : getpageCDMapping ,


  getStandbyMemberList: getStandbyMemberList,
  setMemberStatus: setMemberStatus,

  setSeletedPages: setSeletedPages,


  getMemberInfo: getMemberInfo,
  updateMemberSosok: updateMemberSosok,


}
