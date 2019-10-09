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

  @observable updateSelectNumMap = new Map();
  @observable author = ''
  @observable quotesStr = ''


  /* updateModeCheck */
  isUpdate = (quotesNum) => {
    if(this.updateSelectNumMap.get(quotesNum)){
      return true;
    }else{
      return false;
    }
  }

  @action
  getUpdateMapValue = (quotesNum) =>{
    return this.updateWisdomQuotesMap.get(quotesNum)
  }

  @action
  setUpdateMode = (item) => {
    this.updateSelectNumMap.set(item.QUOTES_NUM, true);
  }

  @action
  cancleUpdate = (quotesNum) => {
    this.updateSelectNumMap.set(quotesNum, false);
  }

  @action
  handleQuotes = (e) =>{
    this.quotesStr = e.target.value;
  }
  @action
  handleAuthor = (e) =>{
    this.author = e.target.value;
  }


  @action
  getQuotes = async() => {
    let { pageNumber } = this; 
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

  @action
  setWisdomQuotes = async(e) => {
    e.preventDefault();
    let response = ''
    let tempQuetesList = [];
    let quotesStr = this.quotesStr;
    let author = this.author;
    try {
      this.isQuetosLoading = true;
      response = await quotesApi.setWisdomQuotes(quotesStr, author);
      
      console.log("[SEO] response", response.data)
      if( response.status === 200){
        tempQuetesList = response.data
      }
      this.quotesList = tempQuetesList
      this.isQuetosLoading = false;
      this.handleAuthor = ''
      this.handleQuotes = ''
    } catch (e) {
      console.log(e);
    }
  }

  @action
  updateWisdomQuotes = async(quotesNum, wiseQuotes) => {
    let response = ''
    let tempQuetesList = [];
    console.log("[SEO] wiseQuotes " , wiseQuotes)
    let quotesStr = wiseQuotes.quotes;
    let author = wiseQuotes.author;
    try {
      this.isQuetosLoading = true;
      response = await quotesApi.updateWisdomQuotes(quotesNum, quotesStr, author);
      console.log("[SEO] response", response.data)
      if( response.status === 200){
        tempQuetesList = response.data
      }
      this.quotesList = tempQuetesList
      this.isQuetosLoading = false;
      /* */
      this.updateSelectNumMap.set(quotesNum, false);
    } catch (e) {
      console.log(e);
    }
  }

  @action
  deleteWisdomQuotes = async(quotesNum) => {
    let response = ''
    let tempQuetesList = [];
    try {
      this.isQuetosLoading = true;
      response = await quotesApi.deleteWisdomQuotes(quotesNum);
      if( response.status === 200){
        tempQuetesList = response.data
      }
      this.quotesList = tempQuetesList
      this.isQuetosLoading = false;
    } catch (e) {
      console.log(e);
    }
  } 
}
