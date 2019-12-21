import { observable, action } from 'mobx';
import _ from 'lodash'
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
