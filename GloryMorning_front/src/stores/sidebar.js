import { observable, action, computed } from 'mobx';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import * as boardApi from '../lib/api/boardApi'
import moment from 'moment'
import history from '../history'
export default class sidebarStore{
   @observable open = true;


   @action
   openSideBar = () => {
     this.open = !this.open
   }


}
