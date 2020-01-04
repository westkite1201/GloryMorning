import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import Progress from '../Common/Progress'
import OpacityIcon from '@material-ui/icons/Opacity';
import moment from 'moment'
import 'weather-icons/css/weather-icons.css';
import './WeatherInfo.scss'


class WeatherInfo extends Component {
    componentDidMount(){
        const { getWeatherDataShortTerm } =this.props;
        getWeatherDataShortTerm(60, 127);

    }
    componentDidUpdate(){
        const {weatherClassName} = this.props; 
    }

   
    render() {
        let  {
            weatherInfObject,
            LocationA,
            LocationB,
            LocationC,
            justFitClothes }  =this.props;
        let weatherClassNames = weatherInfObject.weatherClassName + " weather_icon"
        let weatherInfoName = weatherInfObject.weatherInfoName
        console.log("weatherClassNames!!!!" , weatherClassNames)
        
        return (
            <div className = "weather_wrapper">

                 <div className = "location_info">
                    {LocationA} {LocationB} {LocationC} 
                 </div>
                 <div className ="location-info-time">
                 {moment(weatherInfObject.baseDate).format("YYYY월 MM월 DD일 ")} 
                 {weatherInfObject.baseTime}
                 </div>
                 <div className = "weather_icon_wrapper">
                    <i className={weatherClassNames}></i>
                    <div className ="weather-info-name">
                        {weatherInfoName}
                    </div>
                 </div>
                
                 <div className ="temperture">
                    {weatherInfObject.temperatureNow} 
                    <i className ="wi wi-celsius"></i>
                 </div>
                <hr></hr>
                 <div className = "weather_info">
                    <div className ="rain">
                        <span style ={{ marginRight : '10px'}}>
                            <i className ="wi wi-umbrella rain_icon"></i>
                        </span>
                        {weatherInfObject.rainNow}mm
                        <Progress backgroundColor ="#1864ab"
                                  fcstValue ={weatherInfObject.rainNow}/>
                    </div>
                     <div className ="humidity">
                        <span style ={{marginRight : '15px'}}>
                            <OpacityIcon style ={{fontSize: '50px'}}/>
                            {/*<i className = "wi wi-humidity humidity_icon"></i>*/}
                        </span>
                        {weatherInfObject.humidityNow} %
                        <Progress backgroundColor ="#748ffc"
                                    fcstValue ={weatherInfObject.humidityNow}/>
                    </div>
                 </div>

                 <div className = "weather_list">
                    <div>
                        <span>이걸 입어보세요! </span>
                        <div>                                  
                            {justFitClothes.bottom}
                        </div>
                        <div>
                            {justFitClothes.top}
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
export default inject(({ weather }) => ({
    LocationA: weather.LocationA,
    LocationB: weather.LocationB,
    LocationC: weather.LocationC,

    weatherInfObject : weather.weatherInfObject,
    temperatureNow : weather.temperatureNow,
    weatherClassName: weather.weatherClassName,
    weatherInfoData : weather.weatherInfoData,
    getWeatherDataShortTerm  : weather.getWeatherDataShortTerm,

    justFitClothes : weather.justFitClothes,
}))(observer(WeatherInfo))
