import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import UseStores from "../../Setting/UseStores";
import WisdomQuotesItem from './WisdomQuotesItem'
import './WisdomQuotes.scss'

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const WisdomQuotes = observer(() => {
  const { quotes } = UseStores();
  const classes = useStyles();

  useEffect(() => {
    quotes.getQuotes();
  }, []);

//   let storeQuotesList = []
//   if(_.isNil(quotes.quetesList)){
//     storeQuotesList = quotes.quetesList
//   }
  let quotesList = quotes.quotesList.map((item , key  ) => {
                return  <WisdomQuotesItem item = {item}
                                            key = {key} />
            })
  console.log("hello")
  return (
      <div className = "quetosWrapper">
            {quotesList}
      </div>
  );
});

export default WisdomQuotes;
