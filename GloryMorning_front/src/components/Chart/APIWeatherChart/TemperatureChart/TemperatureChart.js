import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import ReactHighcharts from  'react-highcharts'
import _  from 'lodash'
import moment from 'moment'
import 'moment/locale/ko';
class TemperatureChart extends Component {  
    componentDidMount(){
        const {getWeatherData} =this.props; 
        getWeatherData(60, 127, 'T3H');
    }

    componentDidUpdate(){
        const { isFetchingTemp } = this.props;
        let chart = this.refs.chart.getChart();
        if(isFetchingTemp){
             chart.showLoading('Loading...');
        }else{
            chart.hideLoading('Loading...');
        }
        console.log('componentDidUpdate')
        console.log('isFetching' , isFetchingTemp)
        const {allChartResizing} = this.props; 
        allChartResizing();
        //this.chartUpdate()
    }

  render() {
    console.log('render')
    const { wrapperid, temperatureDataList } = this.props;
    console.log('temperatureData ' , temperatureDataList)


    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        events: {
           
        }
      },
     
    title: {
        text: '☀️온도',
        style: {
            color: '#e9ecef',
        }

    },
    tooltip: {
        formatter : function() {
      
            // logs an object with properties: points, x, y
            return '<b>' + moment(this.point.x).format('YYYY-MM-DD-dddd-HH:mm') + '</b><br/>' +
                  '<br/><span style="color:' + this.point.color + '">\u25CF</span> '   +
                   '' + this.series.name + ' : ' + this.point.y + 'ºC<br/>'
          }
      },
    id : wrapperid +'_c',
    
    credits: {
        enabled: false
    },
    subtitle: {
        //text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%H:%M:%S',
        },

        labels:  { style: { fontSize: 12,  }, format: '{value:%m월 %e일 %H-%M}'

    }
  },
    yAxis: {
        title: {
            text: '섭씨'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            color: 'blue',
            //pointStart: 2010
        }
    },
    exporting: {
        enabled: false
    },
    series: [{
        type: 'spline',
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: "#d9480f"
        },
        color: '#d9480f',       
        //dashStyle : 'shortdot',

        name: '온도',
        data: temperatureDataList,
        zones: [{
            value: 0,
            color: '#1864ab'
        }, {
            value: 15,
            color: '#f59f00'
        }, {
            value: 20,
            color: '#d9480f'
        },{
            value: 30,
            color: '#f03e3e'
        }
    ]
    }],

    }
    
    return (

        <div>
        {/*<button onClick = {this.setDisable}>버튼 클릭 </button>*/}
             <ReactHighcharts config = {config} ref= "chart" ></ReactHighcharts>
        </div>
    )
  }
}
export default inject(({ weather, edit }) => ({
    isFetchingTemp : weather.isFetchingTemp,
    getWeatherData : weather.getWeatherData,
    temperatureDataList : weather.temperatureDataList,
    allChartResizing : edit.allChartResizing
    
  }))(observer(TemperatureChart));