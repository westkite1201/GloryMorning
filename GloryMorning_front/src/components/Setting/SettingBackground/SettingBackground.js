import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react'
import UseStores from '../UseStores.js'
import BackgroundItem from './BackgroundItem'

const useStyles = makeStyles(theme => ({
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
                            setBackgroundUrl = {setting.setBackgroundUrl}>

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
                label="value"
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
        {makeImageSrc()}
       
    </div>
  );
});


// export default inject(({ setting }) => ({
//     index : edit.index,
// }))(observer(SettingBackground));

export default SettingBackground