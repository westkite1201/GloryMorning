import { observable, action, computed } from "mobx";
import _ from "lodash";
import * as boardApi from "../lib/api/boardApi";
import * as weatherApi from "../lib/api/weatherApi";
import moment from "moment";
export default class SettingStore {
  /* edit 스토어에 접근하기 위함  */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable open = false;
  @observable pixabayHits = [];
  @observable isPixabayLoading = false;
  @observable query = "";
  @observable selectedBackgroundUrl = "";

  //detailView 화면에서 사용할 변수 
  @observable detailViewitem = {
    "largeImageURL": "",
    "webformatHeight": '',
    "webformatWidth": '',
    "likes": '',
    "imageWidth": '',
    "id": '',
    "user_id": '',
    "views": '',
    "comments": '',
    "pageURL": "",
    "imageHeight": '',
    "webformatURL": "",
    "type": "",
    "previewHeight": '',
    "tags": "",
    "downloads": '',
    "user": "",
    "favorites": '',
    "imageSize": '',
    "previewWidth": '',
    "userImageURL": "",
    "previewURL": ""
  }; 

  @action
  onChangeQuery = e => {
    console.log("[SEO][ONCHAGENAME]", e.target.value);
    this.query = e.target.value;
  };

  /* 현재 클릭시 백그라운드 설정 */
  @action
  setBackgroundUrl = largeImageURL => {
    console.log("[SEO] , setBackgroundUrl " , largeImageURL); 
    this.selectedBackgroundUrl = largeImageURL;
  };


  @action
  setdetailViewItem = (item) =>{
    console.log("[SEO] , setdetailViewItem " , item); 
    this.detailViewitem = Object.assign({}, item)
  }

  @action
  getPixabayImages = async imageType => {
    let response;
    try {
      this.isPixabayLoading = true;
      response = await weatherApi.getPixabayImages(this.query, imageType);
      console.log("[SEO] getPixabayImages", response);
      let pixabayData = response.data.data;
      // pixabayData.hits.map((item) =>{
      //     console.log("[SEO] item", item)
      // });
      this.pixabayHits = pixabayData.hits;
      this.isPixabayLoading = false;
    } catch (e) {
      console.log(e);
    }
  };

}
