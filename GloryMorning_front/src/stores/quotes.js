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

  @observable viewQuotes = '' // roling Quotes 
  @observable rollingQuotesInterval = ''
  @observable rollingQuotesIntervalTime = 2000;

  @observable rollingQuotesMode = true; //default 

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
      this.author = ''
      this.quotesStr = ''
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
  
  @action 
  rollingQuotes = () => {
    const { rollingQuotesIntervalTime } = this;
    console.log("[SEO] rollingQuotes");
    let index = 0;
    let len;
    this.rollingQuotesInterval = setInterval(() => {
      len = this.quotesList.length;
      if (index + 1 > len -1 ) {
        index = 0;
      } else {
        index += 1;
      }
        this.viewQuotes =  this.quotesList[index];
    },rollingQuotesIntervalTime);    
  }


  
  /* rolling mode , select Mode */
  @action 
  setQuetosMode = (rollingYn) => {
    this.rollingQuotesMode = rollingYn;
  }

  /* interval 시간 조정  */
  @action 
  setQuetosRollingIntervel = (isUp) => {
    let time = isUp ? 1000 : -1000 
    this.rollingQuotesIntervalTime  += time;
  }

  
}


