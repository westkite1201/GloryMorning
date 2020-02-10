import React, { Fragment } from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const BackgroundItem = ({
  item,
  setdetailViewItem,
  addBookMarkBackGround,
  classes
}) => {
  /* css 문제인가... 뭐지 일단 이걸로 처리해놈  */
  const imgStyle = {
    top: "0%",
    left: "50%",
    height: "auto",
    position: "relative",
    transform: "translateX(-50%)"
  };
  return (
    <GridListTile key={item.previewURL} onClick={() => setdetailViewItem(item)}>
      <img src={item.previewURL} alt={item.user} style={imgStyle} />
      <GridListTileBar
        title={item.tags}
        subtitle={<span>by: {item.user}</span>}
        actionIcon={
          <Fragment>
            <IconButton
              aria-label={`info about ${item.user}`}
              className={classes.icon}
            >
              <BookmarkBorderIcon onClick={() => addBookMarkBackGround(item)} />
            </IconButton>
          </Fragment>
        }
      />
    </GridListTile>
  );
};

export default BackgroundItem;
