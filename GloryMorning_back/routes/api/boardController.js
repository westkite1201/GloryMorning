var express = require('express');
var router = express.Router();

const _ = require('lodash')
const async = require('async');
const fs = require('fs');
var util = require('util');

//const userRedis = require('../../model/redis/redisDao');
const memberDao = require('../../model/mysql/memberDao')
const boardDao = require('../../model/mysql/boardDao')
//const contentDao = require('../../model/mysql/contentDaoYesterday');
const mysqlHelpers = require('../../model/mysql/mysqlHelpers');
//const elsDao = require('../../model/elasticsearch/elsDao');
const helpers = require('../../src/lib/helpers');

const auth = require('../../config/auth/auth');

const crypto = require('crypto');


/* comment */
/* comment 삭제  */
router.post('/deleteComment', async (req, res) => {
  const data = {
      POSTS_NUM :  req.body.POSTS_NUM,
      COMMENT_NUM : req.body.COMMENT_NUM,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.deleteComment(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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


/* comment 작성  */
router.post('/setComment', async (req, res) => {
  const data = {
      POSTS_NUM :  req.body.POSTS_NUM,
      COMMENT_NAME : req.body.COMMENT_NAME,
      COMMENT_NAEYONG: req.body.COMMENT_NAEYONG,
      COMMENT_PARENT : req.body.COMMENT_PARENT
  } 

  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.setComment(conn, data, cb);
        }
      ],

      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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

router.post('/getComment', async (req, res) => {
  const data = {
      POSTS_NUM :  req.body.POSTS_NUM,
  } 
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getComment(conn, data, cb);
        }
      ],

      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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






/* 공지사항 기간 체크 후 
   viewing check  */
router.post('/getNoticeViewing', async (req, res) => {
  try {
    const moment = require('moment-timezone');
    const now = moment();
    const server_time = now.tz("Asia/Seoul").format('YYYY-MM-DD');

    async.waterfall(
        [
          (cb) => {
            boardDao.connect(cb);
          },
          (conn, cb) => {
            boardDao.getNotice(conn, cb);
          },
          (conn, data, cb) =>{
            if(data.length > 0){
              console.log(typeof(data[0].NOTICE_START))
              if(String())
              console.log(data[0].NOTICE_END)
              if( moment(data[0].NOTICE_START) <= moment(server_time) &&
                moment(server_time) <= moment(data[0].NOTICE_END)){
                  cb(null, conn, {viewing : true} )
                }
              else{
                cb(null, conn, {viewing : false} )
              }
         
            }else{
              cb("error",conn, data)
            }

          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            boardDao.release(conn);
          }
          if( error ){
            return res.json({
              error: error
            });
          }
          else{
            return res.json({
              message: 'success',
              code: 200,
              result
            });
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


/* 게시판 리스트 가져오기 */
router.post('/getBoardList', async (req, res) => {
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getBoardList(conn, cb);
        }
      ],
      (error, conn, result) => {
        if( conn ){
          boardDao.release(conn);
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






// UPDATE BOARD_POSTS
// SET PRIME_YN = 'N'
// WHERE PRIME_YN = 'Y';
// UPDATE BOARD_POSTS
// SET PRIME_YN = 'Y'
// WHERE POSTS_NUM = '3';

router.post('/updatePrimeYN', async (req, res) => {
  const data = {
    POSTS_NUM: req.body.POSTS_NUM,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.updateYtoNPrimeYN(conn, cb);
        },
        (conn, cb) => {
          console.log(conn, cb)
          boardDao.updatePrimeYN(conn, data, cb);
        }
      ],
      (error, conn, result) => {
        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            message : 'registraion fail',
            code : 400,
            error: error
          });
        }
        else{
          return res.json({
              message : 'registration successful',
              code: 200
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

/* getNotice  */
router.post('/getNotice', async (req, res) => {
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getNotice(conn, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          return res.json({
            message: 'success',
            code: 200,
            result
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




/* 글 작성  */
router.post('/writePosts', async (req, res) => {

    const data = {
        BOARD_NUM: req.body.BOARD_NUM,
        POSTS_NUM :  req.body.POSTS_NUM,
        MEM_IDX :  req.body.MEM_IDX,
        POSTS_JEMOK : req.body.POSTS_JEMOK,
        POSTS_NAEYONG: req.body.POSTS_NAEYONG,
        THUMBNAIL : req.body.THUMBNAIL,
        NOTICE_START : req.body.NOTICE_START,
        NOTICE_END : req.body.NOTICE_END,
        PRIME_YN : req.body.PRIME_YN
    } 
    console.log(data.NOTICE_START)
    console.log(data.NOTICE_END)
    try {
      async.waterfall(
        [
          (cb) => {
            boardDao.connect(cb);
          },
          (conn, cb) => {
            if( data.PRIME_YN === 'Y'){
              //console.log('1');
              boardDao.updateYtoNPrimeYN(conn, cb);
            }else{
              return cb(null, conn);
            }
          },
          (conn, cb) => {
            boardDao.writePosts(conn, data, cb);
          }
        ],
        (error, conn, result) => {
  
          if( conn ){
            boardDao.release(conn);
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
/* 글 수정  */
router.post('/editPosts', async (req, res) => {

  const data = {
      BOARD_NUM: req.body.BOARD_NUM,
      POSTS_NUM :  req.body.POSTS_NUM,
      POSTS_JEMOK : req.body.POSTS_JEMOK,
      POSTS_NAEYONG: req.body.POSTS_NAEYONG,
      PRIME_YN : req.body.PRIME_YN,
      NOTICE_START : req.body.NOTICE_START,
      NOTICE_END : req.body.NOTICE_END
  }
  console.log("req.body.BOARD_NUM ", req.body.BOARD_NUM)
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          if( data.PRIME_YN === 'Y'){
            //console.log('1');
            boardDao.updateYtoNPrimeYN(conn, cb);
          }else{
            return cb(null, conn);
          }
        },
        (conn, cb) => {
          boardDao.editPosts(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          console.log('error ' , error)
          return res.json({
            error: error
          });
        }
        else{
          console.log('result ' , result)
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

/* 해당되는 포스트 넘이 한개 이상인지 */
router.post('/ifPostsExist', async (req, res) => {

  const data = {
      POSTS_NUM :  req.body.POSTS_NUM,
  }

  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.ifPostsExist(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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


/*글 삭제시  */
router.post('/deletePosts', async (req, res) => {

  const data = {
      BOARD_NUM : req.body.BOARD_NUM,
      POSTS_NUM :  req.body.POSTS_NUM,
  }

  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.deletePosts(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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





/*글 클릭시  */
router.post('/getPosts', async (req, res) => {

  const data = {
      POSTS_NUM :  req.body.POSTS_NUM,
  }

  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getPosts(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
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

/* 게시글 리스트 불러오기  */
router.post('/getSearchPostsList', async (req, res) => {
  const data ={
    searchMethod : req.body.searchMethod,
    searchWord :  req.body.searchWord,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getPostsList(conn, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          //console.log(result)
          let searchWord = data.searchWord
          result = makePaginate(req, result);
  
          result = result.posts.filter((item) => {
            for(let key in item){
             if(!_.isNull(item[key])){
                if(item[key].toString().toUpperCase().includes(
                  searchWord.toString().toUpperCase())){
                return true;
                }
              }
            }
          })
       
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

/* 게시글 리스트 불러오기  pagination 적용 되어있음 */
router.post('/getPostsList', async (req, res) => {
  const data = {
    BOARD_NUM :  req.body.BOARD_NUM,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getPostsList(conn, data, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          result = makePaginate(req, result);
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

let PER_PAGE = 10;
makePaginate = (req ,result) => {
  //console.log(result)
  //let items = JSON.parse(fs.readFileSync(DATA));
  let offset = req.body.offset ? parseInt(req.body.offset, 10) : 0;
  let nextOffset = offset + PER_PAGE;
  let previousOffset = offset - PER_PAGE < 1 ? 0 : offset - PER_PAGE;

  let meta = {
    limit: PER_PAGE,
    next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
    offset: req.body.offset,
    previous: util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
    total_count: result.length,
  };

  console.log(meta)
  /* 항상 맨위에 공지사항 고정  */
  let paginatedPosts = getPaginatedItems(result, offset)
  // let primePost = result.filter((item) => (item.PRIME_YN !== 'N'))[0]
  // if(!helpers.isEmpty(primePost)){ 
  //   paginatedPosts.unshift(primePost)
  // }


  let json = {
    meta: meta,
    posts: paginatedPosts
  };

  return json
}
 getPaginatedItems = (items, offset) => {
  return items.slice(offset, offset + PER_PAGE);
}












router.post('/getPostsSequence', async (req, res) => {

  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.getPostsSequence(conn, cb);
        }
      ],
      (error, conn, result) => {

        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          //console.log(result)
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



router.post('/setViewsUp', async (req, res) => {
  const data = {
    POSTS_NUM :  req.body.POSTS_NUM,
  }
  try {
    async.waterfall(
      [
        (cb) => {
          boardDao.connect(cb);
        },
        (conn, cb) => {
          boardDao.setViewsUp(conn, data, cb);
        }
      ],
      (error, conn, result) => {
        if( conn ){
          boardDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          //console.log(result)
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


















router.post('/setMemberSignUp', async (req, res) => {

    const data = {
      mem_username: req.body.mem_username,
      mem_userid :  req.body.mem_email,
      mem_email : req.body.mem_email,
      mem_password: req.body.mem_password,
      mem_sosok_nm: req.body.mem_sosok_nm,
      mem_gb_cd : req.body.mem_gb_cd
    }
  
    
    try {
      async.waterfall(
        [
          (cb) => {
            memberDao.connect(cb);
          },
          (conn, cb) => {
            boardDao.setMemberSignUp(conn,  cb);
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

/* email 중복 체크*/
router.post('/getEmailIsAlreadyExist', async (req, res) => {
  try {
    const data = {
      mem_userid: req.body.mem_userid
    }
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getEmailIsAlreadyExist(conn, data, cb);
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


/* 비밀번호 forget */
router.post('/getForgetPassword', async (req, res) => {
  try {
    const data = {
      mem_userid: req.body.emailConfig.mem_userid
    }
  
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getForgetPassword(conn, data, cb);
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
          console.log(' req, res ,result',  req.body ,result)
          if(helpers.isEmpty(result)){
            return res.json({
              message: 'sendMail: none return result',
              error: error,
              code : 300
            });
          }else{
            sendMailToMember( req, res ,result)
          }
         // return res.json(result);
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













//  구분별 페이지 관리 페이지 사용 

/* 구분별 CD , CD_NM 가져오기 */
router.post('/getGubunCDMapping', async (req, res) => {
  try {
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getGubunCDMapping(conn, cb);
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




/*  페이지 CD, CD_NM 가져오기 */
router.post('/getpageCDMapping', async (req, res) => {
  try {
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getpageCDMapping(conn, cb);
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





/* 구분별 페이지 권한 default 가져오기 */
router.post('/getGubunPageList', async (req, res) => {

  const data = {
    mem_gb_cd: req.body.mem_gb_cd,
  }

  try {
    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb);
        },
        (conn, cb) => {
          memberDao.getGubunPageList(conn, data, cb);
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


/* 변경된 페이지 리스트 전달  */
router.post('/setSeletedPages', async (req, res) => {
  try {
    const data = {
      GB_CD : req.body.GB_CD,
      id_array: req.body.id_array
    }

    async.waterfall(
      [
        (cb) => {
          memberDao.connect(cb)
        },
        (conn, cb) => {
          memberDao.setSeletedPages(conn, data, cb)
        }
      ],
      (error, conn, result) => {
        if( conn ){
          memberDao.release(conn)
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








/* 이메일 전송  */
router.post('/sendMail', async (req, res) => {
  //"use strict";
  let emailConfig = req.body.emailConfig;

  console.log(req.body.emailConfig) 
  if( emailConfig.message === 'toAdmin'){
    sendMailToAdmin(req,res)
  }else{
    sendMailToMember(req, res)
  }

})


/* 메일 전송 모듈   */
let sendMailToMember = async(req, res, result) =>{
  console.log('sendMailToMember ', req.body)
  


  if (!helpers.isEmpty(result)){
    let password = JSON.parse ( JSON.stringify(result) ) 
        password = password[0].mem_password
  }
 
  const nodemailer = require("nodemailer");
  const smtpPool = require("nodemailer-smtp-pool")


  let emailConfig = req.body.emailConfig;
  console.log('emailConfig ' , emailConfig)
  let to = emailConfig.to.map((item)=>{
    return item
  })
  let emailFlag = emailConfig.emailFlag;

  let message = emailConfig.message;

  let transporter = nodemailer.createTransport(
      smtpPool({
      transport: "SMTP",
      host: "mail2.digicaps.co.kr",
      port: 25,
      secure: false,
      requireTLS : false,
      ignoreTLS:false,
      //tls: {rejectUnauthorized: false},
      authMethod:'NTLM',
      auth: {
        user: 'cqms.op@digicaps.com', // generated ethereal user
        pass: '1q2w3e4r' // generated ethereal password
      },
      debug: true // include SMTP traffic in the logs
    })
    );

   // let connection = new SMTPConnection(options);

// verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

    // setup email data with unicode symbols

    let banner = ''
    let infoStr = ''
    
    if(emailFlag === '승인' ){

      banner = '에 오신것을 환영합니다.'
      infoStr = '에 대한 가입처리가' + emailFlag + '되었습니다.'
      
    }else if(emailFlag === '거절' ){
      banner = '에서 가입을 거절 하였습니다. 죄송합니다.'
      infoStr = '에 대한 가입처리가' + emailFlag + '되었습니다.'

    }else if (emailFlag === '비밀번호요청'){

      banner = '요청한 비밀번호를 알려드립니다.'
      infoStr = '에 대한 비밀번호는<h4>' + password + '</h4> 입니다.'
      
    }
      
      
    let url = 'http://211.200.94.210:3031/home'
    let mailOptions = {
      from: 'cqms.op@digicaps.com', // sender address
      //to: "smyeong@digicaps.com, sykim@digicaps.com, txtcopy@naver.com ," + juEmail, // list of receivers
      to: to , // list of receivers
      
      subject: "안녕하세요.CQMS 입니다.", // Subject line
      text: "", // plain text body
      html:     "<table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%;background-color:#f8f8f9;letter-spacing:-1px'>" +   
      "<tbody> " +
      "<tr><td align='center'>"    +        
      "<table border='0' cellpadding='0' cellspacing='0'>"         +       
      "<tr><td width='595'>"          +
      "<div style='max-width:595px; margin:0 auto'>"    +            
      "<table align='center' border='0' cellpadding='0' cellspacing='0'" +
      "style='max-width:595px;width:100%;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,돋움,Dotum,Helvetica,Apple SD Gothic Neo,Sans-serif;background-color:#fff;-webkit-text-size-adjust:100%;text-align:left'>"+                   
      "<tbody><tr><td height='30'></td></tr>"+                   
      "<tr><td style='padding-right:27px; padding-left:21px'>"+                            
      "<table border='0' cellpadding='0' cellspacing='0'>"+                                
      "<tbody><tr>"+
      "<td style='' width='61'>" +                                       
      "<img src='https://i.imgur.com/88UU0TT.png'  width='500'/>" +
      "</td><td style='padding-left:5px'>" +                                                                       
      "</td></tr>"+                          
      "</tbody></table>"+                       
      "</td></tr>" +                 
      "<tr><td height='13'></td></tr>"+
      "<tr><td height='13'></td></tr>"+       
      "<tr><td height='13'></td></tr>"+                  
      "<tr><td style='padding-right:27px; padding-left:18px;line-height:34px;font-size:29px;color:#424240;font-family:나눔고딕,NanumGothic,맑은고딕,MalgunGothic,돋움,Dotum,Helvetica;'>"+
      "                            CQMS<br><span style='color:#fab005'>" + banner +"</span></br>"+                        
      "</td></tr>"+                    
      "<tr>"+
      "<td height='22'></td>"+
      "</tr>                    <tr>"+
      "<td height='1' style='background-color: #e5e5e5;'></td></tr>"         +                             
      "<tr><td style='padding-top:24px; padding-right:27px; padding-bottom:32px; padding-left:20px'>"+  
      "<table align='left' border='0' cellpadding='0' cellspacing='0' width='100%' style=font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,돋움,Dotum,Helvetica,Apple SD Gothic Neo,Sans-serif;>"+                               
      "<tbody><tr><td height='6'></td></tr>"+                                
   
                                                                                                                                      
      "<tr style='display:none;'>"+
      "<td height='24'></td></tr>"+
      "<tr><td style='font-size:14px;color:#696969;line-height:24px;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;'>"+                                        
      "<strong>회원님의 아이디"+ 
      "<span style='color:#fab005'>" + to + "</span>"+ infoStr +"</strong><br>"+                                       
      "감사합니다."+
      //"<a href=" + url + "target='_blank' style='display:inline-block;margin-left:50px;color:#004790;line-:12px' rel='noreferrer noopener'>CQMS로 이동 </a> "+
      "</td></tr>"+                                
      "<tr><td height='24'></td></tr> "+                               
      "<tr><td style='font-size:14px;color:#696969;line-height:24px;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;'>"+                                        
      "<tr>"+
      "<td height='22' style='border-bottom: 1px solid #e5e5e5'></td>"+
      "</tr>"+
      "</table>"
      // html body
    };
                    
    // send mail with defined transport object
    try{
      let info = await transporter.sendMail(mailOptions)
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return res.json({
        message: 'sendMail: success to send',
        code: 100,
      });

    }catch(error){
      return res.json({
        error: error
      });
    }
}










/* 메일 전송 모듈 -> admin   */
let sendMailToAdmin = async(req, res, result) =>{
  console.log('sendMailToMember ', req.body)

  if (!helpers.isEmpty(result)){
    let password = JSON.parse ( JSON.stringify(result) ) 
        password = password[0].mem_password
  }
 
  const nodemailer = require("nodemailer");
  const smtpPool = require("nodemailer-smtp-pool")


  let emailConfig = req.body.emailConfig;
  console.log('emailConfig ' , emailConfig)
  let to = emailConfig.to.map((item)=>{
    return item
  })
  let emailFlag = emailConfig.emailFlag;
  let mem_userid = emailConfig.mem_userid
  let message = emailConfig.message;

  let transporter = nodemailer.createTransport(
      smtpPool({
      transport: "SMTP",
      host: "mail2.digicaps.co.kr",
      port: 25,
      secure: false,
      requireTLS : false,
      ignoreTLS:false,
      //tls: {rejectUnauthorized: false},
      authMethod:'NTLM',
      auth: {
        user: 'cqms.op@digicaps.com', // generated ethereal user
        pass: '1q2w3e4r' // generated ethereal password
      },
      debug: true // include SMTP traffic in the logs
    })
    );

   // let connection = new SMTPConnection(options);

// verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

    // setup email data with unicode symbols

    let banner = ''
    let infoStr = ''
    let subject = ''
    if(emailFlag === '승인' ){
      subject = "안녕하세요. 관리자님. 아이디 '"+ mem_userid +"' 에 대해서 " + emailFlag + '처리가 되었습니다.'  
      banner = '에서 알려드립니다.'
      infoStr = '에 대한 가입처리가' + emailFlag + ' 되었습니다.'
      
    }else if(emailFlag === '거절' ){
      subject ="안녕하세요. 관리자님. 아이디 '"+ mem_userid +"' 에 대해서 " + emailFlag + '처리가 되었습니다.'  
      banner = '에서 알려드립니다.'
      infoStr = '에 대한 가입처리가' + emailFlag + ' 되었습니다.'

    }else if (emailFlag === '비밀번호요청'){
      banner = '요청한 비밀번호를 알려드립니다.'
      infoStr = '에 대한 비밀번호는<h4>' + password + '</h4> 입니다.'
    }
    else if (emailFlag ==='가입요청'){
      subject = "안녕하세요. 관리자님. 아이디 '"+ mem_userid +"' 에 대한 " + emailFlag + '이 들어왔습니다.'  
      banner = '에서 알려드립니다.'
      infoStr = '로 가입요청이 들어왔습니다. <p>확인 부탁드립니다.</p>'
    }
      

      
    let url = 'http://211.200.94.210:3031/home'
    let mailOptions = {
      from: 'cqms.op@digicaps.com', // sender address
      //to: "smyeong@digicaps.com, sykim@digicaps.com, txtcopy@naver.com ," + juEmail, // list of receivers
      to: to , // list of receivers
      subject: subject , // Subject line
      text: "", // plain text body 
      html:     "<table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%;background-color:#f8f8f9;letter-spacing:-1px'>" +   
      "<tbody> " +
      "<tr><td align='center'>"    +        
      "<table border='0' cellpadding='0' cellspacing='0'>"         +       
      "<tr><td width='595'>"          +
      "<div style='max-width:595px; margin:0 auto'>"    +            
      "<table align='center' border='0' cellpadding='0' cellspacing='0'" +
      "style='max-width:595px;width:100%;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,돋움,Dotum,Helvetica,Apple SD Gothic Neo,Sans-serif;background-color:#fff;-webkit-text-size-adjust:100%;text-align:left'>"+                   
      "<tbody><tr><td height='30'></td></tr>"+                   
      "<tr><td style='padding-right:27px; padding-left:21px'>"+                            
      "<table border='0' cellpadding='0' cellspacing='0'>"+                                
      "<tbody><tr>"+
      "<td style='' width='61'>" +                                       
      "<img src='https://i.imgur.com/88UU0TT.png'  width='500'/>" +
      "</td><td style='padding-left:5px'>" +                                                                       
      "</td></tr>"+                          
      "</tbody></table>"+                       
      "</td></tr>" +                 
      "<tr><td height='13'></td></tr>"+
      "<tr><td height='13'></td></tr>"+       
      "<tr><td height='13'></td></tr>"+                  
      "<tr><td style='padding-right:27px; padding-left:18px;line-height:34px;font-size:29px;color:#424240;font-family:나눔고딕,NanumGothic,맑은고딕,MalgunGothic,돋움,Dotum,Helvetica;'>"+
      "                            CQMS<br><span style='color:#fab005'>" + banner +"</span></br>"+                        
      "</td></tr>"+                    
      "<tr>"+
      "<td height='22'></td>"+
      "</tr>                    <tr>"+
      "<td height='1' style='background-color: #e5e5e5;'></td></tr>"         +                             
      "<tr><td style='padding-top:24px; padding-right:27px; padding-bottom:32px; padding-left:20px'>"+  
      "<table align='left' border='0' cellpadding='0' cellspacing='0' width='100%' style=font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,돋움,Dotum,Helvetica,Apple SD Gothic Neo,Sans-serif;>"+                               
      "<tbody><tr><td height='6'></td></tr>"+                                
   
                                                                                                                                      
      "<tr style='display:none;'>"+
      "<td height='24'></td></tr>"+
      "<tr><td style='font-size:14px;color:#696969;line-height:24px;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;'>"+                                        
      "<strong>아이디"+ 
      "<span style='color:#fab005'>" + mem_userid + "</span>"+ infoStr +"</strong><br>"+                                       
      "감사합니다."+
      //"<a href=" + url + "target='_blank' style='display:inline-block;margin-left:50px;color:#004790;line-:12px' rel='noreferrer noopener'>CQMS로 이동 </a> "+
      "</td></tr>"+                                
      "<tr><td height='24'></td></tr> "+                               
      "<tr><td style='font-size:14px;color:#696969;line-height:24px;font-family:나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;'>"+                                        
      "<tr>"+
      "<td height='22' style='border-bottom: 1px solid #e5e5e5'></td>"+
      "</tr>"+
      "</table>"
      // html body
    };
                    
    // send mail with defined transport object
    try{
      let info = await transporter.sendMail(mailOptions)
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return res.json({
        message: 'sendMail: success to send',
        code: 100,
      });

    }catch(error){
      return res.json({
        error: error
      });
    }



}













module.exports = router;
