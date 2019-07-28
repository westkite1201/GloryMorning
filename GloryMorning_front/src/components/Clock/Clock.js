import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import './Clock.scss'
class Clock extends Component {

  componentDidMount(){
    const { setSocketConnection } = this.props; 
    setSocketConnection();
  }

  componentWillUnmount(){
    const {setSocketDisconnect} = this.props; 
    setSocketDisconnect();
  }

  render() {
    const { timeObj } = this.props; 
    console.log("timeObj " , timeObj)
    return (
      <div className = "clock-wrapper">
       {timeObj.hour} : 
       {timeObj.minute <= 9 ? "0"+timeObj.minute : timeObj.minute} : 
       {timeObj.second <= 9 ? "0"+timeObj.second : timeObj.second}
       <div className ="header-info">
       🔥고뇌하는자 항상 성취하리라🔥
       </div> 
      </div>

    )
  }
}
export default inject(({ weather }) => ({
  /* time */
  setSocketConnection : weather.setSocketConnection,
  setSocketDisconnect  :weather.setSocketDisconnect,
  timeObj : weather.timeObj,
}))(observer(Clock));
