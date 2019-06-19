import { observable, action, computed } from 'mobx';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import * as boardApi from '../lib/api/boardApi'
import moment from 'moment'
import history from '../history'
import { TweenMax, Power3} from "gsap/TweenMax";
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';
export default class BoardStore{
    @observable pageCount = ''
    @observable boardList = []
    @observable offset = 0
    @observable PERPAGE = 10;
      // 아래 추가.
    @observable isLast = false;
    @observable isLoading = false;
    @observable renderCount = 1;
    //editor, 
    @observable editorHtml = ''
    @observable rawHtml = ''
    @observable showRaw =  false
    @observable lineHeight = 12
    @observable range =  ''



    //editBoard


    // writeBoard
    @observable thumbnailDisplayUrl;
    @observable thumbnailImg;
    @observable postJemok;
    @observable options;
    @observable selectedOption;
    @observable isSearchable = true
    @observable isClearable = true

    @observable boardViewContent = {
        boardNum : '',
        memUsername : '',
        postsJemok : '',
        postsNaeYong : '',
        postsNumber : '',
        primeYN : '',
        regDate : '',
        editDate: '',
        views : '',
        noticeStart : '',
        noticeEnd : '',
        boardRouterPath : '',
        thumbnail : '',
    }


    @observable headerListId = []
    @observable headerMap = new Map();
    /* Heading TAG 찾기 리스트박스용 */
    @action
    scrollToElement = (key) => {
        console.log("scrollToElement key", key)
        let topPos = this.headerMap.get(key);
        console.log(topPos)
        window.scrollTo(0,topPos-100)
        //TweenMax.to(window, 1,{ scrollTo: {y : parseInt(topPos) ,  autoKill: true} , ease : Power3.easeOut });
        //TweenLite.to(this.spr.scale, .2, {x: 0.8, y: 0.8, ease: Power2.easeInOut})
    }
    /* Heading TAG 찾기 리스트박스용 */
    @action
    findHeadingTag = () =>{
        let headerMap = new Map();
        let headerList = document.querySelectorAll( 'h1, h2' );
        let headerListConcatId = []
        let headerListId = []
        headerList.forEach((item, key) =>{
            if( key !== 0 ){
                var topPos = item.offsetTop;
                console.log(topPos)
                item.setAttribute('id' ,item.childNodes[0].textContent + "_" + key )
                headerListConcatId.push(item);
                headerListId.push(item.childNodes[0].textContent + "_" + key)
                //window.scrollTo(0, topPos) 
                //제목은 안됌 
                headerMap.set(item.childNodes[0].textContent + "_" + key, topPos)
            }
        })

        headerListId.forEach((item, key) =>{
            console.log('item  ', item)
        })
        this.headerListId = headerListId;
        this.headerMap = headerMap;
    //     let el = document.querySelector("#ㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴ_1")
    //     console.log(el)
    // }
    }

    /* editPost추가 */
    /* WRITEPOSTS 초기화 */
    @action
    init = () =>{
        this.thumbnailDisplayUrl =''
        this.thumbnailImg = ''
        this.postJemok = ''
        // this.options = ''
        this.selectedOption =''
        this.isSearchable = true
        this.isClearable = true


        this.editorHtml = ''
        this.rawHtml = ''
        this.showRaw =  false


        this.boardViewContent = {
            boardNum : '',
            memUsername : '',
            postsJemok : '',
            postsNaeYong : '',
            postsNumber : '',
            primeYN : '',
            regDate : '',
            views : '',
            noticeStart : '',
            noticeEnd : '',
            boardRouterPath : '',
        }
    
    }



    /* editor 함수  */
    @action
    change = (rawQuillRef) =>{
        console.log(rawQuillRef.scrollHeight)
        this.lineHeight = rawQuillRef.scrollHeight;
       // this.editorHtml = "<p>이걸로바껴라</p>"
    }

    @action
    handleChange = (html,scrollHeight) => {
       // console.log(html, "scroll ", this.testref.scrollHeight)
         this.editorHtml =  html;
    }

