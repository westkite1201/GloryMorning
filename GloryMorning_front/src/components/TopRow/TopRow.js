import React, { useState } from 'react';
import './TopRow.scss';
import { observer } from 'mobx-react';
import { Switch, Button, Fab } from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';
import Location from '../Location';
import UseStores from '../Setting/UseStores';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';

//import { changeWeatherToOnClick } from '../../lib/rain/lib/src/main.js';
const TopRow = observer(() => {
  const { edit } = UseStores();
  const [isGrow, setIsGrow] = useState(false);

  function handleMouseOver() {
    console.log('handleMouseOver');
    setIsGrow(true);
  }
  function handleMouseLeave() {
    setIsGrow(true);
  }
  function switchView(pageName) {
    //alert('switchView');
    edit.setPageName(pageName);
    edit.loadPage();
  }
  const topRowStyle = useSpring({
    config: { duration: 700, easing: easings.easeExpOut },
    transform: isGrow ? 'translate3d(0, 0, 0) ' : 'translate3d(0, -100%, 0)',
    opacity: isGrow ? 1 : 0,
    //backGroundColor: isGrow ? 'white' : '',
  });

  console.log('[SEO] locationFlagView ', edit.locationFlagView);
  let topRowClassName = edit.editPageFlag ? 'top-row-hide' : 'top-row';
  return (
    <React.Fragment>
      <div
        className="top-row-handler"
        onMouseOver={handleMouseOver}
        style={{ display: isGrow ? 'none' : '' }}
      ></div>
      <animated.div
        style={topRowStyle}
        className={topRowClassName}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="edit-component">
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
        <div className="tob-row-tab-button">
          <div onClick={() => switchView('home')} name="home">
            HOME
          </div>
          <div onClick={() => switchView('test1')} name="test1">
            TEST1
          </div>
          <div onClick={() => switchView('test2')} name="test2">
            TEST2
          </div>
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
      </animated.div>
    </React.Fragment>
  );
});

export default TopRow;
