import { observable, action, computed } from 'mobx';
import clientConfig from '../configuration/clientConfig'
import helpers from '../lib/helpers'
import axios from 'axios';
import React, { Component } from 'react'
import classnames from 'classnames';
import _ from "lodash";
import Highcharts from 'highcharts';
let LayoutTemporaryStorage;
export default class EditStore {
    @observable page_number = 'home'
    @observable layout = []
    @observable editPageFlag = true
    @observable savePageFlag = false
    @observable index = 0
    @observable componentList = [] 
    


    handleDispatchEventResize =() => {
    //if ( typeof window.CustomEvent === "function" ) return false;
            function CustomEvent ( event, params ) {
                  params = params || { bubbles: false, cancelable: false, detail: undefined };
                  var evt = document.createEvent( 'CustomEvent' );
                  evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                  return evt;
            }
             CustomEvent.prototype = window.Event.prototype;
             window.CustomEvent = CustomEvent;
       
           let event = new CustomEvent("resize");
           window.dispatchEvent(event);
          setTimeout(() => {
             window.dispatchEvent(event);
             window.removeEventListener('onresize',this.handleResizeEnd);
          },10)

    }



  /*
  handleResizable
    flag 값에 따라 resizable 버튼의 display 값을 변경한다.
    getElementsByClassName은 htmlcollection이므로 반환된 값에는
    foreach 사용이 불가하다고 한다.
  */
  handleResizable = (flag) => {
    let childs = document.getElementsByClassName('react-resizable-handle');
    if(!helpers.isEmpty(childs)){
      [...childs].forEach((item) => {
        item.style.display= flag ? 'initial' : 'none';
      })
    }
  }
  /*
  allChartResizing
    모든 차트의 크기를 변경하는 함수이다.
  */
 @action
  allChartResizing = () => {
    console.log("allChartResizing")
    Highcharts.charts.some( chart => {
      console.log('chart ' , chart)
      if( !helpers.isEmpty(chart) ) {
        if(helpers.isEmpty(chart.userOptions.id)){
          return false;
        }
       let rect = document.getElementById(chart.userOptions.id.replace('_c','')).getBoundingClientRect();
        console.log('rect ' , rect)
       chart.setSize(rect.width, rect.height);
      }
    })
    /*
    추가#
    창 크기가 변경되어 차트를 리사이징 시킬 때 레이아웃 상의 모든
    컴포넌트를 리사이징 한다. 원리는 하이차트 리사이징과 같다.
    다만 하이차트 리사이징과 중복되기 때문에 둘을 구분하고 최적화하는 로직 필요함
    (단, 컴포넌트의 root div에 wrapperid  + _c 가 id 로 잡혀있는 경우만 해당)
    */
    // this.layout.forEach((target) => {

    //   if(!helpers.isEmpty(document.getElementById(target.i))){
    //   let rect = document.getElementById(target.i).getBoundingClientRect();
    //   let targetDiv =document.getElementById(target.i+ '_c');
    //     if(!helpers.isEmpty(targetDiv)){
    //       targetDiv.style.width = rect.width;
    //       targetDiv.style.height = rect.height;
    //     }
    //   }
    // })
  }
    /*
  추가#
  handleResizeChildComponent
  render() 부분의 onResize = {this.handleResizeChildComponent}
  resize event와 연결된 함수로 각각의 컴포넌트를 리사이징 할 때 실행되는 함수이다.
  각각의 컴포넌트 크기를 변경한다.
  (하이차트는 setSize 라는 함수를 이용해야 하기 때문에 해당하지 않는다.)
  (단, 컴포넌트의 root div에 wrapperid  + _c 가 id 로 잡혀있는 경우만 해당)
  */
 handleResizeChildComponent = ( allChild, target ) => {
  console.log('handleResizeChildComponent ,allChild', allChild, ' target ', target.i);
  let rect = document.getElementById(target.i).getBoundingClientRect();

  let targetDiv =document.getElementById(target.i+ '_c');
  if(!helpers.isEmpty(targetDiv)){
    targetDiv.style.width = rect.width;
    targetDiv.style.height = rect.height;
  }
  this.allChartResizing();
}
    /*
    searchComponentByName
      컴포넌트 리스트로부터 컴포넌트의 이름을 통해 객체를 찾아 반환하는 함수이다.
    */
    @action
    searchComponentByName = (thisComponentName) => {
      console.log('thisComponentName ', thisComponentName)
      let tag;
      this.componentList.forEach((item) => {
        console.log('item ' , item)
        for(let name in item){
          if(name === thisComponentName){
            tag = item[name];
          }
        }
      })
      return tag;
    }