    @action
    handleChangeRaw = (html, scrollHeight) => {
          console.log('handleChangeRaw',html, scrollHeight)
          this.rawHtml = html
          this.editorHtml = html
          this.lineHeight = 0 //초기화
          this.lineHeight = scrollHeight //html 코드뷰 크기 리사이
          //console.log("lineHeight ", this.lineHeight)
      }

    @action
    handleClickShowRaw = (rawQuillRef) =>{
        console.log('click handleClickShowRaw', rawQuillRef.scrollHeight)
        const isEditingRaw = this.showRaw;      
     
        this.showRaw = !isEditingRaw 
        this.syncViews(isEditingRaw,rawQuillRef)
    }
    @action
      syncViews = (fromRaw, rawQuillRef) => {
          //true일때 
        if (fromRaw) {
            this.editorHtml = this.rawHtml
        }
        //false 일떄 
        else{
          this.rawHtml = this.editorHtml
        }
        console.log("rawQuillRef" , rawQuillRef.scrollHeight)
        console.log("this.editorHtml ",this.editorHtml)
        console.log("this.rawHtml ",this.rawHtml)
    }
    /* editor 함수  끝 */



    /* write Posts */
    //이미지 업로드 
    @action
    imageUplaod = () =>{ 
        if( _.isNil(this.thumbnailImg)){
            return;
        }
        var formData = new FormData();
        formData.append("upload", this.thumbnailImg);
        //formData.append("author", confirm.mem_email);
        console.log('formData ', formData)
        console.log(' input.files[0] ',  this.thumbnailImg)
        //데이터 전송 및 서버에 저장 
        try{
          const response =  boardApi.imageUpload(formData);
          console.log('imageUplaod.response')

          let name = this.thumbnailImg.name.split('.')[0]
          let ext = this.thumbnailImg.type.split('/')[1]
          //ex http://i.imgur.com/jUwZDLR.jpg 
          const GET_IMAGE_URI = "http://localhost:3031/api/file/image/"
          let value = GET_IMAGE_URI + name +"."+ext
          return value;
        }catch(e){
            console.log('error ', e)
        }
    }
    //썸네일 이미지 컨트롤 
    @action 
    selectThumbnail = ()=> {
        console.log('hello')
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // // Listen upload local image and save to server
            //05-06 
         input.onchange = async() => {
            this.thumbnailDisplayUrl = URL.createObjectURL(input.files[0])
            this.thumbnailImg  =  input.files[0]
        }
    }


    @action
    handlePostsJemokChange = (e) => {
        console.log("handlePostsJemokChange??", this.boardViewContent.postsJemok)
        this.postJemok = e.target.value

    }

     //게시판 선택지 만들기 
     //셀렉트 옵션  //
     @action 
    selectHandleChange = (selectedOption) => {
        console.log(selectedOption)
        this.selectedOption =  selectedOption;  
     }
    @action 
    makeSelectOption = async(boardNum) => {
        console.log("boardNum!", boardNum)
        try{
            const getBoardList = await boardApi.getBoardList();
            let boardList = getBoardList.data;
            console.log(boardList)
            boardList = boardList.map((item) => {
                return {
                    value : item.BOARD_NUM,
                    label : item.BOARD_NAME
                }
            });
            boardList.unshift(
                {
                    value : 0,
                    label : '게시판을 선택해주세요'
                }
            )
        
     
            this.selectedOption = boardList.filter((item) => item.value === boardNum )
            this.options = boardList
            console.log(boardList.filter((item) => item.value === boardNum ))
         }catch(e){
            console.log('error' , e )
         }

     }

     /* editPosts */
    editPosts = async() => {
        console.log("selectedOption ", this.selectedOption.value)
        try {
            const response = await boardApi.editPosts(parseInt(_.isNil(this.selectedOption.value) ? this.selectedOption[0].value : this.selectedOption.value), 
                parseInt(this.boardViewContent.postsNumber) , 
                this.postJemok, 
                this.editorHtml, 
                this.boardViewContent.checked ? 'Y' : 'N',

                );
            //console.log(response)
            if (response.statusText === "OK") { //포스트 작성 성공 
                history.push("/board/"+ `${this.boardViewContent.boardRouterPath}` +"/" +`${this.boardViewContent.postsNumber}`);
            }
        }catch(e){
            console.log(e)
        }

        }

