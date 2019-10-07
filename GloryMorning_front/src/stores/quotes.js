import { observable, action, computed } from "mobx";
import _ from "lodash";
import * as quotesApi from "../lib/api/quotesApi.js";
export default class QuotesStore {
  /* edit 스토어에 접근하기 위함  */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable isQuetosLoading  = false;
  @observable pageNumber = 1;
  @observable quotesList = [];

  @action
  getQuotes = async() => {
    let { pageNumber} = this; 
    let response;
    let tempQuetesList = [];
    try {
      this.isQuetosLoading = true;
      response = await quotesApi.getWisdomQuotes(pageNumber);
      console.log("[SEO] response", response.data)
      if( response.status === 200){
        tempQuetesList = response.data
      }
      this.isQuetosLoading = false;
      this.quotesList = tempQuetesList
    } catch (e) {
      console.log(e);
    }
  };

}
