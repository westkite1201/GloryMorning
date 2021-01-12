import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
//import UseStores from "../Setting/UseStores";
import SearchSelected from '../Setting/SearchAddress/SearchSelected';
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

const Location = observer(() => {
  const classes = useStyles();
  /* 설정된 location 가져오기  */
  useEffect(() => {}, []);

  return (
    <div className="location">
      <SearchSelected locationSettingMode={false} />
    </div>
  );
});

export default Location;
