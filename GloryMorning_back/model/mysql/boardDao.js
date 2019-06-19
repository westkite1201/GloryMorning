//  *  Content Data Access Object
//  */
//
const dbHelpers = require('./mysqlHelpers');
const fs = require('fs');





/* comment */
/* comment 삭제  */
const deleteComment = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  const COMMENT_NUM = parameter.COMMENT_NUM;
  conn.query(
    `
    DELETE 
    FROM BOARD_POSTS_COMMENT
    WHERE POSTS_NUM = ? AND 
          COMMENT_NUM = ? 
    `,
    [
      POSTS_NUM,
      COMMENT_NUM,
    ],
    (error, result) => {
      if (error) {
        console.log('error ' , error)
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    }
  )
}

/* 글 작성  */
const setComment = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  const COMMENT_NAME = parameter.COMMENT_NAME;
  const COMMENT_NAEYONG = parameter.COMMENT_NAEYONG;
  const COMMENT_PARENT = parameter.COMMENT_PARENT;

  conn.query(
    `
    INSERT BOARD_POSTS_COMMENT(POSTS_NUM, COMMENT_NAME, COMMENT_NAEYONG, COMMENT_PARENT)
    VALUES (?, ?, ?, ?)
    `,
    [
      POSTS_NUM,
      COMMENT_NAME,
      COMMENT_NAEYONG,
      COMMENT_PARENT,
    ],
    (error, result) => {
      if (error) {
        console.log('error ' , error)
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    }
  )
}

const getComment = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  conn.query(
    `
    SELECT * 
    FROM BOARD_POSTS_COMMENT
    WHERE POSTS_NUM = ?
    `,
    [
      POSTS_NUM,
    ],
    (error, result) => {
      if (error) {
        console.log('error ' , error)
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    }
  )
}







