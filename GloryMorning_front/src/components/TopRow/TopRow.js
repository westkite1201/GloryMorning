import React, { Component } from 'react'
import './TopRow.scss'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { observer, inject, } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import {Switch, Button } from '@material-ui/core';
const styles = (theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },


    closebtn :{
      top: 0,
      right: 25,
      color : 'white'
      //fontSize: 36,
    }
  
})
@inject("sidebar")
@inject("edit")
@observer
class TopRow extends Component {

    menuHandler = () => {
        const { sidebar,edit } =this.props;
        sidebar.openSideBar();
        edit.handleDispatchEventResize();
    }

    render() {
        const { classes, sidebar, edit } = this.props;
        return (
            <div className = "top-row">
                <div className="sideBar-open">
                {/*
                    !sidebar.open ?  (
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Open drawer"
                      onClick = {this.menuHandler} >
                         <MenuIcon />
                    </IconButton>
                    )
                    :
                    (
                      <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Open drawer"
                      onClick = {this.menuHandler} >
                      <CloseIcon/>
                    </IconButton>
                    )
                    */}
                </div>
                <div className = "edit-componet">
                <Switch
                  checked={edit.editPageFlag}
                  onChange={edit.handlePage}
                  value="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              
                  <Button onClick = {edit.handleSavePage}>
                    컴포넌트 저장  
                  </Button> 
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(TopRow)
