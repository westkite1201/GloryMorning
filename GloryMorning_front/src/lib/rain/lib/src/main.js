import 'core-js';
import RainRenderer from './rain-renderer';
import Raindrops from './raindrops';
import loadImages from './image-loader';
import createCanvas from './create-canvas';
import TweenLite, { Power4 } from 'gsap';
import times from './times';
import { random, chance } from './random';
import React, { Component } from 'react';

let textureRainFg,
  textureRainBg,
  textureStormLightningFg,
  textureStormLightningBg,
  textureFalloutFg,
  textureFalloutBg,
  textureSunFg,
  textureSunBg,
  textureDrizzleFg,
  textureDrizzleBg,
  textureWhiteBg,
  dropColor,
  dropAlpha;

let textureFg, textureFgCtx, textureBg, textureBgCtx;

let textureBgSize = {
  width: 384,
  height: 256,
};
let textureFgSize = {
  width: 96,
  height: 64,
};

let raindrops, renderer, canvas;

let parallax = { x: 0, y: 0 };

let weatherData = null;
let curWeatherData = null;
let blend = { v: 0 };

export async function loadTextures(width, height, defaultYn) {
  console.log('[rain] start');
  let images = await loadImages([
    { name: 'dropAlpha', src: 'images/drop-alpha.png' },
    { name: 'dropColor', src: 'images/drop-color.png' },

    // { name: 'textureRainFg', src: 'images/weather/texture-rain-fg.png' },
    // { name: 'textureRainBg', src: 'images/weather/texture-rain-bg.png' },
    { name: 'textureRainFg', src: 'images/gloumy.jpg' },
    { name: 'textureRainBg', src: 'images/gloumy.jpg' },
    {
      name: 'textureStormLightningFg',
      src: 'images/weather/texture-storm-lightning-fg.png',
    },
    {
      name: 'textureStormLightningBg',
      src: 'images/weather/texture-storm-lightning-bg.png',
    },

    { name: 'textureFalloutFg', src: 'images/weather/texture-fallout-fg.png' },
    { name: 'textureFalloutBg', src: 'images/weather/texture-fallout-bg.png' },

    { name: 'textureSunFg', src: 'images/weather/texture-sun-fg.png' },
    { name: 'textureSunBg', src: 'images/weather/texture-sun-bg.png' },

    { name: 'textureDrizzleFg', src: 'images/weather/texture-drizzle-fg.png' },
    { name: 'textureDrizzleBg', src: 'images/weather/texture-drizzle-bg.png' },

    { name: 'textureWhiteBg', src: 'images/weather/white.jpg' },
  ]);

  textureRainFg = images.textureRainFg.img;
  textureRainBg = images.textureRainBg.img;

  textureFalloutFg = images.textureFalloutFg.img;
  textureFalloutBg = images.textureFalloutBg.img;

  textureStormLightningFg = images.textureStormLightningFg.img;
  textureStormLightningBg = images.textureStormLightningBg.img;

  textureSunFg = images.textureSunFg.img;
  textureSunBg = images.textureSunBg.img;

  textureDrizzleFg = images.textureDrizzleFg.img;
  textureDrizzleBg = images.textureDrizzleBg.img;

  textureWhiteBg = images.textureWhiteBg.img;

  dropColor = images.dropColor.img;
  dropAlpha = images.dropAlpha.img;

  let render = await init(width, height, defaultYn);
  //alert('main render', render);
  return render;
}
//loadTextures();

