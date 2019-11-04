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

  //선택된 address s
  @observable selectedAddressList= []

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

  checkSeleted  = (name) => { 
    let isExist = false;
    for(let key of this.selectedAddressList) {
      console.log(key.name  + " " + name)
      if(key.name === name){
        isExist = true;
        break;
      }
    }
    console.log("[SEO] checkSelected " , name, isExist)
    return isExist;
  }

  /* 
    밑에꺼를 동일하게 사용하면 될 줄 알았으나 
    오류로 인해 함수를 하나 더 만들겠
  */
  @action 
  spliceSelectedList = (name) => { 
    let index = 0;
    console.log("name " , name)
    this.selectedAddressList= this.selectedAddressList.filter((item) =>{
      return ( item.name !== name )
    })
  }
 

  @action
  setSelectItem = (item) => {
    let index = 0;
    let isExist = false;
    for(let key of this.selectedAddressList) {
      console.log(key.name, " " ,  item.name)
      if(key.name === item.name){
        isExist = true;
        break;
      }
      index += 1; 
    }
    if(isExist) {
      this.selectedAddressList.splice(index, 1); // 현재 인덱스만 날림 
    }else{
      this.selectedAddressList.push(item)
    }
    console.log(this.selectedAddressList)
  }

}
