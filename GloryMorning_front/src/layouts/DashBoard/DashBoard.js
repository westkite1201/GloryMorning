import React, { Component } from 'react'
import style from './DashBoard.module.css'
import { Switch, Route, Redirect } from "react-router-dom";
import dashboardRoutes from "../../routes/dashboard.js";
import SideBar from '../../components/SideBar';
import TopRow from '../../components/TopRow'
import { observer, inject, } from 'mobx-react'
//import SideNav from '../../components/SideNav';


const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.redirect){
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        }
        if(prop.exact){
          return  <Route exact path={prop.path} component={prop.component} key={key} />;
        }
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );
  


class DashBoard extends Component {
  


  
  render() {
    const openStyle = {
        //fontSize: '2rem',
        marginLeft : '350px',
    };
    const closeStyle = {
        marginLeft : '0px',
        //fontSize: '2rem'
    };
    
    const { open } =  this.props;
    if(this.props.location.pathname ==='/login'){
        if ( this.props.location.pathname ==='/login' && open ){
          this.props.openSideBar();
        } 
    }
    return (
      <div className = {style.wrapper}>
      <TopRow/>
       {/*this.props.location.pathname ==='/login' ? '' : <SearchAppBar/>*/}
   
        <SideBar routes = {dashboardRoutes} 
                  openSideBar ={this.openSideBar}
                  open = {open}/>
        <div className = {style.mainPanel}>
            <div className = {style.content} > 
                <div className ={style.container} 
                     style ={ open ? openStyle : closeStyle}>
                     {this.props.location.pathname ==='/login' ? '' : null }
                    {switchRoutes}
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}
export default inject(({ sidebar }) => ({
  open : sidebar.open,
  openSideBar : sidebar.openSideBar
}))(observer(DashBoard));