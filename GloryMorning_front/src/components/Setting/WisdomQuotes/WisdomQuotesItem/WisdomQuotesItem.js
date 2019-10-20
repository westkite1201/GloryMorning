import React, { Fragment, useState } from "react";
import { observer } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import "./WisdomQuotesItem.scss";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { Delete, Check, Create, Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    margin: theme.spacing(0.5)
  },
  textFieldInputColor: {
    color: "white"
  }
}));

const WisdomQuotesItem = observer(({ item, quotes }) => {
  const classes = useStyles();

  const [wiseQuotes, setValues] = useState({
    quotes: item.QUOTES,
    author: item.AUTHOR
  });

  const updateField = e => {
    setValues({
      ...wiseQuotes,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="quotesItem" id={item.QUOTES_NUM}>
      {quotes.isUpdate(item.QUOTES_NUM) ? (
        <div>
          <TextField
            id="filled-multiline-flexible"
            label="Quotes"
            multiline
            InputProps={{
              className: classes.textFieldInputColor
            }}
            scmargin="normal"
            name="quotes"
            value={wiseQuotes.quotes}
            onChange={updateField}
          />
          <TextField
            id="filled-name"
            label="author"
            margin="normal"
            name="author"
            InputProps={{
              className: classes.textFieldInputColor
            }}
            value={wiseQuotes.author}
            onChange={updateField}
          />
        </div>
      ) : (
        <span>
          {item.QUOTES} : {item.AUTHOR}
        </span>
      )}

      <div className="buttonContainer">
        {quotes.isUpdate(item.QUOTES_NUM) ? (
          <Fragment>
            <Fab
              color="primary"
              aria-label="update"
              className={classes.fab}
              onClick={() =>
                quotes.updateWisdomQuotes(item.QUOTES_NUM, wiseQuotes)
              }
            >
              <Check />
            </Fab>
            <Fab
              color="secondary"
              aria-label="cancle"
              className={classes.fab}
              onClick={() => quotes.cancleUpdate(item.QUOTES_NUM)}
            >
              <Close />
            </Fab>
          </Fragment>
        ) : (
          <Fragment>
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              onClick={() => quotes.setUpdateMode(item)}
            >
              <Create />
            </Fab>
            <Fab
              color="secondary"
              aria-label="delete"
              className={classes.fab}
              onClick={() => quotes.deleteWisdomQuotes(item.QUOTES_NUM)}
            >
              <Delete />
            </Fab>
          </Fragment>
        )}
      </div>
    </div>
  );
});

export default WisdomQuotesItem;
