import { useEffect } from "react";
import { observer } from "mobx-react";
import UseStores from "../UseStores.js";
import { bookmarkBorder } from "@material-ui/icons";
import data from "./data";
const BackgroundBookMarkItem = observer(({ key, setting, item }) => {
  return (
    <div>
      <button onClick={setting.addBookMarkBackGround}></button>
      <img src={item.previewURL} />
    </div>
  );
});

const BackgroundBookMark = observer(() => {
  const { setting } = UseStores();

  makeList = () => {
    setting.backgroundBookMark.map((item, key) => {
      return <BackgroundBookMarkItem key={key} setting={setting} item={item} />;
    });
  };

  /* 나중에 사용  */
  useEffect(() => {}, []);

  return (
    <div>
      <div>PHOTOS</div>
      {makeList()}
    </div>
  );
});

export default BackgroundBookMark;
