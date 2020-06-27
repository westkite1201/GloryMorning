import React, { Fragment, useEffect, useState } from 'react';
import {
  loadTextures,
  init,
  changeWeatherToOnClick,
} from '../../lib/rain/lib/src/main.js';
import * as helpers from '../../lib/helpers';
import './Rain.css';
import { observer } from 'mobx-react';
import UseStores from '../Setting/UseStores';
let width = 1920;
let height = 1080;

const Rain = observer(() => {
  const [render, setRender] = useState(false);
  const { edit, weather } = UseStores();
  let defaultYn = true;
  useEffect(() => {
    async function loadRainDrop() {
      //let targetDiv = document.getElementById('rain-container').getBoundingClientRect();
      let render = await loadTextures(width, height, defaultYn);
      setRender(render);
    }
    loadRainDrop();
  }, []);

  useEffect(() => {
    if (render) {
      edit.setRainRender(true);
      edit.handleRainContainerResize();
      if (weather.weatherInfoObject.weatherInfoCode) {
        let weatherInfoCode = weather.weatherInfoObject.weatherInfoCode;
        let rainViewName = helpers.rainViewCodeConverter(weatherInfoCode);
        //alert(rainViewName);
        changeWeatherToOnClick(rainViewName);
      }
    }
  }, [render, weather.weatherInfoObject]);

  return (
    <Fragment>
      <div className="rain-container">
        <div className="slideshow">
          <canvas id="rain-container"></canvas>
          {
            <div className="rain-info">
              {weather.weatherInfoObject.weatherInfoGamsung}
            </div>
          }
        </div>
        {/*
        <p className="nosupport">
          Sorry, but your browser does not support WebGL!
        </p>
        */}
      </div>
    </Fragment>
  );
});
export default Rain;
