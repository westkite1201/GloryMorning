import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './Clock.scss';
const MAINSTRING = '🔥고뇌하는자 항상 성취하리라🔥';
class Clock extends Component {
  componentDidMount() {
    const {
      setSocketConnection,
      getTimeIntervalStart,
      getQuotes,
      updateWeatherDataIntevalStart,
      rollingQuotes,
    } = this.props;
    console.log('[seo][clock][ComponentDidmOUNT]');
    setSocketConnection();
    getTimeIntervalStart();
    updateWeatherDataIntevalStart();
    getQuotes();
    rollingQuotes();
  }

  componentWillUnmount() {
    const { setSocketDisconnect } = this.props;
    setSocketDisconnect();
    //quotesInit();
  }

  render() {
    console.log('[seo][cloksRender]');
    const { timeObj, viewQuotes } = this.props;
    //console.log("[SEO] viewQuotes" ,viewQuotes.QUOTES)
    return (
      <div className="clock-wrapper">
        {timeObj.year}년 {timeObj.month}월 {timeObj.day}일 {timeObj.hour} :
        {timeObj.minute <= 9 ? '0' + timeObj.minute : timeObj.minute} :
        {timeObj.second <= 9 ? '0' + timeObj.second : timeObj.second}
        <div className="header-info">
          {/* MAINSTRING */}
          <div className="quotesWrapper">
            <div className="quotes">{viewQuotes.QUOTES}</div>
            <div className="author">{viewQuotes.AUTHOR}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default inject(({ weather, quotes }) => ({
  /* time */
  setSocketConnection: weather.setSocketConnection,
  setSocketDisconnect: weather.setSocketDisconnect,
  getTimeIntervalStart: weather.getTimeIntervalStart,
  timeObj: weather.timeObj,
  updateWeatherDataIntevalStart: weather.updateWeatherDataIntevalStart,
  /* quotes */
  getQuotes: quotes.getQuotes,
  rollingQuotes: quotes.rollingQuotes,
  viewQuotes: quotes.viewQuotes,
  quotesInit: quotes.quotesInit,
}))(observer(Clock));
