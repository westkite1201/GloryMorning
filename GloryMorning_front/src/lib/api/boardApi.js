import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

//image 업로드 
export const imageUpload = (data) =>{
   return (axios.post("http://localhost:3031/api/file/upload",data)) 
}


export const get_server_time = () =>{
    return (axios.post("http://localhost:3031/api/bus/get_server_time"));
}

/* 현재 공지사항이 view가 되는지 안되는지  */
export const getNoticeViewing = () => {
    return (axios.post("http://localhost:3031/api/board/getNoticeViewing"))
}



/* 게시판 가져오기 */
export const getBoardList = (POSTS_NUM) => {
    return (axios.post("http://localhost:3031/api/board/getBoardList"));
}

/*조회수 */
export const setViewsUp = (POSTS_NUM) => {
    const data ={
        POSTS_NUM : POSTS_NUM
    }
    return (axios.post("http://localhost:3031/api/board/setViewsUp",data));
}

export const cqmsCdrPurchaseManual = () => {
    return (
        axios({    
            url: "http://localhost:3031/api/bus/cqmsCdrPurchaseManual",
            method: 'GET',
            responseType: 'blob'
        })
    )
}

export const writePosts = (BOARD_NUM , POSTS_NUM, MEM_IDX, POSTS_JEMOK, POSTS_NAEYONG, THUMBNAIL,NOTICE_START, NOTICE_END, PRIME_YN) => {
    console.log("boardApi , THUMBNAIL", THUMBNAIL)
    
    const data = {
        BOARD_NUM  : BOARD_NUM,
        POSTS_NUM : POSTS_NUM,
        MEM_IDX  : MEM_IDX,
        POSTS_JEMOK : POSTS_JEMOK,
        POSTS_NAEYONG : POSTS_NAEYONG,
        THUMBNAIL : THUMBNAIL,
        NOTICE_START : NOTICE_START,
        NOTICE_END : NOTICE_END,
        PRIME_YN :PRIME_YN 
    }
    console.log("THUMBNAIL", data.THUMBNAIL);
    //return (axios.post(cilentConfig.endpoint.api + "/bus/board/writePosts",data))
    return (axios.post("http://localhost:3031/api/board/writePosts",data))
}

export const editPosts = (BOARD_NUM , POSTS_NUM, POSTS_JEMOK, POSTS_NAEYONG, PRIME_YN, NOTICE_START, NOTICE_END) => {
    console.log(NOTICE_START, NOTICE_END)
    const data = {
        BOARD_NUM : BOARD_NUM,
        POSTS_NUM : POSTS_NUM,
        POSTS_JEMOK : POSTS_JEMOK,
        POSTS_NAEYONG : POSTS_NAEYONG,
        PRIME_YN : PRIME_YN,
        NOTICE_START : NOTICE_START,
        NOTICE_END : NOTICE_END 
    }
    console.log(data);
    //return (axios.post(cilentConfig.endpoint.api + "/bus/board/writePosts",data))
    return (axios.post("http://localhost:3031/api/board/editPosts",data))
}

export const deletePosts = (BOARD_NUM, POSTS_NUM ) => {
    const data = {
        BOARD_NUM  : BOARD_NUM,
        POSTS_NUM : POSTS_NUM,
    }
    return (axios.post("http://localhost:3031/api/board/deletePosts",data))
}

export const ifPostsExist = (POSTS_NUM) => {
    const data = {
        POSTS_NUM : POSTS_NUM
    }
    return (axios.post("http://localhost:3031/api/board/ifPostsExist",data))
}

export const getPostsSequence = () => {
    //return (axios.post(cilentConfig.endpoint.api + "/bus/board/getPostsSequence",data))
    return (axios.post("http://localhost:3031/api/board/getPostsSequence"))
}

export const getPosts = (POSTS_NUM) => {
    const data = { 
        POSTS_NUM : POSTS_NUM
    }
    return (axios.post("http://localhost:3031/api/board/getPosts",data))
}

/* 게시글 불러오기  */
export const getPostsList = (offset, boardNum) => {
    const data = {
        offset : offset,
        BOARD_NUM : boardNum
    }
    //return (axios.post(cilentConfig.endpoint.api + "/bus/board/getPostsSequence",data))
    return (axios.post("http://localhost:3031/api/board/getPostsList", data))
}

/*NOTICE 불러오기  */
export const getNotice = () => {
    return (axios.post("http://localhost:3031/api/board/getNotice"))
}


/* COMMENT 관련  */
export const deleteComment = ( postsNum, commentNum ) => {
    const data = {
        POSTS_NUM : postsNum,
        COMMENT_NUM : commentNum,
    }
    console.log("deleteComment ", data)
    return (axios.post("http://localhost:3031/api/board/deleteComment", data ))
}



