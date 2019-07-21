import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
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
        let  { weatherClassName,
            temperatureNow,
            weatherInfObject }  =this.props;
        let weatherClassNames = weatherInfObject.weatherClassName + " weather_icon"
        return (
            <div className = "weather_wrapper">

                 <div className = "location_info">

                 </div>

                 <div className = "weather_icon_wrapper">
                    <i className={weatherClassNames}></i>
                 </div>
                
                 <div className ="temperture">
                    {weatherInfObject.temperatureNow} 
                    <i className ="wi wi-celsius"></i>
                 </div>
                <hr></hr>
                 <div className = "weather_info">
                    <div className ="rain">
                        <i className ="wi wi-raindrop"></i>
                        {weatherInfObject.rainNow} 
                    </div>
                     <div className ="huminity">
                        <i className = "wi wi-humidity"></i>                      "
                        {weatherInfObject.humidityNow} 
                    </div>
                 </div>

                 <div className = "weather_list">
                 
                 </div>
            </div>
        )
    }
}
export default inject(({ weather, edit }) => ({
    weatherInfObject : weather.weatherInfObject,
    temperatureNow : weather.temperatureNow,
    weatherClassName: weather.weatherClassName,
    weatherInfoData : weather.weatherInfoData,
    getWeatherDataShortTerm  : weather.getWeatherDataShortTerm
}))(observer(WeatherInfo))
