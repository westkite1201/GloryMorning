import React, { Component, Fragment } from 'react';
import {
  loadTextures,
  init,
  changeWeatherToOnClick,
} from '../../lib/rain/lib/src/main.js';
import './Rain.css';
let width = 1000;
let height = 1000;
export default class Rain extends Component {
  componentDidMount() {
    let defaultYn = true;
    loadTextures(width, height, defaultYn);
  }

  render() {
    console.log('render');
    // const script = document.createElement("script");
    // script.src = "lib/src/main.js";
    // script.async = true;
    // document.body.appendChild(script);
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
        <div className="container">
          <div className="slideshow">
            <canvas id="rain-container"></canvas>
            {/*<div className="test">RAIN</div>*/}
          </div>

          <p className="nosupport">
            Sorry, but your browser does not support WebGL!
          </p>
        </div>
      </Fragment>
    );
  }
}
