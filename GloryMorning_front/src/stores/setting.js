import { observable, action, computed } from 'mobx';
import _ from 'lodash'
import * as boardApi from '../lib/api/boardApi'
import * as weatherApi from '../lib/api/weatherApi'
import moment from 'moment'
export default class SettingStore{

    /* edit 스토어에 접근하기 위함  */
    constructor(rootStore) {
        this.rootStore = rootStore
    }
   @observable open = false;
   @observable pixabayHits = []
   @observable isPixabayLoading = false;
   @observable query = ''
   @observable selectedBackgroundUrl = ''

   @action 
    onChangeQuery = e => {
        console.log("[SEO][ONCHAGENAME]", e.target.value)
        this.query = e.target.value;
    };
   
    @action
    setBackgroundUrl = (largeImageURL) =>{
        this.selectedBackgroundUrl = largeImageURL
    }
  @action
  getPixabayImages = async(imageType) =>{
        let response;
        try{
            this.isPixabayLoading = true;
            response = await weatherApi.getPixabayImages(this.query, imageType);
            console.log("[SEO] getPixabayImages", response);
            let pixabayData = response.data.data;
            // pixabayData.hits.map((item) =>{
            //     console.log("[SEO] item", item)
            // });
            this.pixabayHits = pixabayData.hits;
            this.isPixabayLoading = false;
        
        }catch(e){
            console.log(e)
        }

    }
}

