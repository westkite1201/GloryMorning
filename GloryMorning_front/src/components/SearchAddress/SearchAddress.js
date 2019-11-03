import React, { Fragment, useState } from "react";
import { observer } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import UseStores from "../Setting/UseStores";
import SearchAddressItem from './SearchAddressItem'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    margin: theme.spacing(0.5)
  },
  textFieldInputColor: {
    color: "black"
  }
}));

const SearchAddress = observer(() => {

  const { search } = UseStores();
  const classes = useStyles();

  const [value, setValue] = useState('');

  const onChangeAddress = e => {
    setValue(e.target.value);
    search.searchAddress(e.target.value);
  };

  let searchItems =  search.searchAddressList.map((item, key)=>{
      return (
        <SearchAddressItem key ={key}
                        addressName = { item.address_name}/>
      )
  })

  return (
    <div className="quotesItem">
        <div>
          <TextField
            id="filled-name"
            label="address"
            margin="normal"
            name="author"
            InputProps={{
              className: classes.textFieldInputColor
            }}
            value={value}
            onChange={onChangeAddress}
          />
        </div>
        <button onClick = {() => search.searchAddress(value)} >
            서치 어드레스 테스트
        </button>
        <div>
            {searchItems}
        </div>
    </div>

  );
});

export default SearchAddress;
