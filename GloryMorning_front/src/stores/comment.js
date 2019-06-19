import { observable, action, computed } from 'mobx';
import _ from 'lodash'
import * as boardApi from '../lib/api/boardApi'
import history from '../history'
export default class commentStore{
    @observable commentName = ''
    @observable commentNaeyong = ''
    @observable commentItems = []
  
    @action
    handleCommentNameChange = (e) => {
        console.log(e)
        this.commentName = e.target.value
    }
    @action
    handleCommentNaeyongChange = (e) => {
        this.commentNaeyong = e.target.value
    }
    @action
    handleCommentSubmit = async(boardRouterName, postsNummber, postsParent) => {
        console.log("postsNummber!!!", postsNummber)
        try{ 
            const response = await boardApi.setComment( postsNummber, 
                                                        this.commentName,
                                                        this.commentNaeyong,
                                                        postsParent);
   
        
        if (response.statusText === "OK") { //포스트 작성 성공 
            const response = await boardApi.getComment(postsNummber);
            this.commentItems = response.data
        }
        
        }catch(e){
            console.log(e)
        }
    }

    @action
    getComment = async(postsNum) => {
        try{ 
            const response = await boardApi.getComment(postsNum);
            this.commentItems = response.data
        }catch(e){
            console.log(e)
        }

    }

    @action 
    deleteComment = async(postsNum, commentNum) => {
        try{ 
            const response = await boardApi.deleteComment(postsNum, commentNum);
            if (response.statusText === "OK") { //포스트 작성 성공 
                const response = await boardApi.getComment(postsNum);
                this.commentItems = response.data
            }
        }catch(e){
            console.log(e)
        }

    }

}