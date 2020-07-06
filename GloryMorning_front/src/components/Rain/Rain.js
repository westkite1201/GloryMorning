import React, { Fragment, useEffect, useState } from 'react';
import {
  loadTextures,
  init,
  changeWeatherToOnClick,
} from '../../lib/rain/lib/src/main.js';
import * as helpers from '../../lib/helpers';
import './Rain.css';
import Snowfall from 'react-snowfall';
import { observer } from 'mobx-react';
import UseStores from '../Setting/UseStores';
let width = 1920;
let height = 1080;

const Rain = observer(() => {
  const [render, setRender] = useState(false);
  const { edit, weather } = UseStores();
  let defaultYn = true;
  useEffect(() => {
    alert('rain useEfftect, ' + edit.isRainRender);
    async function loadRainDrop() {
      alert('loadRainDrop');
      //let targetDiv = document.getElementById('rain-container').getBoundingClientRect();
      let render = await loadTextures(width, height, defaultYn);
      setRender(render);
    }
    if (!edit.isRainRender) {
      loadRainDrop();
    }
    return () => {
      alert('RAIN return');
      edit.setRainRender(false);
    };
  }, []);

  useEffect(() => {
    if (render) {
      edit.setRainRender(true);
      edit.handleRainContainerResize();
      if (weather.weatherInfoObject.weatherInfoCode) {
        let weatherInfoCode = weather.weatherInfoObject.weatherInfoCode;
        let rainViewName = helpers.rainViewCodeConverter(weatherInfoCode);
        alert(rainViewName);
        changeWeatherToOnClick(rainViewName);
      }
    }
  }, [render, weather.weatherInfoObject]);

  return (
    <Fragment>
      <div className="rain-container" id="rain">
        <div className="slideshow">
          <canvas id="rain-container"></canvas>
          <div className="rain-info">
            {weather.weatherInfoObject.weatherInfoGamsung}
          </div>
        </div>

        <div
          style={{
            height: 200,
            width: 400,
            background: '#282c34',
            display: 'none',
          }}
        >
          <Snowfall />
        </div>
      </div>
    </Fragment>
  );
});
export default React.memo(Rain);
