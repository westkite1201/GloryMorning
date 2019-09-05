import React, { Component } from 'react'
import _ from "lodash";
import ReactGridLayout,{ WidthProvider} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import style from './EditView.module.css';
import { observer, inject, } from 'mobx-react'


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);


class EditView extends Component {
    static get defaultProps(){
        /* 여기서 layout에 대한 디폴트 크기를 조절함  */
        return {
          className: "layout",
          cols: 36,
          rowHeight: 1,

        }
      };
    
      constructor(props) {
        super(props);
        this.dataItem = []
      }

      componentDidMount(){
        let { loadPage,
          setBackgroundImageUrl,
        } = this.props;
        loadPage();
        setBackgroundImageUrl();
        window.addEventListener("resize", this.updateDimensions);
        //window.onresize = this.handleResizeEnd;
      }
      updateDimensions= () =>{
        const {allChartResizing} = this.props;
        console.log('im listening')
        allChartResizing()
      }
      componentDidUpdate(){
        let {allChartResizing} = this.props;
        console.log("componentDidUpdate ")
        allChartResizing();
        console.log('componentDidUpdate')
        // if ( typeof window.CustomEvent === "function" ) return false;
        // function CustomEvent ( event, params ) {
        //        params = params || { bubbles: false, cancelable: false, detail: undefined };
        //        var evt = document.createEvent( 'CustomEvent' );
        //        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        //        return evt;
        // }
        //      CustomEvent.prototype = window.Event.prototype;
        //      window.CustomEvent = CustomEvent;
       
        //    let event = new CustomEvent("resize");
        //    window.dispatchEvent(event);
        //   setTimeout(() => {
        //      window.dispatchEvent(event);
        //      window.removeEventListener('onresize',this.handleResizeEnd);
        //    },300)
      }
      render() {
        console.log('editview render')
        let { layout,
              onLayoutChange,
              editPageFlag,
              createElement,
              handleResizeChildComponent,
              backgroundUrl
               } = this.props;
        // let layout = [
        //         {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        //         {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        //         {i: 'c', x: 4, y: 0, w: 1, h: 2}
        //       ];
        //       console.log('layout ' , layout)
        console.log('[SEO] backgroundUrl', backgroundUrl)
        let background = backgroundUrl;
        let style = {
          height: '100%',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundColor: 'white',
          backgroundImage: `url(${background})`
        }
        return (
          <div className = {style.rglContainer} style ={style}>
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover/>
     
            <div className= {style.dropLayout} style ={{width: '100%'}}>
              <ResponsiveReactGridLayout
                id     = {'rgl'}
                layout = { layout }
                onLayoutChange     = {onLayoutChange}
                useCSSTransforms   = {true}
                draggableHandle=".dragHandle"
                resizableHandle=".resizeHandle"
                margin ={[25,25]}
                onResize = {handleResizeChildComponent}
                //verticalCompact ={false}
                {...this.props}
              >
              { 
                layout.map(( el, index ) =>  createElement(el, index))
              }
         
      
              
              </ResponsiveReactGridLayout>
            </div>
          </div>
        );
      }


}

export default inject(({ edit }) => ({
    index : edit.index,
    layout: edit.layout,
    page_number: edit.page_number,
    editPageFlag : edit.editPageFlag,
    loadPage : edit.loadPage,
    onLayoutChange: edit.onLayoutChange,
    createElement : edit.createElement,
    onRemoveItem : edit.onRemoveItem,
    allChartResizing : edit.allChartResizing,
    handleResizeChildComponent : edit.handleResizeChildComponent,

    setBackgroundImageUrl : edit.setBackgroundImageUrl,
    backgroundUrl : edit.backgroundUrl,

}))(observer(EditView));
