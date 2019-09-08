import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react'
import UseStores from '../UseStores.js'
import BackgroundItem from './BackgroundItem'
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';

import PacmanLoader from 'react-spinners/PacmanLoader';

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 500,
  },
  tileSpace : {
    margin: '5px'
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
const SettingBackground = observer(() => {
    const { setting } = UseStores()
   
  // const [name, setName] = useState('');
  const classes = useStyles();
  //componentDidMount 와 componentDidUpdate 
  useEffect(() => {
    setting.getPixabayImages('image');
    console.log('render complete!');
    // console.log({
    //   name,
    // });
  },[]);

  // const onChangeName = e => {
  //   setName(e.target.value);
  // };

  const makeImageSrc = () => {
      console.log("[SEO], setting ",setting.pixabayHits)
      let previewImages = setting.pixabayHits.map((item)=>{
          return(
                      <BackgroundItem item = {item}
                                      setBackgroundUrl = {setting.setBackgroundUrl}
                                      classes = {classes} >
                      </BackgroundItem>
                  )
        
      })
      return previewImages;
  }

  return (
    <div>
        <div style ={{color: 'white'}}>
            <p>찾고 싶은 사진을 입력해주세요 </p>
        </div>
        <div>
            <TextField
                id="standard-name"
                label="배경을 검색해보세요!"
                className={classes.textField}
                value={setting.query}
                onChange={setting.onChangeQuery}
                margin="normal"/>        
        </div>
        <div>
            <Button variant="contained" 
                    className={classes.button}
                    onClick = {() => setting.getPixabayImages('image')} >
                SEARCH
            </Button>
        </div>

        <div className={classes.root}>

          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">SERACH RESULT</ListSubheader>
            </GridListTile>

              {  
                setting.isPixabayLoading ?
                <PacmanLoader
                  css={override}
                  sizeUnit={"px"}
                  size={20}
                  color={'#b197fc'}
                  loading={setting.isPixabayLoading}
                  />
                :
                makeImageSrc() 
              }


          </GridList>
        </div>

    </div>
  );
});


// export default inject(({ setting }) => ({
//     index : edit.index,
// }))(observer(SettingBackground));

export default SettingBackground