import React, { useEffect, Fragment } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import UseStores from "../../Setting/UseStores";
import WisdomQuotesItem from "./WisdomQuotesItem";
import TextField from "@material-ui/core/TextField";
import { Button, Switch } from '@material-ui/core';
import "./WisdomQuotes.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  form: {
    width: "200px",
    display: "flex",
    flexGrow: "1",
    flexDirection: "column"
  }
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
  let quotesList = quotes.quotesList.map((item, key) => {
    return <WisdomQuotesItem item={item} quotes={quotes} key={key} />;
  });
  return (
    <Fragment>
      <div>
        roolingmode
        <Switch
          checked={quotes.rollingQuotesMode}
          onChange={quotes.setQuetosMode}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        
        <div>
          {quotes.rollingQuotesIntervalTime}
        </div>
        <Button
          varient="contained"
          color="primary"
          onClick={() => quotes.setQuetosRollingIntervel(true)}>
          up
        </Button>
        <Button
          varient="contained"
          color="primary"
          onClick={() => quotes.setQuetosRollingIntervel(down)}>
          down
        </Button>
        <div>

        </div>
      </div>
      <div className="quetosWrapper">
        {quotesList}
      </div>
      <div className="inputWrapper">
        <div>명언을 추가 해주세요.</div>
        <div className={classes.form} >
          <TextField
            id="filled-multiline-flexible"
            label="Quotes"
            multiline
            scmargin="normal"
            value={quotes.quotesStr}
            onChange={quotes.handleQuotes}
          />
          <TextField
            id="filled-name"
            label="author"
            margin="normal"
            value={quotes.author}
            onChange={quotes.handleAuthor}
          />
          <Button
            varient="contained"
            color="primary"
            onClick={quotes.setWisdomQuotes}
          >
            upload
          </Button>
        </div>
      </div>
    </Fragment>
  );
});

export default WisdomQuotes;
