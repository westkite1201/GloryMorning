import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import './Clock.scss'
class Clock extends Component {

  componentDidMount= async() => {
    const { setSocketConnection, 
            getQuotes, 
            rollingQuotes } = this.props; 
    setSocketConnection();
    await getQuotes();
    await rollingQuotes();
  }

  componentWillUnmount(){
    const { setSocketDisconnect } = this.props; 
    setSocketDisconnect();
  }

  render() {
    const { timeObj, viewQuotes} = this.props; 
    //console.log("[SEO] viewQuotes" ,viewQuotes.QUOTES)
    return (
      <div className = "clock-wrapper">
       {timeObj.year}년 {' '}
       {timeObj.month}월 {' '}
       {timeObj.day}일 {' '}
       
       {timeObj.hour} : 
       {timeObj.minute <= 9 ? "0"+timeObj.minute : timeObj.minute} : 
       {timeObj.second <= 9 ? "0"+timeObj.second : timeObj.second}
       <div className ="header-info">
        🔥고뇌하는자 항상 성취하리라🔥
        <div>
          { viewQuotes.QUOTES }
        </div>

       </div> 
      </div>

    )
  }
}
export default inject(({ weather,quotes }) => ({
  /* time */
  setSocketConnection : weather.setSocketConnection,
  setSocketDisconnect  :weather.setSocketDisconnect,
  timeObj : weather.timeObj,
  /* quotes */
  getQuotes : quotes.getQuotes,
  rollingQuotes : quotes.rollingQuotes,
  viewQuotes : quotes.viewQuotes,
}))(observer(Clock));
