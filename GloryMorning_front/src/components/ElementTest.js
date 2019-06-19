import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import ReactHighcharts from  'react-highcharts'
import RedrawOnPrint from 'react-highcharts/dist/RedrawOnPrint';
import axios from 'axios'
let a = 1;
@observer
class ElementTest extends Component {  
    componentDidMount(){
       this.getWeatherData()
    }
   
    getWeatherData = () => { 
        const {
            isFetching , 
            getWeather,
            weatherData
         } = this.props;

            //getWeather();

            setInterval(async(chart) =>{
                this.chartUpdate()
            },1000);
            console.log('weatherdata ', weatherData);
    }
    shouldComponentUpdate(nextProps, nextState) {
        /* 현재 scatter data 랑 nextState.data랑 같으면 렌더링 X  */
        if( a !==0 ){
            console.log('dsadsad')
            return true;
        }else{
            console.log('ddsd')
            return false;

        }
    }
    componentDidUpdate(){
        const {allChartResizing, weatherData} = this.props 
        console.log("componentDidUpdate")
        //allChartResizing()
        

    }
    //차트업데이트는 컴포넌트 디두 업뎃을 안함 
    chartUpdate = async() =>{
            a=0;
            //console.log(a.push(1))
            try{
            //const response = await axios.post('http://localhost:3031/api/weather/PYTHONTEST')
            const response = await axios.post('http://localhost:3031/api/bus/get_data')
            console.log(response)
            let weatherData = response.data
            //this.setWeatherData(response.data)

    
            let chart = this.refs.chart.getChart();
           // var x = (new Date()).getTime(), // current time
            //y = Math.random()+10;
            chart.series[0].addPoint({x: weatherData[0], y: weatherData[1]});
            console.log(chart.series[0].data.slice(0,19))
            chart.series[0].update({
                     data: chart.series[0].data.slice(chart.series[0].data.length-19,
                        chart.series[0].data.length)
             });
            }
            catch(e){
              console.log(e)
            }
 
    //     console.log(weatherData)
    //     let chart = this.refs.chart.getChart();
    //    // var x = (new Date()).getTime(), // current time
    //     //y = Math.random()+10;
    //     chart.series[0].addPoint({x: weatherData[0], y: weatherData[1]});
    //     // chart.series[0].update({
        //     data: weatherData
        // });
    }

  render() {
      console.log('dddd')
    const { wrapperid  } = this.props;

   // console.log('weatherData ' )
    const config = {
      chart : {
        //height: 100,
        backgroundColor: 'none',
        events: {
           
        }
      },
    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },
    id : wrapperid +'_c',
    
    credits: {
        enabled: false
    },
    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Number of Employees'
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
            color: '#FF0000',
            pointStart: 2010
        }
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Installation',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        }())
    }],

    }
    
    return (

        <div>
        {/*<button onClick = {this.props.getWeather}>버튼 클릭 </button>*/}
             <ReactHighcharts config = {config} ref= "chart" ></ReactHighcharts>
        </div>
    )
  }
}
export default inject(({ weather, edit }) => ({
    isFetching : weather.isFetching,
    getWeather : weather.getWeather,
    weatherData : weather.weatherData,
    allChartResizing : edit.allChartResizing
    
  }))(observer(ElementTest));