//게시판 리스트 가져오기
const getBoardList = async (conn, cb) => {
  conn.query(
    `
      SELECT * 
      FROM BOARD
    `,
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



/* 공지 가져오기  */
const getNotice = async (conn, cb) => {
  conn.query(
    `
      SELECT * 
      FROM BOARD_posts
      WHERE PRIME_YN = 'Y'
    `,
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




// UPDATE BOARD_POSTS
// SET PRIME_YN = 'N'
// WHERE PRIME_YN = 'Y';


// UPDATE BOARD_POSTS
// SET PRIME_YN = 'Y'
// WHERE POSTS_NUM = '3';
/* 업데이트 YtoN ( 공지 등록전 업뎃)*/
const updateYtoNPrimeYN = async (conn, cb) => {
  conn.query(
    `
     UPDATE BOARD_POSTS
     SET PRIME_YN = 'N'
     WHERE PRIME_YN = 'Y'
    `,
    (error, result) => {
      if (error) {
        return cb(error, conn);
      }
      else {
        return cb(null, conn);
      }
    }
  )
}
/* 공지등록  */
const updatePrimeYN = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  conn.query(
    `
     UPDATE BOARD_POSTS
     SET PRIME_YN = 'Y'
     WHERE POSTS_NUM = ?
    `,
    [POSTS_NUM]
    ,
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




/* 글 작성 sequuence max 가져오기   */
const getPostsSequence = async (conn , cb) => {
  // console.log( BOARD_NUM,
  //   MEM_IDX,
  //   POSTS_JEMOK,
  //   POSTS_NAEYOMG,) 
  conn.query(
    `
    SELECT ifnull(MAX(POSTS_NUM) + 1 , '1') as SEQUENCE
    FROM BOARD_POSTS
    `,
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

/* 글 작성  */
const writePosts = async (conn, parameter, cb) => {
 
  const BOARD_NUM = parameter.BOARD_NUM;
  const MEM_IDX = parameter.MEM_IDX;
  const POSTS_NUM = parameter.POSTS_NUM;
  const POSTS_JEMOK = parameter.POSTS_JEMOK;
  const POSTS_NAEYONG =parameter.POSTS_NAEYONG;
  const NOTICE_START = parameter.NOTICE_START;
  const NOTICE_END = parameter.NOTICE_END;
  const PRIME_YN = parameter.PRIME_YN;
  const THUMBNAIL = parameter.THUMBNAIL;
  // console.log( BOARD_NUM,
  //   MEM_IDX,
  //   POSTS_JEMOK,
  //   POSTS_NAEYOMG,) 
  console.log("THUMBNAIL" , THUMBNAIL)
  conn.query(
    `
    INSERT BOARD_POSTS(BOARD_NUM, POSTS_NUM, MEM_IDX, POSTS_JEMOK, POSTS_NAEYONG, THUMBNAIL, NOTICE_START, NOTICE_END, PRIME_YN)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      BOARD_NUM,
      POSTS_NUM,
      MEM_IDX,
      POSTS_JEMOK,
      POSTS_NAEYONG,
      THUMBNAIL,
      NOTICE_START,
      NOTICE_END,
      PRIME_YN,
    ],
    (error, result) => {
      if (error) {
        console.log('error ' , error)
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    }
  )
}


const editPosts = async (conn, parameter, cb) => {
  const BOARD_NUM = parameter.BOARD_NUM;
  const POSTS_NUM = parameter.POSTS_NUM;
  const POSTS_JEMOK = parameter.POSTS_JEMOK;
  const POSTS_NAEYONG =parameter.POSTS_NAEYONG;
  const PRIME_YN = parameter.PRIME_YN;
  console.log(
    'edit',
    BOARD_NUM,
    POSTS_NUM,
    POSTS_JEMOK,
    POSTS_NAEYONG,
    PRIME_YN) 
  conn.query(
    `
    UPDATE BOARD_POSTS
    SET BOARD_NUM = ?,
        POSTS_JEMOK = ?,
        POSTS_NAEYONG = ?,
        EDIT_DATE = now(),
        PRIME_YN = ?
    WHERE POSTS_NUM = ?
    `,
    [
      BOARD_NUM,
      POSTS_JEMOK,
      POSTS_NAEYONG,
      PRIME_YN,
      POSTS_NUM,
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

/* 글 수정  */
const editPostsNotice = async (conn, parameter, cb) => {
  const BOARD_NUM = parameter.BOARD_NUM;
  const POSTS_NUM = parameter.POSTS_NUM;
  const POSTS_JEMOK = parameter.POSTS_JEMOK;
  const POSTS_NAEYONG =parameter.POSTS_NAEYONG;
  const PRIME_YN = parameter.PRIME_YN;
  const NOTICE_START = parameter.NOTICE_START;
  const NOTICE_END = parameter.NOTICE_END;
  console.log(
    'edit',
    BOARD_NUM,
    POSTS_NUM,
    POSTS_JEMOK,
    POSTS_NAEYONG,
    PRIME_YN,
    NOTICE_START,
    NOTICE_END) 
  conn.query(
    `
    UPDATE BOARD_POSTS
    SET POSTS_JEMOK = ?,
        POSTS_NAEYONG = ?,
        EDIT_DATE = now(),
        PRIME_YN = ?,
        NOTICE_START = ?,
        NOTICE_END = ?
    WHERE POSTS_NUM = ? AND
          BOARD_NUM = ?
    `,
    [
      POSTS_JEMOK,
      POSTS_NAEYONG,
      PRIME_YN,
      NOTICE_START,
      NOTICE_END,
      POSTS_NUM,
      BOARD_NUM,
      
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
//


/* 글 삭제 */
const deletePosts = async (conn, parameter, cb) => {

  const BOARD_NUM = parameter.BOARD_NUM;
  const POSTS_NUM = parameter.POSTS_NUM;

  console.log(BOARD_NUM)
  console.log(POSTS_NUM)
  conn.query(
    `
    DELETE 
    FROM board_posts
    WHERE BOARD_NUM = ?
    AND POSTS_NUM = ?
    `,
    [
      BOARD_NUM,
      POSTS_NUM,
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




/* 해당되는 포스트 넘이 한개 이상인지 */
const ifPostsExist = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  conn.query(
    `
    SELECT CASE WHEN count(POSTS_NUM) > 0 THEN true
    ELSE false END AS IFEXIST
    FROM board_posts
    WHERE POSTS_NUM = ?;
    `,
    [
      POSTS_NUM,
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


/* 글 클릭시   */
const getPosts = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  //console.log('postsnum ', POSTS_NUM)
  // console.log( BOARD_NUM,
  //   MEM_IDX,
  //   POSTS_JEMOK,
  //   POSTS_NAEYOMG,) 
  conn.query(
    `
    SELECT BP.BOARD_NUM,
		 (  SELECT BOARD_NAME
			FROM board
			WHERE  BP.BOARD_NUM= board.BOARD_NUM ) AS BOARD_NAME,
		( SELECT BOARD_ROUTER_PATH
			FROM board
			WHERE  BP.BOARD_NUM= board.BOARD_NUM ) AS BOARD_ROUTER_PATH,
           BP.POSTS_JEMOK, 
           BP.POSTS_NAEYONG, 
           BP.REG_DATE,
           BP.EDIT_DATE,
           BP.VIEWS, 
           BP.PRIME_YN,
           BP.NOTICE_START,
           BP.NOTICE_END,
                            ( SELECT MEM_USERNAME 
                              FROM CQMS_MEMBER CM
                              WHERE BP.MEM_IDX= CM.MEM_IDX ) AS MEM_USERNAME,
           BP.THUMBNAIL
    FROM BOARD_POSTS BP, CQMS_MEMBER CM, BOARD board
    WHERE BP.POSTS_NUM =  ?
    AND BP.MEM_IDX = CM.MEM_IDX
    `,
    [
      POSTS_NUM,
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




/* 게시글 불러오기    */
const getPostsList = async (conn, parameter, cb) => {
  const BOARD_NUM = parameter.BOARD_NUM; 
  conn.query(
    `
    SELECT POSTS_NUM, 
    ( SELECT mem_username  
      FROM cqms_member CM
      WHERE CM.mem_idx = BP.MEM_IDX ) as MEM_USERNAME, 
      POSTS_JEMOK, 
      POSTS_NAEYONG,
      THUMBNAIL, 
      EDIT_DATE, 
      REG_DATE, 
      VIEWS,
      PRIME_YN 
    FROM BOARD_POSTS BP
    WHERE BOARD_NUM = ?
    ORDER BY POSTS_NUM DESC
    `,
    [
      BOARD_NUM,
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
/* 클릭시 조회 수 상승  */
const setViewsUp = async (conn, parameter, cb) => {
  const POSTS_NUM = parameter.POSTS_NUM;
  conn.query(
    `
    UPDATE BOARD_POSTS
    SET VIEWS = VIEWS + 1
    WHERE POSTS_NUM = ?
    `,
    [POSTS_NUM],
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
      SELECT mem_userid , mem_gb_cd ,mem_password, mem_status
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

  /* 게시판  */
  getPostsSequence : getPostsSequence,
  ifPostsExist : ifPostsExist,
  writePosts : writePosts,
  deletePosts : deletePosts,
  editPosts  : editPosts,
  getPosts : getPosts,
  getPostsList: getPostsList,
  setViewsUp : setViewsUp,

  updateYtoNPrimeYN : updateYtoNPrimeYN,
  updatePrimeYN : updatePrimeYN,

  getNotice: getNotice,

  getBoardList: getBoardList,


  setComment :setComment,
  getComment : getComment,
  deleteComment : deleteComment,
}
