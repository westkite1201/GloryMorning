import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/ko';
class TemperatureChart extends Component {
  componentDidMount() {
    const { getWeatherData } = this.props;
    getWeatherData('T3H');
  }

  componentDidUpdate() {
    const { isFetchingTemp } = this.props;
    let chart = this.refs.chart.getChart();
    if (isFetchingTemp) {
      chart.showLoading('Loading...');
    } else {
      chart.hideLoading('Loading...');
      const { allChartResizing } = this.props;
      allChartResizing();
    }
    console.log('componentDidUpdate');
    console.log('isFetching', isFetchingTemp);
    // const { allChartResizing } = this.props;
    // allChartResizing();
    //this.chartUpdate()
  }

  render() {
    console.log('render');
    const {
      wrapperid,
      temperatureDataList,
      temperatureDataListYesterday,
    } = this.props;
    console.log('temperatureData ', temperatureDataList);

    const config = {
      chart: {
        //height: 100,
        backgroundColor: 'none',
        events: {},
      },

      title: {
        text: '☀️온도',
        style: {
          color: '#e9ecef',
        },
      },
      tooltip: {
        formatter: function() {
          // if(this.series.name === '전일 온도'){
          //     let momomtObj = moment(this.point.x).valueOf() - 24 * 3600 * 1000
          //      // logs an object with properties: points, x, y
          //     return '<b>' +moment(momomtObj).format('YYYY-MM-DD-dddd-HH:mm') + '</b><br/>' +
          //         '<br/><span style="color:' + this.point.color + '">\u25CF</span> '   +
          //         '' + this.series.name + ' : ' + this.point.y + 'ºC<br/>'
          // } else {
          // logs an object with properties: points, x, y
          return (
            '<b>' +
            moment(this.point.x).format('YYYY-MM-DD-dddd-HH:mm') +
            '</b><br/>' +
            '<br/><span style="color:' +
            this.point.color +
            '">\u25CF</span> ' +
            '' +
            this.series.name +
            ' : ' +
            this.point.y +
            'ºC<br/>'
          );
          //}
        },
      },
      id: wrapperid + '_c',

      credits: {
        enabled: false,
      },
      subtitle: {
        //text: 'Source: thesolarfoundation.com'
      },
      xAxis: [
        {
          type: 'datetime',
          dateTimeLabelFormats: {
            // don't display the dummy year
            month: '%H:%M:%S',
          },
          labels: {
            style: { fontSize: 12 },
            format: '{value:%m월 %e일 %H-%M}',
          },

          plotLines: [
            {
              color: 'red', // Color value
              dashStyle: 'longdashdot', // Style of the plot line. Default to solid
              value: moment()._d.valueOf(), // Value of where the line will appear
              width: 2, // Width of the line
            },
          ],
          plotBands: [
            {
              color: 'rgba(255,0,0,0.5)', // Color value
              from: moment()._d.valueOf() - 3600 * 1000 * 2, // Start of the plot band
              to: moment()._d.valueOf() + 3600 * 1000 * 2, // End of the plot band
            },
          ],
        },
        {
          type: 'datetime',
          dateTimeLabelFormats: {
            // don't display the dummy year
            month: '%H:%M:%S',
          },
          labels: {
            enabled: false,
          },
          //labels:  { style: { fontSize: 12,  }, format: '{value:%m월 %e일 %H-%M}',
          opposite: true,
        },
      ],
      yAxis: [
        {
          title: {
            text: '섭씨',
          },
        },
      ],
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      // plotOptions: {
      //     series: {
      //         label: {
      //             connectorAllowed: false
      //         },
      //         color: 'blue',
      //         //pointStart: 2010
      //     }
      // },
      exporting: {
        enabled: false,
      },
      series: [
        {
          type: 'area',
          xAxis: 0,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: '#d9480f',
          },
          color: '#d9480f',
          //dashStyle : 'shortdot',

          name: '온도',
          data: temperatureDataList,
          zones: [
            {
              value: -10,
              color: '#4c6ef5',
            },
            {
              value: -7.5,
              color: '#5c7cfa',
            },
            {
              value: -5,
              color: '#748ffc',
            },
            {
              value: -2.5,
              color: '#91a7ff',
            },
            {
              value: 0,
              color: '#bac8ff',
            },
            {
              value: 2.5,
              color: '#ffec99',
            },
            {
              value: 5,
              color: '#ffe066',
            },
            {
              value: 7.5,
              color: '#ffd43b',
            },
            {
              value: 10,
              color: '#fcc419',
            },
            {
              value: 12.5,
              color: '#fab005',
            },
            {
              value: 15,
              color: '#f59f00',
            },
            {
              value: 20,
              color: '#f08c00',
            },
            {
              value: 25,
              color: '#e67700',
            },
            {
              value: 30,
              color: '#d9480f',
            },
          ],
        },
        {
          type: 'spline',
          xAxis: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: 'grey',
          },
          color: 'grey',
          //dashStyle : 'shortdot',

          name: '전일 온도',
          data: temperatureDataListYesterday,
          // zones: [{
          //     value: 0,
          //     color: 'grey'
          // }, {
          //     value: 15,
          //     color: '#f59f00'
          // }, {
          //     value: 20,
          //     color: '#d9480f'
          // },{
          //     value: 30,
          //     color: '#f03e3e'
          // }
          //]
        },
      ],
    };

    return (
      <div>
        {/*<button onClick = {this.setDisable}>버튼 클릭 </button>*/}
        <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
      </div>
    );
  }
}
export default inject(({ weather, edit }) => ({
  isFetchingTemp: weather.isFetchingTemp,
  getWeatherData: weather.getWeatherData,
  temperatureDataList: weather.temperatureDataList,
  temperatureDataListYesterday: weather.temperatureDataListYesterday,
  allChartResizing: edit.allChartResizing,
}))(observer(TemperatureChart));
