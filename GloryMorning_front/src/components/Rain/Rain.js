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
    //init(width, height, true);
    loadTextures(width, height, defaultYn);
  }

  // reRenderRain = () => {
  //   let awidth = 400;
  //   let aheight = 400;
  //   let dpi = window.devicePixelRatio;
  //   // context
  //   var canvas = document.querySelector('#rain-container');
  //   var ctx = canvas.getContext('2d');
  //   var gl = canvas.getContext('webgl'); // will always be null
  //   // Set the viewport
  //   // ctx3d.viewport(0, 0, this.width, this.height);
  //   // ctx3d.clearColor(0, 0, 0, 0);

  //   gl.viewport(0, 0, 400, 400);
  //   gl = canvas.getContext('webgl', { alpha: false });
  //   // gl.colorMask(false, false, false, true);
  //   // gl.clearColor(0, 0, 0, 1);
  //   // gl.clear(gl.COLOR_BUFFER_BIT);
  //   // Clear the canvas.
  //   //gl.clear(gl.COLOR_BUFFER_BIT);

  //   // gl.getExtension('WEBGL_lose_context').restoreContext();
  //   canvas.width = awidth * dpi;
  //   canvas.height = aheight * dpi;
  //   canvas.style.width = awidth + 'px';
  //   canvas.style.height = aheight + 'px';
  //   //init(awidth, aheight, false)
  //   //loadTextures(awidth, aheight, false)
  //   this.setState({});
  // };
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
        <div className="rain-container">
          <div className="slideshow">
            <canvas id="rain-container"></canvas>
            {<div className="test">RAIN</div>}
          </div>
          {/*
          <p className="nosupport">
            Sorry, but your browser does not support WebGL!
          </p>
          */}
        </div>
      </Fragment>
    );
  }
}
