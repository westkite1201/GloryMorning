import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import ReactHighcharts from  'react-highcharts'
import moment from 'moment'
import _  from 'lodash'

/* 레인 차트는 강수확률이랑 강우량 두개를 가져가도록 함  */
class RainChart extends Component {  
    componentDidMount(){
        console.log('chartCompon')
       this.getWeatherData()
    }

    getWeatherData = () => { 
        const {
            isFetching , 
            getWeather,
            weatherData
         } = this.props;

            getWeather("RAIN");
    }
    componentDidUpdate(){
        const { isFetchingRain } = this.props;
        let chart = this.refs.chart.getChart();
        if(isFetchingRain){
             chart.showLoading('Loading...');
        }else{
            chart.hideLoading('Loading...');
        }
        console.log('componentDidUpdate')
        console.log('isFetching' , isFetchingRain)
        const {allChartResizing} = this.props; 
        allChartResizing();
        //this.chartUpdate()
    }

  render() {
    console.log('render')
    const { wrapperid, rainData } = this.props;
    console.log('weatherData ' , rainData)


    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        events: {
           
        }
      },
     
    title: {
        text: '강수확률'
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
            //formatter: function() { return rainData[this.value][0][0];},
        },
        plotLines: [{
            color: 'red', // Color value
            dashStyle: 'longdashdot', // Style of the plot line. Default to solid
            value: moment()._d.valueOf(), // Value of where the line will appear
            width: 2 // Width of the line    
        }],
        plotBands: [{
            color: 'rgba(255,0,0,0.5)', // Color value
            from:    moment()._d.valueOf() -  (3600 * 1000) * 2, // Start of the plot band
            to:    moment()._d.valueOf() +  (3600 * 1000) * 2// End of the plot band
        }],
        //type: 'datetime',
        //tickPixelInterval: 150
    },
    yAxis: [{
        title: {
            text: '시간'
        }
    },
     { // Secondary yAxis
        title: {
            text: 'Rainfall',
        },
        labels: {
            format: '{value} mm',
          
        },
        opposite: true
    }],
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
        name: '강수확률',
        data: rainData[0],
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
        }]
    },
    {
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data:  rainData[1],
        tooltip: {
            valueSuffix: ' mm'
        }
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
    isFetchingRain : weather.isFetchingRain,
    getWeather : weather.getWeather,
    rainData : weather.rainData,
    allChartResizing : edit.allChartResizing
    
  }))(observer(RainChart));