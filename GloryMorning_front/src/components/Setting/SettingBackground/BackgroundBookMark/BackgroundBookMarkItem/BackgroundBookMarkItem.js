import React, { useState } from "react";
import "./BackgroundBookMarkItem.scss";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const BackgroundBookMarkItem = ({ item, filterBookMarkBackGround }) => {
  const [isMouseHover, setHover] = useState(false);

  console.log("BackgroundBookMarkItem render", item, isMouseHover);
  return (
    <div
      style={{ width: "100px", height: "50px", position: "relative" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={item.previewURL}
        style={{ width: "100%", height: "100%" }}
      ></img>
      <div className="icon">
        {isMouseHover ? (
          <HighlightOffIcon onClick={() => filterBookMarkBackGround(item.id)} />
        ) : null}
      </div>
    </div>
  );
};
export default BackgroundBookMarkItem;
