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
        getWeatherData('POP');
        getWeatherData('R06');
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
    const { wrapperid, rainfallDataList, rainfallmmDataList } = this.props;
    console.log('weatherData ' , rainfallDataList)

    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        style: {
            color: 'white',
        },
      },
     
    title: {
        text: '☔️강수확률',
        style: {
            color: '#e9ecef',
        }
   
    },
    tooltip: {
        formatter : function() {
            let identify = "%"
            if(this.series.name ==="강수량"){
                identify = 'mm'
            }
            // logs an object with properties: points, x, y
            return '<b>' + moment(this.point.x).format('YYYY-MM-DD-dddd-HH:mm') + '</b><br/>' +
                  '<br/><span style="color:' + this.point.color + '">\u25CF</span> '   +
                   '' + this.series.name + ' : ' + this.point.y + identify+'<br/>'
          }
      },
    id : wrapperid +'_c',
    
    credits: {
        enabled: false
    },
    subtitle: {
        //text: 'Source: thesolarfoundation.com'
    },
    xAxis: [{
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
        labels:  { style: { fontSize: 12,  }, format: '{value:%m월 %e일 %H-%M}'},
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
  },{
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
  }],
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
        min: 0,
        max : 50,
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
            color: '#4dabf7',
            //pointStart: 2010
        }
    },
    exporting: {
        enabled: false
    },
    series: [{
        type: 'spline',
        xAxis: 0,
        name: '강수확률',
        data: rainfallDataList,
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: "#4dabf7"
        },
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
            color: '#4dabf7'
        }]
    },
    {
        type:'column',
        xAxis:1,
        yAxis:1,
        name:'강수량',
        data : rainfallmmDataList,
        color : '#748ffc'
    }
 
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
    rainfallmmDataList :weather.rainfallmmDataList,
    allChartResizing : edit.allChartResizing
  }))(observer(RainChart));