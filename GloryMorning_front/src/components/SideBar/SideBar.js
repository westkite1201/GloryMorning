import React, { Component } from 'react'
import style from './SideBar.module.css'
import { Link,NavLink  } from 'react-router-dom';
import shadows from '@material-ui/core/styles/shadows';

class SideBar extends Component {
    render() {
        const { match, 
                open,
                routes, 
                openSideBar } = this.props;
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

        const spanOpenStyle = {
             fontSize: '30px',
             cursor: 'pointer',
             position :'absolute', 
             zIndex: 100, 
             color: 'black',
             position: 'fixed'
        }
        
        const spanCloseStyle = {
            fontSize: '30px',
            cursor: 'pointer',
            position :'absolute', 
            zIndex: 100, 
            color: '0xffff' 
       }



        console.log(routes)        

        const link = routes.map(( prop, key ) => {
            if( prop.sideView ){
                return (
                    <div className ={style.styleNavigation}>
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
                        한 방울의 먹물
                    </div>
                
                    <a href="javascript:void(0)" 
                        className= {style.closebtn}
                        //onClick={this.closeNav}>&times;</a>
                        onClick={openSideBar}>&times;</a>
                    {link}
                </div>

                <div id="main" className = {style.main}>
                {open ? 
                     (
                         ''
                     )
                     :
                     ( 
                            ''
                    ) 
                }
                </div>
            </div>
        )
    }
}
//햄버거 메뉴 
// <span style={spanOpenStyle} 
// //onClick= {this.openNav}>&#9776;</span>
// onClick= {openSideBar}
// >&#9776;</span>
export default SideBar