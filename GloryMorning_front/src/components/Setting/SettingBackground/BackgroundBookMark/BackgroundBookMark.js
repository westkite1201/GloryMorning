import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import UseStores from '../../UseStores.js';
import BackgroundBookMarkItem from './BackgroundBookMarkItem';
import { Grid, Button } from '@material-ui/core';

const BackgroundBookMark = observer(() => {
  const { setting } = UseStores();
  console.log('[SEO] BackgroundBookMark RENDER ', setting.backgroundBookMark);

  const makeList = () => {
    let arr = [];
    let tempArr = [];

    setting.backgroundBookMark.map((item, index) => {
      console.log('[SEOTEST]  index ', index);
      tempArr.push(Object.assign({}, item));
      if (!arr[arr.length - 1]) {
        arr.push(tempArr);
      } else {
        arr[arr.length - 1] = tempArr;
      }
    });
    console.log('[SEOTEST]  arr ', arr);
    return arr.map((gridItemList, key) => {
      let backgroundRow = gridItemList.map((item, key) => {
        return (
          <Grid item xs={12} md={6} lg={4}>
            <BackgroundBookMarkItem
              key={key}
              setting={setting}
              item={item}
              filterBookMarkBackGround={setting.filterBookMarkBackGround}
              setdetailViewItem={setting.setdetailViewItem}
            />
          </Grid>
        );
      });

      return (
        <Grid container item xs={12} md={12} lg={12} spacing={3}>
          {backgroundRow}
        </Grid>
      );
    });
  };

  /* 나중에 사용  */
  useEffect(() => {
    setting.getBookmarkBackground();
  }, []);

  return (
    <div>
      <div>PHOTOS</div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}></Grid>
        <Grid container item xs={12} spacing={3}></Grid>
        <Grid container item xs={12} spacing={3}></Grid>
      </Grid>
      {makeList()}
      <Button onClick={setting.saveBookMarkBackground}>saveBookmarkItem</Button>
    </div>
  );
});

export default BackgroundBookMark;
