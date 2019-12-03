import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import Progress from '../Common/Progress'
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
            LocationC }  =this.props;
        let weatherClassNames = weatherInfObject.weatherClassName + " weather_icon"
        let weatherInfoName = weatherInfObject.weatherInfoName
        console.log("weatherClassNames!!!!" , weatherClassNames)
        
        return (
            <div className = "weather_wrapper">

                 <div className = "location_info">
                    {LocationA} {LocationB} {LocationC} 
                 </div>
                 <div>
                 {weatherInfObject.baseDate} {weatherInfObject.baseTime}
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
                     <div className ="huminity">
                        <span style ={{ marginLeft: '10px',marginRight : '15px'}}>
                            <i className = "wi wi-humidity humidity_icon"></i>
                        </span>
                        {weatherInfObject.humidityNow} %
                        <Progress backgroundColor ="#748ffc"
                                    fcstValue ={weatherInfObject.humidityNow}/>
                    </div>
                 </div>

                 <div className = "weather_list">
                    
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
    getWeatherDataShortTerm  : weather.getWeatherDataShortTerm
}))(observer(WeatherInfo))
