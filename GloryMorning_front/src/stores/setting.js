import { observable, action, computed } from "mobx";
import _ from "lodash";
import * as memberApi from "../lib/api/memberApi";
import * as weatherApi from "../lib/api/weatherApi";
import { toast } from "react-toastify";

/* setting 이지만 현재 backgroundSetting 이라 보는게 맞다  */
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

  @observable backgroundBookMark = [];

  //detailView 화면에서 사용할 변수
  @observable detailViewitem = {
    largeImageURL: "",
    webformatHeight: "",
    webformatWidth: "",
    likes: "",
    imageWidth: "",
    id: "",
    user_id: "",
    views: "",
    comments: "",
    pageURL: "",
    imageHeight: "",
    webformatURL: "",
    type: "",
    previewHeight: "",
    tags: "",
    downloads: "",
    user: "",
    favorites: "",
    imageSize: "",
    previewWidth: "",
    userImageURL: "",
    previewURL: ""
  };

  @action
  onChangeQuery = e => {
    console.log("[SEO][ONCHAGENAME]", e.target.value);
    this.query = e.target.value;
  };

  //redis에서 백 그라운드 가져오기
  @action
  getUserBackground = async () => {
    console.log("[SEO] getUserBackground");
    try {
      let resData = await memberApi.getUserBackground("testUser");
      this.selectedBackgroundUrl = resData.data.backgroundURL;
    } catch (e) {
      console.log("error ", e);
    }
  };

  //redis에 저장
  @action
  settingBackgroundURLRedis = async () => {
    try {
      let response = await memberApi.setUserBackground(
        "testUser",
        this.detailViewitem.largeImageURL
      );
      console.log("[seo][settingBackgroundURLRedis] response", response);
      if (response.data.message === "success") {
        console.log("h???");
        toast.success("🦄 야호 저장에 성공하였습니다!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
      let resData = await memberApi.getUserBackground("testUser");
      console.log("[SEO]backgroundURL ", resData.data.backgroundURL);
      this.selectedBackgroundUrl = resData.data.backgroundURL;
    } catch (e) {
      console.log("error ", e);
    }
  };

  /* 현재 클릭시 백그라운드 설정 */
  @action
  setBackgroundUrl = largeImageURL => {
    console.log("[SEO] , setBackgroundUrl ", largeImageURL);
    this.selectedBackgroundUrl = largeImageURL;
  };

  @action
  setdetailViewItem = item => {
    console.log("[SEO] , setdetailViewItem ", item);
    this.detailViewitem = Object.assign({}, item);
  };

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
      this.isPixabayLoading = false;
      this.pixabayHits = pixabayData.hits;
    } catch (e) {
      console.log(e);
    }
  };

  @action
  addBookMarkBackGround = item => {
    this.backgroundBookMark.push(Object.assign({}, item));
    console.log("[SEO] addBookMarkBackGround ", this.backgroundBookMark);
  };

  @action
  filterBookMarkBackGround = id => {
    this.backgroundBookMark = this.backgroundBookMark.filter(item => {
      return item.id !== id;
    });
  };

  @action
  saveBookMarkBackground = async () => {
    try {
      const response = await memberApi.saveBookMarkBackground(
        this.backgroundBookMark
      );
      if (response.status === 200) {
        toast.success("🦄 야호 저장에 성공하였습니다!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
      console.log("[SEO] saveBookMarkBackground = ", response);
    } catch (e) {}
  };

  @action
  getBookmarkBackground = async () => {
    let memIdx = 1;
    try {
      const response = await memberApi.getBookmarkBackground(memIdx);
      console.log("[SEO] getBookmarkBackgroud = ", response);
      this.backgroundBookMark = response.data.map(item => {
        return {
          memIdx: item.MEM_IDX,
          id: item.ID,
          pageURL: item.PAGE_URL,
          previewURL: item.PREVIEW_URL,
          largeImageURL: item.LARGE_IMAGE_URL,
          tags: item.TAGS,
          likes: item.LIKES,
          favorites: item.FAVORITES,
          views: item.VIEW
        };
      });
    } catch (e) {
      console.log(e);
    }
  };
}