      /* 포스트 존재한다면  */
      @action
      ifPostsExist = async({match}) =>{
        //console.log('posts')
        let editNumber = match.params.editNumber;
        //console.log("editNumber ", editNumber )
        try {
            const ifExistRes = await boardApi.ifPostsExist(editNumber);
            let ifExist = ifExistRes.data[0].IFEXIST;
            if ( ifExist === 1){
                //세션체크 바람\
                this.setPosts({match});
            }else{
                alert('잘못된 접근입니다.')
                history.push("/board/");
            }
        }catch(e){
            console.log(e)
        }
      }

      //setPosts
      @action
      setPosts = async({match}) =>{
        const response = await boardApi.getPosts(match.params.editNumber);
        console.log(response)
        let postsContent = response.data[0];
        let boardNum = postsContent.BOARD_NUM;
        let boardRouterPath = postsContent.BOARD_ROUTER_PATH;
        let postsJemok = postsContent.POSTS_JEMOK;
        let postsNaeyong = postsContent.POSTS_NAEYONG;
        let postsPrimeYN = postsContent.PRIME_YN;
        let noticeStart = postsContent.NOTICE_START;
        let noticeEnd = postsContent.NOTICE_END;
        console.log('noticeStart ', moment(noticeStart)._d)
        console.log('noticeEnd ', noticeEnd)

        this.editorHtml = postsNaeyong;
        this.postJemok = postsJemok;
        this.boardViewContent ={
            memUsername : '',
            boardNum : boardNum,
            postsJemok : postsJemok,
            postsNaeYong : postsNaeyong,
            postsNumber : match.params.editNumber,
            primeYN : postsPrimeYN,
            regDate : null,
            editDate : null,
            views : '',
            noticeStart : noticeStart,
            noticeEnd : noticeEnd,
            boardRouterPath : boardRouterPath
        }
        this.makeSelectOption(boardNum)
      }













    /* BOARD_NUM, POSTS_NUM, MEM_IDX, POSTS_JEMOK, POSTS_NAEYONG */
    writePosts = async(confirm) => {
       console.log("this.selectedOption " , this.selectedOption)
       if( _.isNull(this.selectedOption)){
          alert('게시판을 선택해주세요!')
          return;
       }
      if(this.selectedOption.BOARD_NUM === 0 ||
          _.isEmpty(this.selectedOption) ) {
           alert('게시판을 선택해주세요!')
           return;
      }
      let thumbnail = this.imageUplaod();
      console.log('thubmNAIL', thumbnail )
      try {
          const getPostsSequence = await boardApi.getPostsSequence();
          let sequence = getPostsSequence.data[0].SEQUENCE
          console.log(sequence)
          console.log('selectedOption.BOARD_NUM ', this.selectedOption.value)
          const response = await boardApi.writePosts(  this.selectedOption.value, 
                                                  parseInt(sequence), 
                                                  confirm.mem_idx, 
                                                  this.postJemok,
                                                  this.editorHtml,
                                                  thumbnail 
                                                  //moment(from).format('YYYY/MM/DD 00:00:00'),
                                                  //moment(to).format('YYYY/MM/DD 00:00:00'),
                                                  //checked ? 'Y' : 'N');
          )
          if (response.statusText === "OK") { //포스트 작성 성공 
              history.push("/board/notice/" +`${sequence}`);
          }else{
              alert('실패')
          }
      }catch(e){
          console.log(e)
      }
    }



