import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import UseStores from '../../Setting/UseStores';
import SearchAddressItem from './SearchAddressItem';
import SearchSelected from './SearchSelected';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing(0.5),
  },
  textFieldInputColor: {
    color: 'black',
  },
}));

const SearchAddress = observer(() => {
  const { search } = UseStores();
  const classes = useStyles();

  const [value, setValue] = useState('');

  /* 설정된 location 가져오기  */
  useEffect(() => {}, []);

  const onChangeAddress = e => {
    setValue(e.target.value);
    if (e.keyCode === 13) {
      search.searchAddress(value);
    }
    search.searchAddress(e.target.value);
  };

  let searchItems = search.searchAddressList.map((item, key) => {
    return (
      <SearchAddressItem search={search} key={key} value={key} item={item} />
    );
  });

  return (
    <div className="addressItem">
      <TextField
        id="filled-name"
        label="address"
        margin="normal"
        name="author"
        InputProps={{
          className: classes.textFieldInputColor,
        }}
        value={value}
        onKeyDown={onChangeAddress}
        onChange={onChangeAddress}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <span> [ SEARCH ITEMS ] </span>
          <div>{searchItems}</div>
        </Grid>
        <Grid item xs={6}>
          <span> [ SELECTED ADDRESS ] </span>
          <div>
            <SearchSelected locationSettingMode={true} />
          </div>
        </Grid>
      </Grid>
      <button onClick={search.settingLocation}> settingLocation </button>
    </div>
  );
});

export default SearchAddress;
