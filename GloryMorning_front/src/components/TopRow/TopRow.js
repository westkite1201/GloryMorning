import React, { Component } from 'react';
import './TopRow.scss';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Button, Fab } from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';
import Location from '../Location';
import { changeWeatherToOnClick } from '../../lib/rain/lib/src/main.js';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  closebtn: {
    top: 0,
    right: 25,
    color: 'white',
    //fontSize: 36,
  },
});

@inject('sidebar')
@inject('edit')
@observer
class TopRow extends Component {
  // menuHandler = () => {
  //     const { sidebar,edit } =this.props;
  //     sidebar.openSideBar();
  //     edit.handleDispatchEventResize();
  // }

  render() {
    const sunny = () => {
      changeWeatherToOnClick('sunny');
    };
    const drizzle = () => {
      changeWeatherToOnClick('drizzle');
    };
    const rain = () => {
      changeWeatherToOnClick('rain');
    };
    const storm = () => {
      changeWeatherToOnClick('storm');
    };
    const { edit } = this.props;
    console.log('[SEO] locationFlagView ', edit.locationFlagView);
    return (
      <div className="top-row">
        <div className="edit-component">
          <button onClick={sunny}>sunny</button>
          <button onClick={drizzle}>drizzle</button>
          <button onClick={rain}>rain</button>
          <button onClick={storm}>storm</button>
          <Switch
            checked={edit.editPageFlag}
            onChange={edit.handlePage}
            value="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          {edit.editPageFlag && (
            <Button onClick={edit.handleSavePage}>컴포넌트 저장</Button>
          )}
        </div>
        <div>
          <Fab onClick={edit.setLocationFlagView}>
            <MyLocation />
          </Fab>
          {edit.locationViewFlag && (
            <div>
              <Location />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(TopRow);
