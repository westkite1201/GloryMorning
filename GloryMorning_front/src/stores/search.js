import { observable, action, computed } from "mobx";
import * as searchApi from "../lib/api/searchApi";
import _ from "lodash";

/* setting 이지만 현재 backgroundSetting 이라 보는게 맞다  */
export default class SearchStore {
  /* edit 스토어에 접근하기 위함  */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable isLoading = false;
  @observable searchAddressList = []
  @action 
  searchAddress = async(query) => {
    try{
        //오류날 경우 반복 요청해야하나?
        const res = await searchApi.searchAddress(query);
        if(res.status === 200){
          console.log("[SEO ] = ", res.data.documents);
          this.searchAddressList = res.data.documents;
        }
    }catch(e){

    }
  }
}
