import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import style from './HumidiyChart.module.css';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import 'moment/locale/ko';

class HumidityChart extends Component {
  componentDidMount() {
    const { getWeatherData, humidityDataList } = this.props;
    getWeatherData('REH');
    console.log('chartCompon');
  }

  componentDidUpdate() {
    const { isFetchingHumi, allChartResizing } = this.props;

    let chart = this.refs.chart.getChart();
    if (isFetchingHumi) {
      chart.showLoading('Loading...');
    } else {
      chart.hideLoading('Loading...');
      allChartResizing();
    }
    console.log('componentDidUpdate');
    console.log('isFetching', isFetchingHumi);

    //const { allChartResizing } = this.props;
    //allChartResizing();
    //this.chartUpdate()
  }
  componentWillUnmount() {
    console.log('componentWillUnmount!!');
    const { setHumidityDataListEmpty } = this.props;
    setHumidityDataListEmpty();
  }

  render() {
    console.log('render');
    const {
      wrapperid,
      humidityDataList,
      humidityDataListYesterday,
    } = this.props;
    console.log('humidityDataList ', humidityDataList);
    const config = {
      chart: {
        //height: 100,
        backgroundColor: 'none',
        events: {},
      },

      title: {
        text: '💧습도',
        style: {
          fontFamily: style.NotoSansKR,
          color: '#e9ecef',
        },
      },
      tooltip: {
        formatter: function() {
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
            '%<br/>'
          );
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
          min: 0,
          title: {
            text: '%',
          },
        },
      ],
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          color: 'blue',
          //pointStart: 2010
        },
      },
      exporting: {
        enabled: false,
      },
      series: [
        {
          type: 'area',
          xAxis: 0,
          name: '습도',
          data: humidityDataList,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: '#748ffc',
          },
          color: '#748ffc',
          zones: [
            {
              value: 0,
              color: '#edf2ff',
            },
            {
              value: 10,
              color: '#dbe4ff',
            },
            {
              value: 20,
              color: '#bac8ff',
            },
            {
              value: 30,
              color: '#91a7ff',
            },
            {
              value: 40,
              color: '#748ffc',
            },
            {
              value: 50,
              color: '#5c7cfa',
            },
            {
              value: 60,
              color: '#4c6ef5',
            },
            {
              value: 70,
              color: '#4263eb',
            },
            {
              value: 80,
              color: '#3b5bdb',
            },
            {
              value: 90,
              color: '#364fc7',
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

          name: '전일 습도',
          data: humidityDataListYesterday,
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
        <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
      </div>
    );
  }
}
export default inject(({ weather, edit }) => ({
  isFetchingHumi: weather.isFetchingHumi,
  humidityDataList: weather.humidityDataList,
  humidityDataListYesterday: weather.humidityDataListYesterday,
  allChartResizing: edit.allChartResizing,
  getWeatherData: weather.getWeatherData,
  setHumidityDataListEmpty: weather.setHumidityDataListEmpty,
}))(observer(HumidityChart));
