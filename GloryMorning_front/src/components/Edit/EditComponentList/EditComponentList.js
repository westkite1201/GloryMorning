import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
/* componet Import  */
import TemperatureChart from '../../Chart/WeatherChart/TemperatureChart'
import RainChart from '../../Chart/WeatherChart/RainChart'
import HumidityChart from '../../Chart/WeatherChart/HumidityChart'
import HumidityChart_ from '../../Chart/APIWeatherChart/HumidityChart'
import RainChart_ from '../../Chart/APIWeatherChart/RainChart'
import TemperatureChart_ from '../../Chart/APIWeatherChart/TemperatureChart'
import WeatherInfo from '../../WeatherInfo/'
import Clock from '../../Clock'
import DustInfo from '../../WeatherInfo/DustInfo'



import style from './EditComponentList.module.css';
import axios from 'axios'
import * as weatherApi from '../../../lib/api/weatherApi'
import moment from 'moment'


let cx;
let cy;
class EditComponentList extends Component {

    componentDidMount(){
      const { putComponentList,
              nowGeolocation } = this.props;
      /*
      putComponentList('온도' , TemperatureChart)
      putComponentList('강수확률' , RainChart);
      putComponentList('습도' , HumidityChart);
      */
      putComponentList('습도NEW', HumidityChart_)
      putComponentList('강수확률NEW', RainChart_)
      putComponentList('온도NEW', TemperatureChart_)
      putComponentList('weatherInfo' ,WeatherInfo)
      putComponentList('Clock' , Clock)
      putComponentList('DustInfo', DustInfo)
      nowGeolocation();

    }
    state = {
        collapse : false,
    
    }
    toggle =()=> {
        this.setState({ collapse: !this.state.collapse });
    }



  /*
	mapToComponent
	1. pureComponents의 키 값(컴포넌트의 이름)만을 추출해 div로 만드는 함수이다.
		 onClick 이벤트에 props로 전달받은 handleSelect 함수를 연결하여
		 div를 클릭하면 layout에 해당 컴포넌트가 추가될 수 있도록 해준다.
	*/
	mapToComponent = () => {
    const { componentList, addSelectedComponent } = this.props;
		return componentList.map((item, i) => {
			let name;
			for(let compName in item){
				name = compName;
			}
			return (
            <div className  = {style.EditableList_Component}
                  onClick    = {addSelectedComponent}
                  key  		= {i}
                  id			= {name}>
                  {name}
						
					</div>);
		});
  };
  
  getLocationAtDB = async(locationA, locationB, locationC) =>{
    try{ 
      const response = await weatherApi.getLocation( 
                                                    locationA, 
                                                    locationB,
                                                    locationC
                                                  );
    if (response.statusText === "OK") { //포스트 작성 성공 
        console.log(response)
        let responseData= response.data.response.body;
        let weatherArray = responseData.items.item;
        console.log(weatherArray)

        let rainfallArr = []
        let rainfallmmArr = [];
        let humidityArr = [];
        let skyArr = [];
        let temperatureArr = [] 
        weatherArray.map((item)=>{
          if(item.category ==='POP'){
            rainfallArr.push(item)
          }
          if(item.category ==='PTY'){
            rainfallmmArr.push(item)
          }
          if(item.category ==='REH'){
            humidityArr.push(item)
          }
          if(item.category ==='SKY'){
            skyArr.push(item)
          }
          if(item.category ==='T3H'){
            temperatureArr.push(item)
          }
        })
        console.log(rainfallArr)
        console.log(rainfallmmArr)
        console.log(humidityArr)
        console.log(skyArr)
        console.log(temperatureArr)
      }
    }catch(e){
        console.log(e)
    }
  }

    
  render() {
    const {componentList, handlePage, handleSavePage, getDustInfo}  = this.props;
    const {mapToComponent} = this; 
    return (
      <div>
      <button onClick ={this.getNowTime}>모멘트 테스트 </button>
        <button onClick={this.toggle}> 토글</button>
        <button onClick={handlePage}> 핸들페이지</button>

        <button onClick ={getDustInfo}> getDustInfo </button>
        <button onClick ={handleSavePage}> handleSavePage </button>
        
        <Collapse isOpen={this.state.collapse}>
            {this.mapToComponent()}
        </Collapse>
      </div>
    )
  }
}
export default inject(({ edit, weather }) => ({
  getDustInfo : weather.getDustInfo,
  handleSavePage : edit.handleSavePage,
  putComponentList : edit.putComponentList,
  addSelectedComponent : edit.addSelectedComponent,
  componentList : edit.componentList,
  handlePage : edit.handlePage,
  getLocationName : weather.getLocationName,
  currentX : weather.currentX,
  currentY : weather.currentY,
  nowGeolocation : weather.nowGeolocation
}))(observer(EditComponentList));