export async function init(width, height, defaultYn) {
  console.log('[rain] init');
  canvas = document.querySelector('#rain-container');
  console.log('canvas!! width height defaultYn', width, height, defaultYn);
  let dpi = window.devicePixelRatio;
  if (defaultYn) {
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  } else {
    canvas.width = width * dpi;
    canvas.height = height * dpi;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  /* 서연 추가  */
  raindrops = null;
  textureFg = null;
  textureBgCtx = null;
  renderer = null;

  raindrops = new Raindrops(
    canvas.width,
    canvas.height,
    dpi,
    dropAlpha,
    dropColor,
    {
      trailRate: 1,
      trailScaleRange: [0.2, 0.45],
      collisionRadius: 0.45,
      dropletsCleaningRadiusMultiplier: 0.28,
    },
  );

  textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
  textureFgCtx = textureFg.getContext('2d');
  textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
  textureBgCtx = textureBg.getContext('2d');

  generateTextures(textureRainFg, textureRainBg);

  console.log('raindrops.canvas ', raindrops.canvas);
  renderer = new RainRenderer(
    canvas,
    raindrops.canvas,
    textureFg,
    textureBg,
    null,
    {
      brightness: 1.04,
      alphaMultiply: 6,
      alphaSubtract: 3,
      // minRefraction:256,
      // maxRefraction:512
    },
  );

  await setupEvents();
  return true;
}

async function setupEvents() {
  setupParallax();
  setupWeather();
  setupFlash();
  return;
}
function setupParallax() {
  document.addEventListener('mousemove', event => {
    let x = event.pageX;
    let y = event.pageY;

    TweenLite.to(parallax, 1, {
      x: (x / canvas.width) * 2 - 1,
      y: (y / canvas.height) * 2 - 1,
      ease: Power4.easeOut,
      onUpdate: () => {
        renderer.parallaxX = parallax.x;
        renderer.parallaxY = parallax.y;
      },
    });
  });
}
function setupFlash() {
  setInterval(() => {
    if (chance(curWeatherData.flashChance)) {
      flash(
        curWeatherData.bg,
        curWeatherData.fg,
        curWeatherData.flashBg,
        curWeatherData.flashFg,
      );
    }
  }, 500);
}
/* addListener를 통해서 하는거 같으니까  */
/* 주석 처리하고 새로운 updateWeather로 수정함  */
/* 셀럭터로  값을 가져오고 처리하고있어서 새롭게 세팅함 */
function setupWeather() {
  setupWeatherData();
  // window.addEventListener("hashchange",(event)=>{
  //   updateWeather();
  // });
  // updateWeather();
  newUpdateWeather('rain');
}
function setupWeatherData() {
  let defaultWeather = {
    raining: true,
    minR: 20,
    maxR: 50,
    rainChance: 0.35,
    rainLimit: 6,
    dropletsRate: 50,
    dropletsSize: [3, 5.5],
    trailRate: 1,
    trailScaleRange: [0.25, 0.35],
    fg: textureRainFg,
    bg: textureRainBg,
    // fg:textureWhiteBg,
    // bg:textureWhiteBg,
    flashFg: null,
    flashBg: null,
    flashChance: 0,
    collisionRadiusIncrease: 0.0002,
  };

  function weather(data) {
    return Object.assign({}, defaultWeather, data);
  }

  weatherData = {
    rain: weather({
      rainChance: 0.35,
      dropletsRate: 50,
      raining: true,
      // trailRate:2.5,
      fg: textureRainFg,
      bg: textureRainBg,
    }),
    storm: weather({
      maxR: 55,
      rainChance: 0.4,
      dropletsRate: 80,
      dropletsSize: [3, 5.5],
      trailRate: 2.5,
      trailScaleRange: [0.25, 0.4],
      fg: textureRainFg,
      bg: textureRainBg,
      flashFg: textureStormLightningFg,
      flashBg: textureStormLightningBg,
      flashChance: 0.1,
    }),
    fallout: weather({
      minR: 30,
      maxR: 60,
      rainChance: 0.35,
      dropletsRate: 20,
      trailRate: 4,
      fg: textureFalloutFg,
      bg: textureFalloutBg,
      collisionRadiusIncrease: 0,
    }),
    drizzle: weather({
      minR: 10,
      maxR: 40,
      rainChance: 0.15,
      rainLimit: 2,
      dropletsRate: 10,
      dropletsSize: [3.5, 6],
      fg: textureWhiteBg,
      bg: textureWhiteBg,
    }),
    sunny: weather({
      rainChance: 0,
      rainLimit: 0,
      droplets: 0,
      raining: false,
      fg: textureSunFg,
      bg: textureSunBg,
    }),
  };
}
function updateWeather() {
  let hash = window.location.hash;
  let currentSlide = null;
  let currentNav = null;
  if (hash != '') {
    currentSlide = document.querySelector(hash);
  }
  if (currentSlide == null) {
    currentSlide = document.querySelector('.slide');
    hash = '#' + currentSlide.getAttribute('id');
  }
  currentNav = document.querySelector("[href='" + hash + "']");
  let data = weatherData[currentSlide.getAttribute('data-weather')];
  /* 슬라이드 클릭으로 인해서 데잍 ㅓ가져오는거같은데  */
  curWeatherData = data;
  console.log('[SEO] curWeatherData ', curWeatherData);
  //console.log("data!!!", currentSlide.getAttribute('data-weather'))
  raindrops.options = Object.assign(raindrops.options, data);

  raindrops.clearDrops();

  TweenLite.fromTo(
    blend,
    1,
    {
      v: 0,
    },
    {
      v: 1,
      onUpdate: () => {
        generateTextures(data.fg, data.bg, blend.v);
        renderer.updateTextures();
      },
    },
  );
  /* 불피요 로직인지 검사 */

  let lastSlide = document.querySelector('.slide--current');
  if (lastSlide != null) lastSlide.classList.remove('slide--current');

  let lastNav = document.querySelector('.nav-item--current');
  if (lastNav != null) lastNav.classList.remove('nav-item--current');

  currentSlide.classList.add('slide--current');
  currentNav.classList.add('nav-item--current');
}

function flash(baseBg, baseFg, flashBg, flashFg) {
  let flashValue = { v: 0 };
  function transitionFlash(to, t = 0.025) {
    return new Promise((resolve, reject) => {
      TweenLite.to(flashValue, t, {
        v: to,
        ease: Power4.easeOut,
        onUpdate: () => {
          generateTextures(baseFg, baseBg);
          generateTextures(flashFg, flashBg, flashValue.v);
          renderer.updateTextures();
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  let lastFlash = transitionFlash(1);
  times(random(2, 7), i => {
    lastFlash = lastFlash.then(() => {
      return transitionFlash(random(0.1, 1));
    });
  });
  lastFlash = lastFlash
    .then(() => {
      return transitionFlash(1, 0.1);
    })
    .then(() => {
      transitionFlash(0, 0.25);
    });
}
function generateTextures(fg, bg, alpha = 1) {
  textureFgCtx.globalAlpha = alpha;
  textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

  textureBgCtx.globalAlpha = alpha;
  textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);
}

/* SEO 추가  */
export function changeWeatherToOnClick(param) {
  newUpdateWeather(param);
}

function newUpdateWeather(selectWeather) {
  let data = weatherData[selectWeather];
  curWeatherData = data;
  raindrops.options = Object.assign(raindrops.options, data);

  raindrops.clearDrops();

  TweenLite.fromTo(
    blend,
    1,
    {
      v: 0,
    },
    {
      v: 1,
      onUpdate: () => {
        generateTextures(data.fg, data.bg, blend.v);
        renderer.updateTextures();
      },
    },
  );
}

function initWeather() {
  let rainChance = 0.35;
  let dropletsRate = 50;
}
