import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import './DustInfo.scss'

//측정일  :dateTime 
//미세먼지  pm10Value
//초미세먼지 pm25Value
//오존  o3Value
//이산화질소 no2Value
//일산화탄소 coValue
//아황산가스 so2Value

class DustInfo extends Component {

    componentDidMount(){
        const {getDustInfo} = this.props; 
        getDustInfo();
    }
    render() {
        const {dustInfoObject} = this.props;
        console.log(dustInfoObject)
        return (
            <div className ="dust_info_container">
                <div className = "station_info" >
                    <div> 측정일  {dustInfoObject.dateTime} </div>
                    <div> 가장 가까운 관측소와의 거리는 {dustInfoObject.distance} 입니다</div>
                    <div> 관측소 이름:  {dustInfoObject.addr}</div>
                </div>
                <div className = "display_icon_wrapper" >
   
                
                </div>
                <div> 미세먼지  {dustInfoObject.pm10Value} </div>
                <div> 초미세먼지  {dustInfoObject.pm25Value}</div>
                <div> 오존 {dustInfoObject.o3Value} </div>
                <div> 일산화탄소{dustInfoObject.coValue} </div>   
                <div> 이산화질소 {dustInfoObject.no2Value}</div>   
                <div> 아황산가스 {dustInfoObject.so2Value} </div>
            </div>
        )
    }
}
export default inject(({ weather, edit }) => ({
    dustInfoObject : weather.dustInfoObject,
    getDustInfo : weather.getDustInfo,
}))(observer(DustInfo));