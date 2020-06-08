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
import SearchAddressDaum from '../../Setting/SearchAddress/SearchAddressDaum';
import Rain from '../../Rain';
class EditComponentList extends Component {
  componentDidMount() {
    const { putComponentList, initComponetList } = this.props;
    /*
      putComponentList('온도' , TemperatureChart)
      putComponentList('강수확률' , RainChart);
      putComponentList('습도' , HumidityChart);
      */
    initComponetList();
    let componentList = [
      { 습도NEW: HumidityChart_, category: 'weather', pageView: 'seoPage' },
      { 강수확률NEW: RainChart_, category: 'weather', pageView: 'seoPage' },
      { 온도NEW: TemperatureChart_, category: 'weather', pageView: 'seoPage' },
      { weatherInfo: WeatherInfo, category: 'weather', pageView: 'seoPage' },
      { DustInfo: DustInfo, category: 'weather', pageView: 'seoPage' },
      { Clock: Clock, category: 'weather', pageView: 'seoPage' },
      { Rain: Rain, category: 'weather', pageView: 'seoPage' },
      {
        SettingBackGround: SettingBackGround,
        category: 'admin',
        pageView: '어드민',
      },
      {
        SearchAddressDaum: SearchAddressDaum,
        category: 'weather',
        pageView: '서치다음',
      },
    ];
    putComponentList(componentList);

    // putComponentList('습도NEW', HumidityChart_);
    // putComponentList('강수확률NEW', RainChart_);
    // putComponentList('온도NEW', TemperatureChart_);
    // putComponentList('weatherInfo', WeatherInfo);
    // putComponentList('Clock', Clock);
    // putComponentList('DustInfo', DustInfo);
    // putComponentList('SettingBackGround', SettingBackGround);
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
