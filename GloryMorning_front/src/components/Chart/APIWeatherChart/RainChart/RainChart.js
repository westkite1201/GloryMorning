import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import ReactHighcharts from  'react-highcharts'
import _  from 'lodash'
import moment from 'moment'
import 'moment/locale/ko';
/* 레인 차트는 강수확률이랑 강우량 두개를 가져가도록 함  */
/* 강수량 같은 경우는 6시간 단위로만 가져오고 있습  */
class RainChart extends Component {  
    componentDidMount(){
        const {getWeatherData} =this.props;
        getWeatherData(60, 127, 'POP');
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
    componentWillUnmount(){
        console.log("componentWillUnmount!!")
        const { setRainfallDataListEmpty } = this.props 
        setRainfallDataListEmpty();
    }

  render() {
    console.log('render')
    const { wrapperid, rainfallDataList } = this.props;
    console.log('weatherData ' , rainfallDataList)

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
    tooltip: {
        formatter : function() {
      
            // logs an object with properties: points, x, y
            return '<b>' + moment(this.point.x).format('YYYY-MM-DD-dddd-HH:mm') + '</b><br/>' +
                  '<br/><span style="color:' + this.point.color + '">\u25CF</span> '   +
                   '' + this.series.name + ' : ' + this.point.y + '%<br/>'
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
        dateTimeLabelFormats: {
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%b. %e',
            week: '%b. %e',
            month: '%b. %y',
            year: '%Y'
          },
        labels:  { style: { fontSize: 12,  }, format: '{value:%m월 %e일 %H-%M}'

    }
  },
    yAxis: [{
        title: {
            text: '%'
        },
        min: 0,
        max : 100
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
        data: rainfallDataList,
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
 

    ],

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
    getWeatherData : weather.getWeatherData,
    setRainfallDataListEmpty : weather.setRainfallDataListEmpty,
    isFetchingRain : weather.isFetchingRain,
    rainfallDataList : weather.rainfallDataList,
    allChartResizing : edit.allChartResizing
  }))(observer(RainChart));