    @action
    setOffset = (offsetnow) =>{
        this.offset = offsetnow;
        this.renderCount += 1;
        this.isLoading = true;
    }
    @action
    setInitForInfScroll = () =>{
        this.offset = 0;
        this.isLoading = false;
        this.isLast = false;
        this.renderCount = 1; 
    }
     //PostList 가져오기 
     @action
     getPostsListForInf = async() => {
         try{
             const response =  await boardApi.getPostsList(this.offset);
         
             let postContent = response.data.posts;
             let meta = response.data.meta
             console.log(response)
             console.log(postContent)
             
             let boardList = postContent.map((item) =>{
                         return ({
                                 postsNum : item.POSTS_NUM,
                                 memUsername : item.MEM_USERNAME,
                                 postsJemok : item.POSTS_JEMOK,
                                 postsNaeYong : item.POSTS_NAEYONG,
                                 thumbnail : item.THUMBNAIL,
                                 regDate : moment(item.REG_DATE).format('YYYY.MM.DD HH:MM'),
                                 editDate : moment(item.EDIT_DATE).format('YYYY.MM.DD HH:MM'),
                                 primeYn : item.PRIME_YN,
                                 views: item.VIEWS,
                         })
             })
 
             //만약에 
             if( boardList.length > 0 ){
                 if ( boardList[0].primeYn !== 'Y' ){
                 
                 }
             }
            boardList.map((item)=>{
                this.boardList.push(item);
             })
             this.pageCount =  Math.ceil(meta.total_count / meta.limit)
             
             this.isLoading = false;
             
             if( this.offset + 10 > meta.total_count ){
                this.isLast = true;
             }
         }catch(e){
             console.log(e)
         }
     }
 
    





    //PostList 가져오기 
    @action
    getPostsList = async(boardNum) => {
        try{
            const response =  await boardApi.getPostsList(this.offset, boardNum);
        
            let postContent = response.data.posts;
            let meta = response.data.meta
            console.log(response)
            console.log(postContent)
            
            let boardList = postContent.map((item) =>{
                        return ({
                                postsNum : item.POSTS_NUM,
                                memUsername : item.MEM_USERNAME,
                                postsJemok : item.POSTS_JEMOK,
                                postsNaeYong : item.POSTS_NAEYONG,
                                thumbnail : item.THUMBNAIL,
                                regDate : moment(item.REG_DATE).format('YYYY.MM.DD HH:MM'),
                                editDate : moment(item.EDIT_DATE).format('YYYY.MM.DD HH:MM'),
                                primeYn : item.PRIME_YN,
                                views: item.VIEWS,
                        })
            })

            //만약에 
            if( boardList.length > 0 ){
                if ( boardList[0].primeYn !== 'Y' ){
                
                }
            }
            this.boardList = boardList
            this.pageCount =  Math.ceil(meta.total_count / meta.limit)
    
        }catch(e){
            console.log(e)
        }
    }


    //For VIEW 
    //글 읽기 
    @action
    getPosts = async({match}) => {
        let num = match.params.postsNumber;
        console.log(match.url, num)
        try{
            boardApi.setViewsUp(num); // 조회수 업뎃 
            const response = await boardApi.getPosts(num);
            let postContent = response.data[0];
            console.log("postContent@@@@@@@, ", postContent)
            let MEM_USERNAME = postContent.MEM_USERNAME;
            let POSTS_NUM =  num;
            let POSTS_JEMOK = postContent.POSTS_JEMOK;
            let POSTS_NAEYONG = postContent.POSTS_NAEYONG;
            let PRIME_YN = postContent.PRIME_YN;
            let REG_DATE = postContent.REG_DATE;
            let EDIT_DATE = postContent.EDIT_DATE;
            let VIEWS = postContent.VIEWS + 1;
            let NOTICE_START = postContent.NOTICE_START;
            let NOTICE_END = postContent.NOTICE_END;
            let BOARD_ROUTER_PATH = postContent.BOARD_ROUTER_PATH;
            let THUMBNAIL = postContent.THUMBNAIL;
            console.log(POSTS_JEMOK)

            this.boardViewContent ={
                memUsername : MEM_USERNAME,
                postsNum : POSTS_NUM,
                postsJemok : POSTS_JEMOK,
                postsNaeYong : POSTS_NAEYONG,
                primeYN : PRIME_YN,
                regDate : REG_DATE,
                editDate :EDIT_DATE,
                views : VIEWS,
                noticeStart : NOTICE_START,
                noticeEnd : NOTICE_END,
                boardRouterPath : BOARD_ROUTER_PATH,
                thumbnail : THUMBNAIL 
            }

        }catch(e){
            console.log(e)
        }
    }



}