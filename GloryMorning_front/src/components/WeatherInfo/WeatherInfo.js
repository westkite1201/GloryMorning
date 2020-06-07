import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Progress from '../Common/Progress';
import OpacityIcon from '@material-ui/icons/Opacity';
import moment from 'moment';
import ScaleLoader from 'react-spinners/ScaleLoader';

import 'weather-icons/css/weather-icons.css';
import './WeatherInfo.scss';

class WeatherInfo extends Component {
  componentDidMount() {
    const { getWeatherDataShortTerm } = this.props;
    getWeatherDataShortTerm(60, 127);
  }
  render() {
    let {
      isFetchingShortTerm,
      weatherInfObject,
      LocationA,
      LocationB,
      LocationC,
      justFitClothes,
    } = this.props;
    let weatherClassNames = weatherInfObject.weatherClassName + ' weather_icon';
    let weatherInfoName = weatherInfObject.weatherInfoName;
    console.log('weatherClassNames!!!!', weatherClassNames);

    const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
`;
    return (
      <div className="weather_wrapper">
        {isFetchingShortTerm ? (
          <ScaleLoader
            css={override}
            sizeUnit={'%'}
            size={20}
            color={'#b197fc'}
            loading={isFetchingShortTerm}
          />
        ) : (
          <Fragment>
            <div className="location_info">
              {LocationA} {LocationB} {LocationC}
            </div>
            <div className="location-info-time">
              {moment(weatherInfObject.baseDate).format('YYYY월 MM월 DD일 ')}
              {weatherInfObject.baseTime}
            </div>
            <div className="weather_icon_wrapper">
              <i className={weatherClassNames}></i>
              <div className="weather-info-name">{weatherInfoName}</div>
            </div>

            <div className="temperture">
              {weatherInfObject.temperatureNow}
              <i className="wi wi-celsius"></i>
            </div>
            <hr></hr>
            <div className="weather_info">
              <div className="rain">
                <span style={{ marginRight: '10px' }}>
                  <i className="wi wi-umbrella rain_icon"></i>
                </span>
                {weatherInfObject.rainNow}mm
                <Progress
                  backgroundColor="#1864ab"
                  fcstValue={weatherInfObject.rainNow}
                />
              </div>
              <div className="humidity">
                <span style={{ marginRight: '15px' }}>
                  <OpacityIcon style={{ fontSize: '50px' }} />
                  {/*<i className = "wi wi-humidity humidity_icon"></i>*/}
                </span>
                {weatherInfObject.humidityNow} %
                <Progress
                  backgroundColor="#748ffc"
                  fcstValue={weatherInfObject.humidityNow}
                />
              </div>
            </div>

            <div className="weather_list">
              <div>
                <span>이걸 입어보세요! </span>
                <div>{justFitClothes.bottom}</div>
                <div>{justFitClothes.top}</div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
export default inject(({ weather }) => ({
  LocationA: weather.LocationA,
  LocationB: weather.LocationB,
  LocationC: weather.LocationC,

  weatherInfObject: weather.weatherInfObject,
  temperatureNow: weather.temperatureNow,
  weatherClassName: weather.weatherClassName,
  weatherInfoData: weather.weatherInfoData,
  getWeatherDataShortTerm: weather.getWeatherDataShortTerm,
  isFetchingShortTerm: weather.isFetchingShortTerm,

  justFitClothes: weather.justFitClothes,
}))(observer(WeatherInfo));
