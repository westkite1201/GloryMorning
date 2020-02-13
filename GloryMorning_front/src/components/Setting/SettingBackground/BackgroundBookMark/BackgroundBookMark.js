import React, { useEffect } from "react";
import { observer } from "mobx-react";
import UseStores from "../../UseStores.js";
import BackgroundBookMarkItem from "./BackgroundBookMarkItem";
import Grid from "@material-ui/core/Grid";

const BackgroundBookMark = observer(() => {
  const { setting } = UseStores();
  console.log("[SEO] BackgroundBookMark RENDER ", setting.backgroundBookMark);

  const makeList = () => {
    let arr = [];
    let tempArr = [];

    setting.backgroundBookMark.map((item, index) => {
      console.log("[SEOTEST]  index ", index);
      tempArr.push(Object.assign({}, item));
      if ((index + 1) % 3 === 0) {
        arr.push(tempArr);
        tempArr = [];
      } else {
        if (!arr[arr.length - 1]) {
          arr.push(tempArr);
        } else {
          arr[arr.length - 1] = tempArr;
        }
      }
    });
    console.log("[SEOTEST]  arr ", arr);
    return arr.map((gridItemList, key) => {
      let backgroundRow = gridItemList.map((item, key) => {
        return (
          <Grid item xs={3}>
            <BackgroundBookMarkItem
              key={key}
              setting={setting}
              item={item}
              filterBookMarkBackGround={setting.filterBookMarkBackGround}
            />
          </Grid>
        );
      });

      return (
        <Grid container item xs={12} spacing={3}>
          {backgroundRow}
        </Grid>
      );
    });
  };

  /* 나중에 사용  */
  useEffect(() => {}, []);

  return (
    <div>
      <div>PHOTOS</div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}></Grid>
        <Grid container item xs={12} spacing={3}></Grid>
        <Grid container item xs={12} spacing={3}></Grid>
      </Grid>
      {/*setting.backgroundBookMark.map((item, key) => {
        console.log("[seo] item ", item);
        return (
          <BackgroundBookMarkItem
            key={key}
            setting={setting}
            item={item}
            filterBookMarkBackGround={setting.filterBookMarkBackGround}
          />
        );
      })*/}
      {makeList()}
    </div>
  );
});

export default BackgroundBookMark;
