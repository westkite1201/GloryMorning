import { observable, action, computed } from 'mobx';
import _ from 'lodash'
export default class CalenderStore{
    @observable year = ''
    @observable month = ''
    @observable selectedArr = [];
    @observable monthArray = [];

    @action
    setSelectedArr = (day) => {
        
    }
}