    /*
    addSelectedComponent
      EditableList에서 추가하려는 컴포넌트를 클릭하면 트리거되는 함수이다.
      EditableTemplate 으로부터 추가하려는 컴포넌트의 이름을 props로 받아오고
      해당 컴포넌트를 레이아웃에 추가한다.
    */
   @action
    addSelectedComponent = (e) => {
      //console.log(e);
      let selectedId = e.target.id ;
      console.log(
        "selectedId", selectedId)
      let Tag = this.searchComponentByName( selectedId );
      console.log('Tag' , Tag)
      let timeStamp = new Date().getTime();
      this.layout.push({
            i: 'n' + timeStamp,
            x: (this.layout.length * 2) % (18|| 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2,
            item: Tag,
            TagName: selectedId
        })
    }

    /* 컴포넌트 추가  */
    @action  
    putComponentList = ( ListViewName, component) => {
      this.componentList.push({
          [ListViewName] : component,
      });
      console.log('putComponentList ' ,this.componentList)
    }
    

    @action loadPage = async() => {
        console.log('loadpage' );
      axios.post(clientConfig.endpoint.api + '/bus/get_user_components', {
        user_id : 'sampleId',
        page_number : this.page_number,
      })
      .then(async res => {
          
          console.log('res', res.data.component_list);
        if(helpers.isEmpty(res.data.component_list)){
          this.initlayout( this.page_number );
          this.page_number = this.page_number
        }
        else{
            this.page_number =  this.page_number
            this.layout =  JSON.parse(res.data.component_list).layout
        }
        //this.handleResizable(this.props.editPageFlag);
      })
    }

  /*
  initlayout
    layout을 초기화하는 함수이다.
  */
  @action initlayout(){
      this.layout = [0,1,2,3,4].map((i, key, list) => {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          item: null,
          TagName: null,
          add: i === (list.length - 1).toString()
        };
      })
  } 
  
   /*
  handleResizeEnd
    창 크기가 변할 때 trigger 되는 onresize 이벤트에 등록하여
    드래그가 끝나는 시점에 allChartResizing을 trigger 시키는 함수이다.
    (현재 drag 중이면 clearTimeout을 통해 기존에 등록시킨 allChartResizing을
     초기화하고 drag가 끝난 후 200ms 후 allChartResizing을 실행한다.)
  */
//  handleResizeEnd = (e) => {
//    this.allChartResizing
//   }

  
@action
createElement = (el,key) => {

  const{onRemoveItem}  =this;
  console.log("createElement", el, key)
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
    zIndex: 99
  };
  let Tag = helpers.isEmpty(el.TagName) ? 'div' : this.searchComponentByName(el.TagName);
  //let Tag = 'div'
    return (       
    <div className = {classnames({dragHandle: this.editPageFlag})}
        key       = {el.i}>
        <div className  = {'componentContainer'}
            id         = {el.i}>
        <Tag data = {el.i}
            wrapperid = {el.i}
            editPageFlag  = { this.editPageFlag }
            />
        </div>
        {
        this.editPageFlag  === true ?
        (
            <span
              className = "remove"
              style     = {removeStyle}
              onClick = {() => onRemoveItem(el.i)}
              //onClick   = {onRemoveItem(el.i)}
            >
            x
            </span>
            ) :
            (
            <span></span>
            )
        }
    </div>

    );
}



/*
onRemoveItem
x를 클릭한 컴포넌트를 제거하는 함수
*/
  @action
  onRemoveItem =(i) => {
    console.log(i)
    console.log('hello', this.layout)
    this.layout =  _.reject(this.layout, { i: i }) 
  }

  saveToLocal = (key, value) => {
    LayoutTemporaryStorage = JSON.stringify({ [key]: value });
    console.log("LayoutTemporaryStorage!!!", LayoutTemporaryStorage)
  }

  	/*
	handelButton: 현재 클릭한 버튼의 id를 handlePage 함수에 전달하여 값에 따라
								page를 저장하거나 수정 할 수 있게 하고 버튼을 변경한다.
  */

  /*
  handlePage
    EditablePages에서 수정 또는 저장 버튼을 클릭하면 트리거되는 함수로
    버튼의 플래그 값에 따라 저장을 할 지 editable 가능하게 할 지를 결정한다.
    (미완성, 제일 하단에 값에 해당 함수가 추가 될 것이다.)
  */
 @action
 handlePage =() => {
  this.editPageFlag = !this.editPageFlag
  this.handleResizable(this.editPageFlag);

}

 /*
  handleSavePage
    EditablePages에서 저장 버튼을 클릭하면 트리거되는 함수이다.
    현재 layout이 나타내는 페이지를 저장한다.
  */
 handleSavePage = () => {
   console.log("handleSavePage")
  axios.post(clientConfig.endpoint.api + '/bus/set_user_components', {
    user_id : 'sampleId',
    page_number : this.page_number,
    component_list: LayoutTemporaryStorage
  })
  .then(res => {
    //console.log(res.data);
  });
}

  /*
  onLayoutChange
    layout의 위치, 크기 등이 변경되면 트리거되는 함수이다.
    매개변수로 레이아웃에 배치된 컴포넌트들의 현재 크기, 위치 등을 받아오지만,
    어떤 컴포넌트인지 알 수 없기 때문에 (children을 알 수 없고 위치, 크기 등의 정보만 있다.)
    map 함수를 통해 현재 유지하고 있는 state.layout의 정보들을 추가하여 저장한다.
  */
 onLayoutChange =  (layout) => {
  console.log('onLayoutChange ', layout)
  this.layout = layout.map((item,i) => {
    return {
      ...item,
      item: this.layout[i].item,
      TagName: this.layout[i].TagName
    }
  })

   this.saveToLocal("layout", this.layout);
   //this.allChartResizing();
}



}