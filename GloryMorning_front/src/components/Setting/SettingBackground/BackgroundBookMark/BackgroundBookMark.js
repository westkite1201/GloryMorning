import React, { useEffect } from "react";
import { observer } from "mobx-react";
import UseStores from "../../UseStores.js";
import BackgroundBookMarkItem from "./BackgroundBookMarkItem";

const BackgroundBookMark = observer(() => {
  const { setting } = UseStores();
  console.log("[SEO] BackgroundBookMark RENDER ", setting.backgroundBookMark);
  const makeList = () => {
    setting.backgroundBookMark.map((item, key) => {
      console.log("[seo] item ", item);
      return (
        <BackgroundBookMarkItem
          key={key}
          setting={setting}
          item={item}
          filterBookMarkBackGround={setting.filterBookMarkBackGround}
        />
      );
    });
  };

  /* 나중에 사용  */
  useEffect(() => {}, []);

  return (
    <div>
      <div>PHOTOS</div>
      {setting.backgroundBookMark.map((item, key) => {
        console.log("[seo] item ", item);
        return (
          <BackgroundBookMarkItem key={key} setting={setting} item={item} />
        );
      })}
    </div>
  );
});

export default BackgroundBookMark;
