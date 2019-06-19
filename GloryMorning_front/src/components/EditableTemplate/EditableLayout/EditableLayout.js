import React from "react";
import _ from "lodash";
import ReactGridLayout,{ WidthProvider} from "react-grid-layout";
import style from './EditableLayout.module.css';
import classnames from 'classnames';
import helpers from '../../../lib/helpers';
import axios from 'axios';
import clientConfig from '../../../configuration/clientConfig';
import Highcharts from 'highcharts';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);
let LayoutTemporaryStorage;
let doit;


class EditableLayout extends React.Component {
  static get defaultProps(){
    /* 여기서 layout에 대한 디폴트 크기를 조절함  */
    return {
      className: "layout",
      //cols: 18,
      cols: 12,
      //cols: 50,
      rowHeight: 36,
      //rowHeight: 10,
      //rowHeight: 40,
      //rowHeight: 65,
    }
  };

  constructor(props) {
    super(props);
    this.dataItem = []

    this.state = {
      layout: [],
      componentList:[],
      page_number: this.props.page_number,
      dataToTransfer:{},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.componentList !== prevState.componentList){
      return {
        componentList: nextProps.componentList
      }
    }
    return null;
  }
  componentDidMount(){
    this.loadPage(this.props.page_number);
    window.onresize = this.handleResizeEnd;
  }
  render() {
    return (
      <div className = {style.rglContainer}>
        <div className= {style.dropLayout} style = {this.props.screenWidth}>
          <ResponsiveReactGridLayout
            id     = {'rgl'}
            layout = {this.state.layout}
            onLayoutChange     = {this.onLayoutChange}
            useCSSTransforms   = {true}
            draggableHandle=".dragHandle"
            resizableHandle=".resizeHandle"
            margin ={[25,25]}
            onResize = {this.handleResizeChildComponent}
            {...this.props}
          >
          {this.state.layout.map((el, i) => this.createElement(el, i ))}

          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps, nextState){
    //console.log('shouldComponentUpdate nextProps.page_number   ', nextProps.page_number,'   this.props.page_number' ,this.props.page_number)
    if(nextProps.page_number !== this.props.page_number){
      this.loadPage(nextProps.page_number);
    }
    if(nextProps.selectedId !== null){
      this.addSelectedComponent(nextProps);
    }
    if(nextProps.savePageFlag){
      this.handleSavePage();
      setTimeout(() => {
        this.allChartResizing();
      },10) //500인데 10으로 바꿈 
    }
    if(nextProps.editPageFlag !== this.props.editPageFlag){
      this.handleResizable(nextProps.editPageFlag);
      setTimeout(() => {
        this.allChartResizing();
      },10) //500인데 10 으로 바꿈
    }
    return true;
  }
  /*
  componentDidUpdate
    화면이 렌더링 된 후에 실행되는 함수이다.
    window.dispatchEvent를 통해 ReactGridLayout의 크기를 재설정하게 한다.
    
    /종원 추가 ediiPageFlag, savePageFlag 변경될 때 도 resize /
  */
  componentDidUpdate =  async (prevProps, prevState, snapshot) =>{
    //console.log('componentDidUpdate');
    if( prevProps.screenWidth !== this.props.screenWidth
     || prevState.layout      !== this.state.layout
     || prevProps.editPageFlag!== this.props.editPageFlag
     || prevProps.savePageFlag!== this.props.savePageFlag ){
      (() => { //ie에서 커스텀 이벤트를 사용 할 수 있게 해준다.
        if ( typeof window.CustomEvent === "function" ) return false;
        function CustomEvent ( event, params ) {
          params = params || { bubbles: false, cancelable: false, detail: undefined };
          var evt = document.createEvent( 'CustomEvent' );
          evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
          return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
      })();
      let event = new CustomEvent("resize");
      // await setTimeout(() => {
      //   window.dispatchEvent(event);
      //   //window.removeEventListener('onresize',this.handleResizeEnd);
      // },300)
      window.dispatchEvent(event);
    }
  }
  componentWillUnmount(){
    window.removeEventListener('onresize',this.handleResizeEnd);
		//console.log('HighUnmount');
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
    //console.log('handleResizeChildComponent ,allChild', allChild, ' target ', target);
    let rect = document.getElementById(target.i).getBoundingClientRect();

    let targetDiv =document.getElementById(target.i+ '_c');
    if(!helpers.isEmpty(targetDiv)){
      targetDiv.style.width = rect.width;
      targetDiv.style.height = rect.height;
    }
  }
  /*
  추가#
  dataTransmission
    컴포넌트 간 데이터 전송을 위한 콜백 함수로 props로 레이아웃 상의 모든 컴포넌트에 전달하고
    데이터 전송이 필요할 경우 호출하여 EditableLayout의 dataToTransfer에 저장한다.

    setState를 통해 스테이트 값이 바뀌면서 리렌더링이 되기 때문에
    EditableLayout의 모든 자식 컴포넌트들은 shouldComponentUpdate 에서
    적절한 처리를 해주어야 한다.
    해당 처리는 OverScatterDateTable, AllContentScatterGraph에 예시 참고.

    dataToTransfer: 전달 될 데이터의 목적지와 값이 저장되는 state 값으로
                    dataTransmission와 마찬가지로 모든 자식 컴포넌트에 전달되며,
                    key 값으로 데이터를 받게 될 컴포넌트의 이름을 저장하고
                    value 값으로 전송 할 데이터를 저장한다.
                    EditableLayout의 자식 컴포넌트에서는 key 값이 해당 컴포넌트의
                    이름과 값이 같으면 데이터를 처리하고 값이 다르면 아무런 처리도 하지 않는다.
                    (리렌더링을 하지 않는다.)
                    key value 쌍을 이용하는 것을 변형하여 이벤트의 종류에 따른 처리나
                    데이터의 타입에 따른 처리 등 또한 가능하다.
  */
  dataTransmission = (key, value) => {
    this.setState({
      dataToTransfer: {[key]: value}
    })
  }
  /*
  handleResizeEnd
    창 크기가 변할 때 trigger 되는 onresize 이벤트에 등록하여
    드래그가 끝나는 시점에 allChartResizing을 trigger 시키는 함수이다.
    (현재 drag 중이면 clearTimeout을 통해 기존에 등록시킨 allChartResizing을
     초기화하고 drag가 끝난 후 200ms 후 allChartResizing을 실행한다.)
  */
  handleResizeEnd = (e) => {
    clearTimeout(doit);
    doit = setTimeout(this.allChartResizing, 200);
  }
  /*
  allChartResizing
    모든 차트의 크기를 변경하는 함수이다.
  */
  allChartResizing = () => {

    Highcharts.charts.some( chart => {

      if( !helpers.isEmpty(chart) ) {
        if(helpers.isEmpty(chart.userOptions.id)){
     
          return false;
        }
        let rect = document.getElementById(chart.userOptions.id.replace('_c','')).getBoundingClientRect();
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
    this.state.layout.forEach((target) => {

      if(!helpers.isEmpty(document.getElementById(target.i))){
      let rect = document.getElementById(target.i).getBoundingClientRect();
      let targetDiv =document.getElementById(target.i+ '_c');
        if(!helpers.isEmpty(targetDiv)){
          targetDiv.style.width = rect.width;
          targetDiv.style.height = rect.height;
        }
      }
    })
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
  addSelectedComponent
    EditableList에서 추가하려는 컴포넌트를 클릭하면 트리거되는 함수이다.
    EditableTemplate 으로부터 추가하려는 컴포넌트의 이름을 props로 받아오고
    해당 컴포넌트를 레이아웃에 추가한다.
  */
  addSelectedComponent = (props) => {
    let Tag = this.searchComponentByName(this.state, props.selectedId);
    let timeStamp = new Date().getTime();
    this.setState({
      layout: this.state.layout.concat({
        i: 'n' + timeStamp,
        x: (this.state.layout.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        item: Tag,
        TagName: props.selectedId
      }),
    })
  }
  /*
  handleSavePage
    EditablePages에서 저장 버튼을 클릭하면 트리거되는 함수이다.
    현재 layout이 나타내는 페이지를 저장한다.
  */
  handleSavePage = () => {
 
    axios.post(clientConfig.endpoint.api + '/bus/set_user_components', {
      user_id : 'sampleId',
      page_number : this.state.page_number,
      component_list: LayoutTemporaryStorage
    })
    .then(res => {
      //console.log(res.data);
    });
  }
  /*
  loadPage
    EditablePages에서 페이지를 클릭하면 트리거되는 함수로 해당 페이지를 불러온다.
  */
  loadPage = (page_number) => {
 
    axios.post(clientConfig.endpoint.api + '/bus/get_user_components', {
      user_id : 'sampleId',
      page_number : page_number,
    })
    .then(async res => {

      if(helpers.isEmpty(res.data.component_list)){
        this.initlayout(page_number);
        this.setState({
          page_number: page_number,
        })
      }
      else{
 
        this.setState({
          page_number: page_number,
          layout: JSON.parse(res.data.component_list).layout
        })
      }
      this.handleResizable(this.props.editPageFlag);
    })
  }
  /*
  searchComponentByName
    컴포넌트 리스트로부터 컴포넌트의 이름을 통해 객체를 찾아 반환하는 함수이다.
  */
  searchComponentByName = (state, thisComponentName) => {
    let Tag;
    state.componentList.forEach((item) => {
      for(let name in item){
        if(name === thisComponentName){
          Tag = item[name];
        }
      }
    })
    return Tag;
  }
  /*
  initlayout
    layout을 초기화하는 함수이다.
  */
  initlayout = () => {
    this.setState({
      layout: [0,1,2,3,4].map((i, key, list) => {
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
    })
  }
  /*
  onLayoutChange
    layout의 위치, 크기 등이 변경되면 트리거되는 함수이다.
    매개변수로 레이아웃에 배치된 컴포넌트들의 현재 크기, 위치 등을 받아오지만,
    어떤 컴포넌트인지 알 수 없기 때문에 (children을 알 수 없고 위치, 크기 등의 정보만 있다.)
    map 함수를 통해 현재 유지하고 있는 state.layout의 정보들을 추가하여 저장한다.
  */
  onLayoutChange = async (layout) => {
    layout = await layout.map((item,i) => {
      return {
        ...item,
        item: this.state.layout[i].item,
        TagName: this.state.layout[i].TagName
      }
    })
    await this.saveToLocal("layout", layout);
    await this.setState({layout:layout})
  }

  /*
  createElement
    state 값으로 유지중인 layout을 화면 상에 나타내기 위해 div 형태로 반환하는 함수이다.
  */
  createElement = (el,i) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    let Tag = helpers.isEmpty(el.TagName)
              ? 'div' : this.searchComponentByName(this.state,el.TagName);
       
    return (

      <div className = {classnames({dragHandle: this.props.editPageFlag})}
           ref    = { ref => this.dataItem[el.i] = ref } /* ref를 dataItem 배열인덱스로 잡는다  */
           key       = {el.i}>
        <div className  = {style.componentContainer}
             id         = {el.i}>
          <Tag data = {el.i}
               wrapperid = {el.i}
               //vmafData ={this.props.vmafData}
               dataTransmission = {this.dataTransmission}
               dataToTransfer  = {this.state.dataToTransfer}
            
               dashLoadPage = {this.props.dashLoadPage}
               editPageFlag  = { this.props.editPageFlag}
               />
        </div>
        {
          this.props.editPageFlag  === true ?
          (
            <span
              className = "remove"
              style     = {removeStyle}
              onClick   = {this.onRemoveItem.bind(this, el.i)}>
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
  onRemoveItem(i) {
    this.setState({
      layout: _.reject(this.state.layout, { i: i }) ,
    });
  }
  saveToLocal = (key, value) => {
    LayoutTemporaryStorage = JSON.stringify({ [key]: value });
  }
}
export default EditableLayout;
