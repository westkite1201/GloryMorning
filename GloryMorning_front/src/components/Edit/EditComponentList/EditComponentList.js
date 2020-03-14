import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
/* componet Import  */
// import TemperatureChart from '../../Chart/WeatherChart/TemperatureChart'
// import RainChart from '../../Chart/WeatherChart/RainChart'
// import HumidityChart from '../../Chart/WeatherChart/HumidityChart'

import HumidityChart_ from '../../Chart/APIWeatherChart/HumidityChart';
import RainChart_ from '../../Chart/APIWeatherChart/RainChart';
import TemperatureChart_ from '../../Chart/APIWeatherChart/TemperatureChart';
import WeatherInfo from '../../WeatherInfo/';
import Clock from '../../Clock';
import DustInfo from '../../WeatherInfo/DustInfo';

import SettingBackGround from '../../Setting/SettingBackground';
class EditComponentList extends Component {
  componentDidMount() {
    const { putComponentList, initComponetList } = this.props;
    /*
      putComponentList('온도' , TemperatureChart)
      putComponentList('강수확률' , RainChart);
      putComponentList('습도' , HumidityChart);
      */
    initComponetList();
    putComponentList('습도NEW', HumidityChart_);
    putComponentList('강수확률NEW', RainChart_);
    putComponentList('온도NEW', TemperatureChart_);
    putComponentList('weatherInfo', WeatherInfo);
    putComponentList('Clock', Clock);
    putComponentList('DustInfo', DustInfo);
    putComponentList('SettingBackGround', SettingBackGround);
  }
  componentWillUnmount() {
    const { initComponetList } = this.props;
    //initComponetList();
  }

  render() {
    return <div></div>;
  }
}
export default inject(({ edit, weather }) => ({
  putComponentList: edit.putComponentList,
  initComponetList: edit.initComponetList,
}))(observer(EditComponentList));
