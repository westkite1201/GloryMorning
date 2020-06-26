import React, { Fragment, useEffect, useState } from 'react';
import {
  loadTextures,
  init,
  changeWeatherToOnClick,
} from '../../lib/rain/lib/src/main.js';
import './Rain.css';
import { observer } from 'mobx-react';
import UseStores from '../Setting/UseStores';
let width = 1000;
let height = 1000;

const Rain = observer(() => {
  const [render, setRender] = useState(false);
  const { edit } = UseStores();
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
    }
  }, [render]);
  return (
    <Fragment>
      {/*<div style={{ marginTop: '50px' }}></div>*/}
      {/*
      <button onClick={() => changeWeatherToOnClick('storm')}>
        버튼 클릭 테스트 STORM{' '}
      </button>
      <button onClick={() => changeWeatherToOnClick('drizzle')}>
        버튼 클릭 테스트 drizzle{' '}
      </button>
      <button onClick={() => this.reRenderRain()}> rain 재 랜더링 </button>
      */}
      <div className="rain-container">
        <div className="slideshow">
          <canvas id="rain-container"></canvas>
          {<div className="test">비가 옵니다</div>}
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
