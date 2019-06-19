import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import ReactHighcharts from  'react-highcharts'

class TemperatureChart extends Component {  
    componentDidMount(){
        console.log('chartCompon')
       this.getWeatherData()
    }

    getWeatherData = () => { 
        const {
            getWeather,
         } = this.props;

            getWeather("TEMPERATURE");
            //this.setUpdating();
            //this.chartUpdate()
            //console.log('weatherdata ', weatherData);
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
    const { wrapperid, temperatureData } = this.props;
    console.log('temperatureData ' , temperatureData)


    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        events: {
           
        }
      },
     
    title: {
        text: '온도'
    },
    id : wrapperid +'_c',
    
    credits: {
        enabled: false
    },
    subtitle: {
        //text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
        tickInterval: 1,
        labels: {
            enabled: true,
            formatter: function() { return temperatureData[this.value][0];},
        }
        //type: 'datetime',
        //tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: '시간'
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
            lineWidth: 2,                                                                                       
            lineColor: '#adb5bd',
            fillColor: 'white'
        },
        color: '#adb5bd',       
        dashStyle : 'shortdot',

        name: '온도',
        data: temperatureData,
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
    getWeather : weather.getWeather,
    temperatureData : weather.temperatureData,
    allChartResizing : edit.allChartResizing
    
  }))(observer(TemperatureChart));