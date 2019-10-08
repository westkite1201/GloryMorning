import React, { useEffect, Fragment } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import UseStores from "../../Setting/UseStores";
import WisdomQuotesItem from './WisdomQuotesItem'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    <Fragment>
        <div className = "quetosWrapper">
            {quotesList}
        </div>
        <div classNAME = "inputWrapper">
          <div>
            명언을 추가 해주세요.
          </div>
          <form className = 'form'>
              <TextField
                  id="filled-multiline-flexible"
                  label="Quotes"
                  multiline
                  scmargin="normal"
                  variant="filled"
              />
              <TextField
                  id="filled-name"
                  label="author"
                  margin="normal"
                  variant="filled"
              />
              <Button varient = 'contained' color = 'primary' onClick = {this.handleUpload}>
                  upload
              </Button>
          </form>
        </div>    
    </Fragment>

  );
});

export default WisdomQuotes;
