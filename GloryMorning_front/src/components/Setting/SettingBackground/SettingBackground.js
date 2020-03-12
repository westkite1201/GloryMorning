import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import UseStores from '../UseStores.js';
import BackgroundItem from './BackgroundItem';
import TagItem from './TagItem';
import BackgroundBookmark from '../SettingBackground/BackgroundBookMark';
import BackgroundTheme from '../SettingBackground/BackgroundTheme';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridList from '@material-ui/core/GridList';
// import ListSubheader from '@material-ui/core/ListSubheader';
import {
  TextField,
  Button,
  Switch,
  GridListTile,
  GridList,
  ListSubheader,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewEyeIcon from '@material-ui/icons/RemoveRedEye';
import PortraitIcon from '@material-ui/icons/Portrait';
import PacmanLoader from 'react-spinners/PacmanLoader';

import _ from 'lodash';
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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const SettingBackground = observer(() => {
  const { setting } = UseStores();

  // const [name, setName] = useState('');
  const classes = useStyles();
  //componentDidMount 와 componentDidUpdate
  useEffect(() => {
    setting.getPixabayImages('image');
    console.log('render complete!');
  }, []);

  // const onChangeName = e => {
  //   setName(e.target.value);
  // };

  // 이미지 cover가 img src로는 해결 안되는 것 같아 이걸로 변경
  const detailImageView = {
    width: '30em',
    height: '25em',
    backgroundImage: `url(${setting.detailViewitem.largeImageURL})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-Repeat',
  };

  const makeImageSrc = () => {
    console.log('[SEO], setting ', setting.pixabayHits);
    let previewImages = setting.pixabayHits.map((item, key) => {
      return (
        <BackgroundItem
          key={key}
          index={key}
          item={item}
          setBackgroundUrl={setting.setBackgroundUrl}
          setdetailViewItem={setting.setdetailViewItem}
          addBookMarkBackGround={setting.addBookMarkBackGround}
          classes={classes}
        ></BackgroundItem>
      );
    });
    console.log('[SEO] previewImages ', previewImages);
    return previewImages;
  };

  console.log('[SEO] SettingBackground , RENDER ', setting.detailViewItem);
  return (
    <div>
      <div style={{ marginTop: '200px' }}>
        URL THEME
        <Switch
          checked={setting.useBackgroundURL}
          onChange={setting.setUseThemeOrURL}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <BackgroundTheme />
      </div>
      <div style={{ color: 'white' }}>
        <p>찾고 싶은 사진을 입력해주세요 </p>
      </div>
      <div>
        <TextField
          id="standard-name"
          label="배경을 검색해보세요!"
          className={classes.textField}
          value={setting.query}
          onChange={setting.onChangeQuery}
          margin="normal"
        />
      </div>
      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setting.getPixabayImages('image')}
        >
          SEARCH
        </Button>
      </div>

      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">SERACH RESULT</ListSubheader>
          </GridListTile>
          {setting.isPixabayLoading ? (
            <PacmanLoader
              css={override}
              sizeUnit={'px'}
              size={20}
              color={'#b197fc'}
              loading={setting.isPixabayLoading}
            />
          ) : (
            makeImageSrc()
          )}
        </GridList>

        {/*background item을 클릭시에 detial 한 view를 보여주는 친구  */}
        <div>
          {setting.detailViewitem.largeImageURL === '' ? null : (
            <span>
              <PortraitIcon />
              by. {setting.detailViewitem.user}
              <FavoriteIcon className={classes.favoriteIcon} />
              {setting.detailViewitem.likes}
              <ViewEyeIcon />
              {setting.detailViewitem.views}
            </span>
          )}
          <div style={detailImageView}>
            <p>
              {setting.detailViewitem.tags.split(',').map((item, key) => {
                return <TagItem item={item} key={key} />;
              })}
            </p>
          </div>
          <Button onClick={setting.settingBackgroundURLRedis}>
            background 선택!
          </Button>
        </div>
      </div>
      <BackgroundBookmark />
    </div>
  );
});

// export default inject(({ setting }) => ({
//     index : edit.index,
// }))(observer(SettingBackground));

export default SettingBackground;
