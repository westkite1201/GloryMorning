import React,{Component} from "react";
import style from './SearchGraphPeriodDouble.module.css'
import 'react-day-picker/lib/style.css';
import  { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ko';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import * as api from '../../../lib/api/api';
import helpers from '../../../lib/helpers';


// import { Button, ButtonGroup, } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



/* 퍼타이틀, 고화질화 , 음량균일화 에서 사용중  */
class SearchGraphPeriodDouble extends Component {

    state  ={
        from: undefined,
        to: undefined,

        defalut_from : '', 
        defalut_to : '',

        value :  '',

        buttonClickName : this.props.weeklyReportUseFlag !== 'use' ? 'week' : 'month',
        componentNameList : []
    }

 /*
  추가#
  shouldComponentUpdate
    dataToTransfer는 컴포넌트 간 데이터 전송 시 필요한 데이터가 저장되는 변수로
    EditableLayout의 모든 child components에 props로 전달된다.
    어떤 컴포넌트가 데이터를 받는지 알 수 없기 때문에 key값이 컴포넌트의 이름과 같으면
    데이터에 대한 처리를 하고 값이 다르면 리렌더링을 하지 않는다.
  */
    shouldComponentUpdate(nextProps, nextState) {
        /* 현재 scatter data 랑 nextState.data랑 같으면 렌더링 X  */
        // if( this.state.data === nextState.data){
        //     return false;
        // }
       // console.log('shouldComponentUpdate')
        if(nextProps.dataToTransfer !== this.props.dataToTransfer){
            if(!helpers.isEmpty(nextProps.dataToTransfer) &&
                !helpers.isEmpty(nextProps.dataToTransfer[this.constructor.name])){
                //processing
                //this.searchAllContentData(nextProps.dataToTransfer[this.constructor.name]) 이렇게 사용 
                return true;
            }
            else{
                if(this.state !== nextState ){
                    return true;
                }
                 return false; 
            }
        }
        return true;
    }
    


    SearchClick = async() => {
        const { value } = this.state;
        const {selectedOption, from, to, componentNameList}  =this.state;

        //console.log(from ,to );
        if(from === undefined || to === undefined){
            alert('올바른 기간을 입력해주세요.')
            return 
        }
        let before_date = moment(from).format('YYYYMMDD');
        let after_date =  moment(to).format('YYYYMMDD');
        
       
        await this.props.dataTransmission( componentNameList[0], 
            {
                judge: 'graphSearch',
                before_date: before_date,
                after_date : after_date,
             
            }
        )    
        await this.props.dataTransmission( componentNameList[1], 
            {
                judge: 'graphSearch',
                before_date: before_date,
                after_date : after_date,
             
            }
        )    
    
    }

    /* 그룹 버튼  */
    SearchButtonClick = async(e) => {     
        const { defalut_from, defalut_to, from, to, componentNameList}  =this.state;
        let buttonName = e.target.name

       // console.log('from!!!!!!!!!!!!!!' ,from)
       // console.log('to!!!!!!!!!!!!!!!!!!' , to)
        if(from === undefined || to === undefined){
            alert('올바른 기간을 입력해주세요.')
            return 
        }
 

        if(buttonName === 'week'){ //일주일 
            let before_date = moment(to - 6 * 24 * 3600 * 1000).format('YYYYMMDD')
            let after_date =  moment(to - 0  * 24 * 3600 * 1000).format('YYYYMMDD')
            // console.log('before_date ' , before_date);
            // console.log('after_date ' , after_date);

            await this.props.dataTransmission( componentNameList[0], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'week'
                }
            )
            await this.props.dataTransmission( componentNameList[1], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'week'
                 
                }
            )        



            this.setState({
                 from :  moment(before_date)._d,
                 to : moment(after_date)._d,
                 buttonClickName  : 'week'  
             })    

        }
        if( buttonName === 'month'){
            let before_date = moment(to - 30 * 24 * 3600 * 1000).format('YYYYMMDD')
            let after_date =  moment(to - 0  * 24 * 3600 * 1000).format('YYYYMMDD')
            // console.log('before_date ' , before_date);
            // console.log('after_date ' , after_date);
            await this.props.dataTransmission( componentNameList[0], 
            {
                judge: 'graphSearch',
                before_date: before_date,
                after_date : after_date,
                range : 'month'
             
            })
            await this.props.dataTransmission( componentNameList[1], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'month'
                 
                }
            )    


            this.setState({
                 from :  moment(before_date)._d,
                 to : moment(after_date)._d,
                 buttonClickName  : 'month'  
             })    
        }      
        if( buttonName === 'year'){
            let before_date = moment(to - 365 * 24 * 3600 * 1000).format('YYYYMMDD')
            let after_date =  moment(to - 0  * 24 * 3600 * 1000).format('YYYYMMDD')
            //console.log('before_date ' , before_date);
            //console.log('after_date ' , after_date);

            await this.props.dataTransmission( componentNameList[0], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'year'
                }
            )    
            await this.props.dataTransmission( componentNameList[1], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'year'
                }
            )    

            this.setState({
                 from :  moment(before_date)._d,
                 to : moment(after_date)._d,
                 buttonClickName  : 'year'  
             })   

        }


        if( buttonName === 'day'){
            let before_date = moment(to - 1 * 24 * 3600 * 1000).format('YYYYMMDD')
            let after_date =  moment(to - 0  * 24 * 3600 * 1000).format('YYYYMMDD')
            //console.log('before_date ' , before_date);
            //console.log('after_date ' , after_date);

            await this.props.dataTransmission( componentNameList[0], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'day'
                }
            )    
            await this.props.dataTransmission( componentNameList[1], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'day'
                }
            )    

            this.setState({
                 from :  moment(before_date)._d,
                 to : moment(after_date)._d,
                 buttonClickName  : 'day'  
             })   

        }
        if (buttonName ==='전체'){
            let before_date = moment(defalut_from - 0  * 24 * 3600 * 1000).format('YYYYMMDD')
            let after_date =  moment(defalut_to - 0 * 24 * 3600 * 1000).format('YYYYMMDD')
           // console.log('before_date ' , before_date);
            //console.log('after_date ' , after_date);
            await this.props.dataTransmission( componentNameList[0], 
            {
                judge: 'graphSearch',
                before_date: before_date,
                after_date : after_date,
                range : 'all'
             
            })    
            await this.props.dataTransmission( componentNameList[1], 
                {
                    judge: 'graphSearch',
                    before_date: before_date,
                    after_date : after_date,
                    range : 'all'
                }
            )    

            this.setState({
                from :  moment(before_date)._d,
                to : moment(after_date)._d,
                buttonClickName  : '전체'  
            })   
        }
    }



    componentDidMount(){
        this.get_system_date_and_min_date();
    }
    /*오늘 시스템 세팅  */
    get_system_date_and_min_date = async() =>{
        try {
          //console.log('getRowData*****************************')
          const response =await api.get_system_date_and_min_date();
          //console.log('response' ,response.data);
          let resData = response.data[0];
          let {componentNameList} = this.props;
          //console.log('componentName!!!!!!!!!!!!!!!!!!!', componentNameList)
              //일주일전 
          let defaultGap = this.props.weeklyReportUseFlag === 'use' ? 30 : 6
          let fromDay = (moment(resData.NOW_DATE)).valueOf() - defaultGap  * 24 * 3600 * 1000
          //console.log('moment(resData.MIN_DATE)._d, ', moment(resData.MIN_DATE)._d, )
          await this.setState({
            from : moment(fromDay)._d, 
            to :  moment(resData.NOW_DATE)._d,
            defalut_from :  moment(resData.MIN_DATE)._d, 
            defalut_to : moment(resData.NOW_DATE)._d,
            componentNameList : componentNameList,
            today : false
          })
      } catch (e) {
        // 오류가 났을 경우
        console.log(e);
      }
    }

    /* daypicker 함수  */
    showFromMonth() {
        //console.log('showFromMonth')
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange = (from) => {
        //console.log('handleFromChange')
        // Change the from date and focus the "to" input field
        this.setState({ 
            from,
            buttonClickName  : ''   
        });
    }

    handleToChange = (to) => {
        //console.log('handleToChange')
        this.setState({ to , buttonClickName  : ''   }, this.showFromMonth,);
    }

    handleOnCheckClick = (e) => {
        //console.log(e.target.name)
        //disable알아보기 , 
        //체크 딱 하나만 선택되게 하기 
        //

        //---1번이 선택됬을때
        //from ,to 선택가능 , 퍼타이틀에서만 검색 가능 
        
        //---2번이 선택됬을때 
        //현재 서비스중 (배포승인)에서 검색 가능 , to 만 선택가능 from 은 항상 고정, disable
        
        //----3번이 선택됬을때 ,
        //소재상태 무시 전체 에서 검색 가능 , to만 선택가능 from은 항상 고정 ,disable

    }



    render() {      
        //console.log('render')     
        const { from, to } = this.state;
        const { SearchClick, SearchButtonClick } = this;
        const { weeklyReportUseFlag } = this.props;
        //console.log(from, to);
        const modifiers = { start: from, end: to };
        return (
            <div>
                <div className = {style.searchbar_container}>
                    <div className="InputFromTo">
                    <DayPickerInput
                        value={from}
                        //placeholder="From"
                        placeholder={`${formatDate(new Date(), 'LL', 'ko')}`}
                        //placeholder= '전체'
                        format="YYYY-MM-DD"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { after: to },
                            toMonth: to,
                            modifiers,
                            numberOfMonths: 1,
                            locale: 'ko',
                            localeUtils: MomentLocaleUtils,   
                            onDayClick: () => this.to.getInput().focus(),
                        }}
                        onDayChange={this.handleFromChange}
                    />{' '}
                    —{' '}
                    <span className="InputFromTo-to">
                        <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        //placeholder="To"
                        placeholder={`${formatDate(new Date(), 'LL', 'ko')}`}
                        format="YYYY-MM-DD"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: from },
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 1,
                            locale: 'ko',
                            localeUtils: MomentLocaleUtils,    
                        }}
                        onDayChange={this.handleToChange}
                        />
                     </span>
         
                {/* 종원이가 만든 통합 검색 잠시 대기한다 .
                <input className = {style.inputBox}
                        name = 'keyword'
                        type = 'text'
                        placeholder = '검색하기'
                        onKeyPress = { this.handleKeyPress }
                />
                */}
                <Button onClick ={SearchClick}> SEARCH </Button>
                
                <div className = {style.searchButtonClickContainer}>
                {
                    <div className = {style.searchButtonClickContainer}>
                        <button className = { this.state.buttonClickName === 'week' ? 
                                                style.searchButtonClick :  style.searchButton
                                            }
                                onClick ={SearchButtonClick}
                                name ='week' >
                                일주일
                        </button>
                        <button className = { this.state.buttonClickName === 'month' ? 
                                                style.searchButtonClick :  style.searchButton
                                            }
                                onClick ={SearchButtonClick}
                                name = 'month'>
                                한달
                        </button>
                        <button className = { this.state.buttonClickName === '전체' ? 
                                                style.searchButtonClick :  style.searchButton
                                            }
                                onClick ={SearchButtonClick}
                                name = '전체'>
                                전체
                        </button>
                    </div>

                }

                </div>
                </div>
                  
                </div>
            </div>
        );
    }
}

export default SearchGraphPeriodDouble;