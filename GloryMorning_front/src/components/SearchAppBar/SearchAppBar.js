import React, { Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { styled, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { observer, inject, } from 'mobx-react'

const styles = (theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    flexGrow: 1,
    width: '100%',
    zIndex: 1100,
    backgroundColor: '0xfffff',
    
  },
  header : {
    backgroundColor:'#fff',
    color: 'black'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  closebtn :{
    top: 0,
    right: 25,
    color : 'black'
    //fontSize: 36,
  }


})


@inject("sidebar")
@inject("edit")
@observer
class SearchAppBar extends Component {
   componentDidMount(){
    
   }
   
   menuHandler = () => {
    const { sidebar,edit } =this.props;
    sidebar.openSideBar();
    edit.handleDispatchEventResize();
   }

  render() {
    const { classes,sidebar } = this.props;
    console.log(sidebar.open)
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
          {
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


          }
            <Typography className={classes.title} variant="h6" noWrap>
              Glory Morning
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



export default withStyles(styles)(SearchAppBar)
// export default inject(({ sidebar }) => ({
//   open : sidebar.open,
//   openSideBar : sidebar.openSideBar
// }))(observer(withStyles(styles)(SearchAppBar)));