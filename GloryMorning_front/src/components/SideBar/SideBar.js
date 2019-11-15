import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import style from './SideBar.module.css'
import { Link,NavLink  } from 'react-router-dom';
import { Collapse } from 'reactstrap';
class SideBar extends Component {
            /*
        mapToComponent
        1. pureComponents의 키 값(컴포넌트의 이름)만을 추출해 div로 만드는 함수이다.
            onClick 이벤트에 props로 전달받은 handleSelect 함수를 연결하여
            div를 클릭하면 layout에 해당 컴포넌트가 추가될 수 있도록 해준다.
        */
       mapToComponent = () => {
        const { componentList, addSelectedComponent } = this.props;
            return componentList.map((item, i) => {
                let name;
                for(let compName in item){
                    name = compName;
                }
                return (
                <div className  = {style.EditableList_Component}
                    onClick    = {addSelectedComponent}
                    key  		= {i}
                    id			= {name}>
                    {name}
                            
                        </div>);
            });
    };
    render() {
        const { match, 
                open,
                routes, 
                openSideBar,
                EditComponentCollapse } = this.props;
        const activeStyle = {
            color: 'black',
            fontSize: '1rem'
        };


        const sideBarOpenStyle = {
            //color: 'white',
            width : '340px',
            padding: '100px 20px 20px 20px',
            boxShadow: '5px 5px 5px 5px #e9ecef'
           // fontSize: '2rem'
        };
        const sideBarCloseStyle = {
            //color: 'white',
            width : '0',
            padding: '0px'
            //fontSize: '2rem'
        };

        console.log(routes)        

        const link = routes.map(( prop, key ) => {
            if( prop.sideView ){
                return (
                    <div className ={style.styleNavigation} key ={key}>
                        <NavLink to={prop.path} 
                                activeStyle = {activeStyle}
                                key = {key} >
                            {prop.sidebarName}
                        </NavLink>
                    </div>
                )
            }
        })



        return (
            
            <div>
                <div id="mySidebar" 
                    className={style.sidenav} 
                    style = { open ? sideBarOpenStyle : sideBarCloseStyle}>
                    <div className={style.myBlogName}>
                        GLORY MORNING
                    </div>
                
    
                    {link}
                    
                    <Collapse isOpen={EditComponentCollapse}>
                        { this.mapToComponent() }
                    </Collapse>

                </div>

            
            </div>
        )
    }
}

export default inject(({ edit }) => ({
    addSelectedComponent : edit.addSelectedComponent,
    componentList : edit.componentList,
    EditComponentCollapse : edit.EditComponentCollapse
  }))(observer(SideBar));