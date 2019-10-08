import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import './WisdomQuotesItem.scss'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

const WisdomQuotesItem = ({item}) => {

  const classes = useStyles();
 console.log("[SEO] ITEM ", item)
  return (
      <div className = "quotesItem" id ={item.QUOTES_NUM}>
        {item.QUOTES} : {item.AUTHOR}  
      </div>
  );
};

export default WisdomQuotesItem;