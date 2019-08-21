import { observable, action, computed } from 'mobx';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import * as boardApi from '../lib/api/boardApi'
import moment from 'moment'
import history from '../history'
export default class sidebarStore{


    /* edit 스토어에 접근하기 위함  */
    constructor(rootStore) {
        this.rootStore = rootStore
    }
   @observable open = false;

   /*  */
   @action
   openSideBar = () => {
     this.open = !this.open
   }


}