export const setComment = (postsNum, commentName, commentNaeyong, commentParent, password ) => {
    const data = {
        POSTS_NUM : postsNum,
        COMMENT_NAME : commentName,
        COMMENT_NAEYONG : commentNaeyong,
        COMMENT_PARENT : commentParent,
    }
    console.log("setComment ", data)
    return (axios.post("http://localhost:3031/api/board/setComment", data ))
}

export const getComment = (postsNum) => {
    const data = {
        POSTS_NUM : postsNum,
    }
    return (axios.post("http://localhost:3031/api/board/getComment", data))
}










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



/* 로그인 */
export const get_login_data = (mem_email, user_password) => {
    const data = {
      mem_email : mem_email,
      mem_password: user_password,
    }
    return (axios.post(cilentConfig.endpoint.api +"/login",data));
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
    return (axios.post(cilentConfig.endpoint.api + "/member/setMemberSignUp",data));
    //return (axios.post("http://localhost:3031/api/member/setMemberSignUp",data));
  }
  

export const getEmailIsAlreadyExist = (mem_userid) =>{
    console.log(mem_userid)
    const data = {
        mem_userid : mem_userid
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/getEmailIsAlreadyExist",data));
    //return (axios.post("http://localhost:3031/api/member/getEmailIsAlreadyExist",data));
}

export const getForgetPassword = (emailConfig) =>{
    const data ={
        emailConfig : emailConfig
    }
    //return (axios.post("http://localhost:3031/api/member/getForgetPassword",emailConfig));
    return (axios.post(cilentConfig.endpoint.api + "/member/getForgetPassword",data));
}

  

/* UserManageTable */
export const getMemberManagementList = () => {
    return (axios.post(cilentConfig.endpoint.api + "/member/getMemberManagementList"));
}

export const getUpdateByMemberAuth = (mem_gb_cd, mem_userid) => {
    const data ={
        mem_gb_cd : mem_gb_cd,
        mem_userid: mem_userid
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/getUpdateByMemberAuth",data));
    //return (axios.post("http://localhost:3031/api/member/getUpdateByMemberAuth",data));
}



/* UserManageTable */
/* GB_CD 별 GB_CD_NM */
export const getGubunCDMapping = () => {
    return (axios.post(cilentConfig.endpoint.api + "/member/getGubunCDMapping"));
   // return (axios.post("http://localhost:3031/api/member/getGubunCDMapping"));
}




/*구분별 DEFAULT TABLE을 위함   */
export const getGubunPageList = (mem_gb_cd, mem_userid) => {
    const data ={
        mem_gb_cd : mem_gb_cd,
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/getGubunPageList",data));
    //return (axios.post("http://localhost:3031/api/member/getGubunPageList",data));
}

/*구분별 페이지 세팅 , 초기 셀렉트 드롭박스 옵션을 위함  */
export const getpageCDMapping = () => {

    return (axios.post(cilentConfig.endpoint.api + "/member/getpageCDMapping"));
    //return (axios.post("http://localhost:3031/api/member/getpageCDMapping"));
}

/* 구분별 선택한 권한을 세팅  */
export const setSelectedPages = (mem_gb_cd, id_array) => {
   
    const data ={
        mem_gb_cd : mem_gb_cd,
        id_array :  id_array,
    }
  
    return (axios.post(cilentConfig.endpoint.api + "/member/setSelectedPages",data));
    //return (axios.post("http://localhost:3031/api/member/setSelectedPages",data));
}




//대기 인원 가져오기 
export const getStandbyMemberList = () => {
    return (axios.post(cilentConfig.endpoint.api + "/member/getStandbyMemberList"));
    //return (axios.post("http://localhost:3031/api/member/getStandbyMemberList"));
}


export const setMemberStatus = (mem_status, mem_userid) => {
    const data ={
        mem_status : mem_status,
        mem_userid :  mem_userid,
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/setMemberStatus",data));
    //return (axios.post("http://localhost:3031/api/member/setMemberStatus",data));
}




export const deleteMember = (mem_userid) => {
    const data ={
        mem_userid :  mem_userid,
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/deleteMember",data));
    //return (axios.post("http://localhost:3031/api/member/deleteMember",data));
}


/*승인 거절시 이메일 전송용  */
export const sendMail = (emailConfig) =>{
    const data ={
        emailConfig : emailConfig
    }
    return (axios.post(cilentConfig.endpoint.api + "/member/sendMail",data));
    //return (axios.post("http://localhost:3031/api/member/sendMail",data));
    
}


























