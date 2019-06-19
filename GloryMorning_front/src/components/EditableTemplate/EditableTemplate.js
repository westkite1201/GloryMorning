import React from "react";
import Cookies from 'universal-cookie';

import style from './EditableTemplate.module.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import EditablePages from "./EditablePages/EditablePages";
import EditableList from "./EditableList/EditableList";
import EditableLayout from "./EditableLayout/EditableLayout";

import Notice from '../AllMenu/Notice'
import helpers from '../../lib/helpers'

class EditableTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      componentList:null,
      selectedId:null,
      pageId: '대시보드',
      screenWidth: {width: '100%'},
      editableListStyle: {display: 'none'},
      savePageFlag: null,
      editPageFlag: false,
      open : true,
  
    };
  }
  /*
  hookingComponentList:
    EditableList로부터 EditableLayout에서 사용 할 컴포넌트 리스트를 받아오는 함수이다.
  */
  hookingComponentList = (object) => {

    this.setState({
      componentList: object
    })
  }
  /*
  loadPage
    EditablePage에서 각 페이지를 클릭하면 트리거 되는 함수로
    pageId 값을 변경하여 EditableLayout에 해당 페이지를 불러오게 된다.
  */
  loadPage = (e) => {

    /* 일단 이걸로 하면 홈버튼은 가능 함 이버전으로 일단 시작 */
    if( helpers.isEmpty(e.target.id) ) {
      e.target.id = '대시보드'
    }

    
    this.setState({ pageId: e.target.id });

  }
  /*대시보드에서 찍혀서 올라오는 load 페이지  
  * 대시보드에서 클릭을했을때 이 함수가 실행된다 .loadPage와 동일한 작동
  */
  dashLoadPage = (pageId) =>{
    this.setState({ pageId: pageId });
  }






  /*
  handlePage
    EditablePages에서 수정 또는 저장 버튼을 클릭하면 트리거되는 함수로
    버튼의 플래그 값에 따라 저장을 할 지 editable 가능하게 할 지를 결정한다.
    (미완성, 제일 하단에 값에 해당 함수가 추가 될 것이다.)
  */
  handlePage =(buttonFlag) => {

    buttonFlag === 'saveButton' ?
      this.setState({
        savePageFlag: true,
        editableListStyle: {display: 'none'},
        screenWidth: {width: '100%'},
        editPageFlag: false
      },()=> {
          this.setState({
            savePageFlag: false,
          })
        }
      )
      :
      this.setState({
        editableListStyle: {display: 'inline-block'},
        screenWidth: {width: 'calc(100% - 190px)'},
        editPageFlag: true,
      })
  }
  /*
  handleSelect
    EditableLayout에 추가 될 컴포넌트를 선택하는 함수이다.
    EditableList 에 나타나는 컴포넌트 중 하나를 클릭하면 트리거 된다.
  */
  handleSelect = (e) => {
    this.setState({
      selectedId: e.currentTarget.id,
    },() => {
        this.setState({
          selectedId: null,
        })
      }
    )
  }



  componentDidMount(){
    this.showNotice();
  }


  render() {

    return (
      <div>
      <EditablePages loadPage   = {this.loadPage}
                       handlePage = {this.handlePage}
                       //서연추가 
                       //page_number = {this.state.pageId}
        />
        <EditableList style       = {this.state.editableListStyle}
                      handleSelect= {this.handleSelect}
                      hookingComponentList = {this.hookingComponentList}
          />
   

      <EditableLayout   selectedId    = {this.state.selectedId}
                        page_number   = {this.state.pageId}
                        savePageFlag  = {this.state.savePageFlag}
                        editPageFlag  = {this.state.editPageFlag}
                        componentList = {this.state.componentList}
                        screenWidth   = {this.state.screenWidth}
                        // 서연 추가 
                        dashLoadPage  = {this.dashLoadPage}
                     
                    
            />
            {this.state.open ? <Notice/> : <div></div>}
      </div>
    );
  }
}
export default EditableTemplate;
