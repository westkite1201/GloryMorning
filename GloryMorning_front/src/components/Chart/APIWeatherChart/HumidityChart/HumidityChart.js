import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import style from './HumidiyChart.module.css'
import ReactHighcharts from  'react-highcharts'

class HumidityChart extends Component {  
    componentDidMount(){
        const {getWeatherData , humidityDataList} =this.props; 
        getWeatherData(60, 127, 'REH');
        console.log('chartCompon')
       //this.getWeatherData()
       
    }


    componentDidUpdate(){
        const { isFetchingHumi } = this.props;

        let chart = this.refs.chart.getChart();
        if(isFetchingHumi){
             chart.showLoading('Loading...');
        }else{
            chart.hideLoading('Loading...');
        }
        console.log('componentDidUpdate')
        console.log('isFetching' , isFetchingHumi)

        const { allChartResizing } = this.props; 
        allChartResizing();
        //this.chartUpdate()
    }
    componentWillUnmount(){
        console.log("componentWillUnmount!!")
        const { setHumidityDataListEmpty } = this.props 
        setHumidityDataListEmpty();
    }

  render() {
    console.log('render')
    const { wrapperid, humidityDataList } = this.props;
    console.log("humidityDataList ", humidityDataList) 
    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        events: {
           
        }
      },
     
    title: {
        text: '습도',
        style: {
            fontFamily: style.NotoSansKR
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
        tickInterval: 1,
        labels: {
            enabled: true,
            formatter: function() { 
               // console.log(humidityDataList)
                return humidityDataList[this.value][0];
            
            },
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
        name: '습도',
        data: humidityDataList,
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: "#1864ab"
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
            color: '#f03e3e'
        }
    ]
    }],

    }
    
    return (

        <div>
               <ReactHighcharts config = {config} ref= "chart" ></ReactHighcharts>
        </div>
    )
  }
}
export default inject(({ weather, edit }) => ({
     isFetchingHumi : weather.isFetchingHumi,
    // getWeather : weather.getWeather,
    // humidityData : weather.humidityData,
    humidityDataList : weather.humidityDataList,
    allChartResizing : edit.allChartResizing,
    getWeatherData : weather.getWeatherData,
    setHumidityDataListEmpty : weather.setHumidityDataListEmpty
  }))(observer(HumidityChart));